"use client";

import { FormEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import type { Project } from "@/lib/projects";
import { logger } from "@/lib/logger";

type ProjectFormState = {
  id?: string;
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  longDescription: string;
  coverImage: string;
  imageFile: File | null;
  tags: string;
  technologies: string;
  status: string;
  projectUrl: string;
  demoLink: string;
};

const defaultForm: ProjectFormState = {
  slug: "",
  title: "",
  description: "",
  shortDescription: "",
  longDescription: "",
  coverImage: "",
  imageFile: null,
  tags: "",
  technologies: "",
  status: "Completed",
  projectUrl: "",
  demoLink: "#"
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
      console.log('Projects response status:', response.status);
      
      if (response.status === 401) {
        console.log('Unauthorized, redirecting to login');
        router.push(`/${locale}/internal/login`);
        return;
      }
      if (!response.ok) {
        const payload = (await response.json().catch(() => ({}))) as { error?: string };
        console.log('Projects error:', payload);
        setError(payload.error || "Failed to load projects.");
        return;
      }
      const data = (await response.json()) as Project[];
      console.log('Projects loaded:', data.length);
      setProjects(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log('Projects fetch error:', error);
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
      shortDescription: project.shortDescription || "",
      longDescription: project.longDescription || "",
      coverImage: project.coverImage,
      imageFile: null,
      tags: project.tags.join(", "),
      technologies: project.technologies.join(", "),
      status: project.status,
      projectUrl: project.project_url || "",
      demoLink: project.demoLink || "#"
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
      formData.append("shortDescription", form.shortDescription.trim());
      formData.append("longDescription", form.longDescription.trim());
      formData.append("tags", form.tags);
      formData.append("technologies", form.technologies.trim());
      formData.append("status", form.status.trim());
      formData.append("project_url", form.projectUrl.trim());
      formData.append("demoLink", form.demoLink.trim());
      
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
      
      // Log successful form submission
      logger.logFormSubmission('InternalProjectsForm', {
        id: form.id,
        title: form.title,
        slug: form.slug,
        status: form.status,
        hasImage: !!form.imageFile || !!form.coverImage
      }, true);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to save project.";
      setError(errorMessage);
      
      // Log failed form submission
      logger.logFormSubmission('InternalProjectsForm', {
        id: form.id,
        title: form.title,
        error: errorMessage
      }, false);
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
            <textarea
              placeholder="Short Description"
              value={form.shortDescription}
              onChange={(event) => setForm((prev) => ({ ...prev, shortDescription: event.target.value }))}
              className="rounded-lg border border-primary-600/30 bg-black/20 px-3 py-2 outline-none focus:border-primary-400 md:col-span-2"
              rows={2}
            />
            <textarea
              placeholder="Long Description"
              value={form.longDescription}
              onChange={(event) => setForm((prev) => ({ ...prev, longDescription: event.target.value }))}
              className="rounded-lg border border-primary-600/30 bg-black/20 px-3 py-2 outline-none focus:border-primary-400 md:col-span-2"
              rows={4}
            />
            <input
              placeholder="Tags (comma-separated)"
              value={form.tags}
              onChange={(event) => setForm((prev) => ({ ...prev, tags: event.target.value }))}
              className="rounded-lg border border-primary-600/30 bg-black/20 px-3 py-2 outline-none focus:border-primary-400"
            />
            <input
              placeholder="Technologies (comma-separated)"
              value={form.technologies}
              onChange={(event) => setForm((prev) => ({ ...prev, technologies: event.target.value }))}
              className="rounded-lg border border-primary-600/30 bg-black/20 px-3 py-2 outline-none focus:border-primary-400"
            />
            <input
              placeholder="Status (Completed / In Progress / Case Study / Pending)"
              value={form.status}
              onChange={(event) => setForm((prev) => ({ ...prev, status: event.target.value }))}
              className="rounded-lg border border-primary-600/30 bg-black/20 px-3 py-2 outline-none focus:border-primary-400"
            />
            <input
              placeholder="Project URL (https://example.com)"
              value={form.projectUrl}
              onChange={(event) => setForm((prev) => ({ ...prev, projectUrl: event.target.value }))}
              className="rounded-lg border border-primary-600/30 bg-black/20 px-3 py-2 outline-none focus:border-primary-400"
            />
            <input
              placeholder="Demo Link (https://example.com)"
              value={form.demoLink}
              onChange={(event) => setForm((prev) => ({ ...prev, demoLink: event.target.value }))}
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
                className="rounded-xl border border-primary-600/20 bg-black/20 p-4 flex flex-wrap items-start gap-4"
              >
                {/* Product Image */}
                <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-black/40 border border-primary-600/20">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-text-secondary text-xs">
                      No Image
                    </div>
                  )}
                </div>

                {/* Project Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-lg">{project.title}</p>
                  <p className="text-sm text-text-secondary mb-2 line-clamp-2">{project.description}</p>
                  
                  {/* Short Description */}
                  {project.shortDescription && project.shortDescription !== project.description && (
                    <p className="text-xs text-text-secondary mb-1">
                      <strong>Short:</strong> {project.shortDescription}
                    </p>
                  )}
                  
                  {/* Long Description */}
                  {project.longDescription && project.longDescription !== project.description && (
                    <p className="text-xs text-text-secondary mb-1">
                      <strong>Long:</strong> {project.longDescription.length > 100 ? project.longDescription.substring(0, 100) + "..." : project.longDescription}
                    </p>
                  )}
                  
                  <p className="text-xs text-text-secondary mb-1">
                    slug: {project.slug} | status: {project.status}
                  </p>
                  
                  {/* Technologies */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1 mb-1">
                      <span className="text-xs text-text-secondary"><strong>Tech:</strong></span>
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-xs bg-primary-600/10 text-primary-400 rounded border border-primary-600/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {/* Links */}
                  <div className="space-y-1 mt-2">
                    {project.project_url && (
                      <p className="text-xs text-primary-400">
                        <strong>Project:</strong>
                        <a 
                          href={project.project_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:text-primary-300 transition-colors ml-1"
                        >
                          {project.project_url}
                        </a>
                      </p>
                    )}
                    {project.demoLink && project.demoLink !== "#" && (
                      <p className="text-xs text-primary-400">
                        <strong>Demo:</strong>
                        <a 
                          href={project.demoLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:text-primary-300 transition-colors ml-1"
                        >
                          {project.demoLink}
                        </a>
                      </p>
                    )}
                  </div>
                  
                  {/* Dates */}
                  <div className="text-xs text-text-secondary mt-2">
                    <strong>Created:</strong> {new Date(project.createdAt).toLocaleDateString()} | 
                    <strong> Updated:</strong> {new Date(project.updatedAt).toLocaleDateString()}
                  </div>
                  
                  {/* Tags */}
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      <span className="text-xs text-text-secondary"><strong>Tags:</strong></span>
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-xs bg-primary-600/10 text-primary-400 rounded border border-primary-600/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 items-start">
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

