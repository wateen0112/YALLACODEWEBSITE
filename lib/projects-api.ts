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

function buildHeaders(requireSecret = false) {
  const headers: HeadersInit = { "Content-Type": "application/json" };

  if (requireSecret && !API_SECRET) {
    throw new Error("API_SECRET is missing for protected request");
  }

  if (API_SECRET) {
    // Required by backends that read: req.headers['x-api-secret']
    headers["x-api-secret"] = API_SECRET;
    headers[API_SECRET_HEADER] = API_SECRET;
    // Many APIs also accept bearer tokens; keep both for compatibility.
    headers.Authorization = `Bearer ${API_SECRET}`;
  }

  return headers;
}

async function buildApiError(action: string, response: Response) {
  let details = "";

  try {
    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      const payload = (await response.json()) as UnknownRecord;
      details =
        (typeof payload.error === "string" && payload.error) ||
        (typeof payload.message === "string" && payload.message) ||
        JSON.stringify(payload);
    } else {
      const text = (await response.text()).trim();
      details = text || "";
    }
  } catch {
    details = "";
  }

  return new Error(
    details
      ? `Failed to ${action} project (${response.status}): ${details}`
      : `Failed to ${action} project (${response.status})`
  );
}

export async function listProjectsFromApi(): Promise<Project[]> {
  if (!ensureConfigured()) return [];

  const response = await fetch(buildBaseEndpoint(), {
    method: "GET",
    headers: buildHeaders(false),
    cache: "no-store"
  });

  if (!response.ok) {
    throw await buildApiError("fetch", response);
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
    headers: buildHeaders(true),
    body: JSON.stringify(payload),
    cache: "no-store"
  });

  if (!response.ok) {
    throw await buildApiError("create", response);
  }

  const raw = (await response.json()) as UnknownRecord;
  return toProject(raw, 0);
}

export async function updateProjectInApi(id: string, payload: ProjectPayload): Promise<Project> {
  const response = await fetch(`${buildBaseEndpoint()}/${id}`, {
    method: "PUT",
    headers: buildHeaders(true),
    body: JSON.stringify(payload),
    cache: "no-store"
  });

  if (!response.ok) {
    throw await buildApiError("update", response);
  }

  const raw = (await response.json()) as UnknownRecord;
  return toProject(raw, 0);
}

export async function deleteProjectInApi(id: string): Promise<void> {
  const response = await fetch(`${buildBaseEndpoint()}/${id}`, {
    method: "DELETE",
    headers: buildHeaders(true),
    cache: "no-store"
  });

  if (!response.ok) {
    throw await buildApiError("delete", response);
  }
}

