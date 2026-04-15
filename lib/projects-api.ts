import { API_BASE_URL, API_PROJECTS_ENDPOINT, API_SECRET, API_SECRET_HEADER } from "@/lib/api-config";
import type { Project } from "@/lib/projects";

type UnknownRecord = Record<string, unknown>;

export type ProjectPayload = {
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  tags: string[];
  status: string;
};

function normalizeSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function toProject(raw: UnknownRecord, index: number): Project {
  const title = typeof raw.title === "string" ? raw.title : `Project ${index + 1}`;
  const description =
    typeof raw.description === "string" ? raw.description : "Project description is not available.";
  const slugSource = typeof raw.slug === "string" ? raw.slug : title;
  const coverImage =
    typeof raw.coverImage === "string"
      ? raw.coverImage
      : typeof raw.image === "string"
        ? raw.image
        : "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80";

  const tagsRaw = raw.tags;
  const tags =
    Array.isArray(tagsRaw) && tagsRaw.length > 0
      ? tagsRaw.map((item) => String(item))
      : ["Web", "API"];

  const status = typeof raw.status === "string" ? raw.status : "Completed";

  return {
    id: String(raw.id ?? raw._id ?? index + 1),
    slug: normalizeSlug(slugSource),
    title,
    description,
    coverImage,
    tags,
    status
  };
}

function ensureConfigured() {
  return API_BASE_URL.length > 0;
}

function buildBaseEndpoint() {
  const base = API_BASE_URL.replace(/\/+$/, "");
  const endpoint = API_PROJECTS_ENDPOINT.startsWith("/")
    ? API_PROJECTS_ENDPOINT
    : `/${API_PROJECTS_ENDPOINT}`;
  return `${base}${endpoint}`;
}

function buildHeaders() {
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (API_SECRET) headers[API_SECRET_HEADER] = API_SECRET;
  return headers;
}

export async function listProjectsFromApi(): Promise<Project[]> {
  if (!ensureConfigured()) return [];

  const response = await fetch(buildBaseEndpoint(), {
    method: "GET",
    headers: buildHeaders(),
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch projects (${response.status})`);
  }

  const data = (await response.json()) as unknown;
  const list = Array.isArray(data)
    ? data
    : typeof data === "object" && data !== null && Array.isArray((data as UnknownRecord).data)
      ? ((data as UnknownRecord).data as UnknownRecord[])
      : [];

  return list.map((item, index) => toProject(item as UnknownRecord, index));
}

export async function createProjectInApi(payload: ProjectPayload): Promise<Project> {
  const response = await fetch(buildBaseEndpoint(), {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify(payload),
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`Failed to create project (${response.status})`);
  }

  const raw = (await response.json()) as UnknownRecord;
  return toProject(raw, 0);
}

export async function updateProjectInApi(id: string, payload: ProjectPayload): Promise<Project> {
  const response = await fetch(`${buildBaseEndpoint()}/${id}`, {
    method: "PUT",
    headers: buildHeaders(),
    body: JSON.stringify(payload),
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`Failed to update project (${response.status})`);
  }

  const raw = (await response.json()) as UnknownRecord;
  return toProject(raw, 0);
}

export async function deleteProjectInApi(id: string): Promise<void> {
  const response = await fetch(`${buildBaseEndpoint()}/${id}`, {
    method: "DELETE",
    headers: buildHeaders(),
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`Failed to delete project (${response.status})`);
  }
}

