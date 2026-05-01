"use client";

import { FormEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import type { Project } from "@/lib/projects";

type ProjectFormState = {
  id?: string;
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  imageFile: File | null;
  tags: string;
  status: string;
};

const defaultForm: ProjectFormState = {
  slug: "",
  title: "",
  description: "",
  coverImage: "",
  imageFile: null,
  tags: "",
  status: "Completed"
};

export default function InternalProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState<ProjectFormState>(defaultForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const params = useParams<{ locale: string }>();
  const router = useRouter();
  const locale = params?.locale || "en";

  async function loadProjects() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/internal/projects", { cache: "no-store" });
      if (response.status === 401) {
        router.push(`/${locale}/internal/login`);
        return;
      }
      if (!response.ok) {
        const payload = (await response.json().catch(() => ({}))) as { error?: string };
        setError(payload.error || "Failed to load projects.");
        return;
      }
      const data = (await response.json()) as Project[];
      setProjects(Array.isArray(data) ? data : []);
    } catch {
      setError("Failed to load projects.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function editProject(project: Project) {
    setForm({
      id: project.id,
      slug: project.slug,
      title: project.title,
      description: project.description,
      coverImage: project.coverImage,
      imageFile: null,
      tags: project.tags.join(", "),
      status: project.status
    });
  }

  function resetForm() {
    setForm(defaultForm);
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] || null;
    setForm(prev => ({ ...prev, imageFile: file }));
  }

  async function submitForm(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    // Validate that image file is provided for new projects
    if (!form.id && !form.imageFile) {
      setError("Please select an image file.");
      setSubmitting(false);
      return;
    }

    try {
      const endpoint = form.id ? `/api/internal/projects/${form.id}` : "/api/internal/projects";
      const method = form.id ? "PUT" : "POST";

      // Create FormData for file upload
      const formData = new FormData();
      
      // Add all form fields
      formData.append("slug", form.slug.trim());
      formData.append("title", form.title.trim());
      formData.append("description", form.description.trim());
      formData.append("tags", form.tags);
      formData.append("status", form.status.trim());
      
      // Add image file if provided
      if (form.imageFile) {
        formData.append("image", form.imageFile);
      } else if (form.coverImage) {
        // For editing without new image, keep existing cover image URL
        formData.append("coverImage", form.coverImage.trim());
      }

      const response = await fetch(endpoint, {
        method,
        body: formData // Don't set Content-Type header for FormData
      });

      if (response.status === 401) {
        router.push(`/${locale}/internal/login`);
        return;
      }

      if (!response.ok) {
        const responsePayload = (await response.json().catch(() => ({}))) as { error?: string };
        setError(responsePayload.error || "Failed to save project.");
        return;
      }

      resetForm();
      await loadProjects();
    } catch {
      setError("Failed to save project.");
    } finally {
      setSubmitting(false);
    }
  }

  async function removeProject(id: string) {
    const isConfirmed = window.confirm("Delete this project?");
    if (!isConfirmed) return;

    setError("");
    try {
      const response = await fetch(`/api/internal/projects/${id}`, { method: "DELETE" });
      if (response.status === 401) {
        router.push(`/${locale}/internal/login`);
        return;
      }
      if (!response.ok) {
        const payload = (await response.json().catch(() => ({}))) as { error?: string };
        setError(payload.error || "Failed to delete project.");
        return;
      }

      await loadProjects();
    } catch {
      setError("Failed to delete project.");
    }
  }

  async function logout() {
    await fetch("/api/internal/logout", { method: "POST" });
    router.push(`/${locale}/internal/login`);
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-background text-text-primary px-4 py-12">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">Projects CRUD (Hidden Internal)</h1>
          <button
            onClick={logout}
            className="rounded-lg border border-primary-600/30 px-4 py-2 text-sm hover:bg-primary-600/10"
          >
            Sign out
          </button>
        </div>

        <section className="rounded-2xl border border-primary-600/30 bg-surface/70 p-6">
          <h2 className="text-xl font-semibold mb-4">{form.id ? "Edit Project" : "Create Project"}</h2>

          <form onSubmit={submitForm} className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input
              placeholder="Title"
              value={form.title}
              onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
              className="rounded-lg border border-primary-600/30 bg-black/20 px-3 py-2 outline-none focus:border-primary-400"
              required
            />
            <input
              placeholder="Slug"
              value={form.slug}
              onChange={(event) => setForm((prev) => ({ ...prev, slug: event.target.value }))}
              className="rounded-lg border border-primary-600/30 bg-black/20 px-3 py-2 outline-none focus:border-primary-400"
            />
            <div className="md:col-span-2">
              <label className="block text-sm mb-1">
                Project Image {form.id ? "(optional - leave empty to keep current)" : "*"}
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full rounded-lg border border-primary-600/30 bg-black/20 px-3 py-2 outline-none focus:border-primary-400"
                required={!form.id}
              />
              {form.imageFile && (
                <p className="mt-2 text-sm text-text-secondary">
                  Selected: {form.imageFile.name}
                </p>
              )}
              {form.id && form.coverImage && !form.imageFile && (
                <p className="mt-2 text-sm text-text-secondary">
                  Current image: {form.coverImage}
                </p>
              )}
            </div>
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
              className="rounded-lg border border-primary-600/30 bg-black/20 px-3 py-2 outline-none focus:border-primary-400 md:col-span-2"
              rows={3}
            />
            <input
              placeholder="Tags (comma separated)"
              value={form.tags}
              onChange={(event) => setForm((prev) => ({ ...prev, tags: event.target.value }))}
              className="rounded-lg border border-primary-600/30 bg-black/20 px-3 py-2 outline-none focus:border-primary-400"
            />
            <input
              placeholder="Status (Completed / In Progress / Case Study)"
              value={form.status}
              onChange={(event) => setForm((prev) => ({ ...prev, status: event.target.value }))}
              className="rounded-lg border border-primary-600/30 bg-black/20 px-3 py-2 outline-none focus:border-primary-400"
            />

            <div className="md:col-span-2 flex gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="rounded-lg bg-gradient-to-r from-primary-600 to-primary-400 px-5 py-2 font-semibold text-white disabled:opacity-60"
              >
                {submitting ? "Saving..." : form.id ? "Update" : "Create"}
              </button>
              {form.id ? (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-lg border border-primary-600/30 px-4 py-2 hover:bg-primary-600/10"
                >
                  Cancel edit
                </button>
              ) : null}
            </div>
          </form>
        </section>

        <section className="rounded-2xl border border-primary-600/30 bg-surface/70 p-6">
          <h2 className="text-xl font-semibold mb-4">Existing Projects</h2>
          {loading ? <p className="text-text-secondary">Loading projects...</p> : null}
          {error ? <p className="text-red-400 mb-3">{error}</p> : null}

          <div className="space-y-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="rounded-xl border border-primary-600/20 bg-black/20 p-4 flex flex-wrap items-start justify-between gap-3"
              >
                <div className="max-w-3xl">
                  <p className="font-semibold">{project.title}</p>
                  <p className="text-sm text-text-secondary">{project.description}</p>
                  <p className="text-xs text-text-secondary mt-2">
                    slug: {project.slug} | status: {project.status}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => editProject(project)}
                    className="rounded-lg border border-primary-600/30 px-3 py-1.5 text-sm hover:bg-primary-600/10"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => removeProject(project.id)}
                    className="rounded-lg border border-red-400/40 px-3 py-1.5 text-sm text-red-300 hover:bg-red-500/10"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {!loading && projects.length === 0 ? (
              <p className="text-text-secondary">No projects found from API.</p>
            ) : null}
          </div>
        </section>
      </div>
    </main>
  );
}

