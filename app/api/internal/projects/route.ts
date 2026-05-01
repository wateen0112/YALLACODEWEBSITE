import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin-auth";
import { createProjectInApi, createProjectWithImage, listProjectsFromApi } from "@/lib/projects-api";

type CreateBody = {
  slug?: string;
  title?: string;
  description?: string;
  shortDescription?: string;
  longDescription?: string;
  coverImage?: string;
  image?: string;
  demoLink?: string;
  tags?: string[] | string;
  status?: string;
};

function normalizeImageUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";

  try {
    const url = new URL(trimmed);
    if (url.hostname.includes("google.com") && url.pathname.includes("/imgres")) {
      const direct = url.searchParams.get("imgurl");
      if (direct) return decodeURIComponent(direct).trim();
    }
    return trimmed;
  } catch {
    return trimmed;
  }
}

function isHttpUrl(value: string) {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function normalizeTags(tags: CreateBody["tags"]) {
  if (Array.isArray(tags)) return tags.map((tag) => String(tag).trim()).filter(Boolean);
  if (typeof tags === "string") {
    return tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }
  return [];
}

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET(request: NextRequest) {
  if (!isAuthenticated(request)) return unauthorized();

  try {
    const projects = await listProjectsFromApi();
    return NextResponse.json(projects);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch projects";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!isAuthenticated(request)) return unauthorized();

  // Handle FormData for file uploads
  const formData = await request.formData().catch(() => null);
  
  if (formData) {
    // FormData handling for file uploads
    const title = (formData.get("title") as string ?? "").trim();
    const slug = (formData.get("slug") as string ?? title).trim().toLowerCase();
    const description = (formData.get("description") as string ?? "").trim();
    const tags = (formData.get("tags") as string ?? "").trim();
    const status = (formData.get("status") as string ?? "Completed").trim();
    const imageFile = formData.get("image") as File;

    // For FormData, we need both short and long descriptions
    const shortDescription = description;
    const longDescription = description;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }
    if (!shortDescription) {
      return NextResponse.json({ error: "shortDescription is required" }, { status: 400 });
    }
    if (!longDescription) {
      return NextResponse.json({ error: "longDescription is required" }, { status: 400 });
    }
    if (!imageFile) {
      return NextResponse.json({ error: "image is required" }, { status: 400 });
    }

    try {
      // Create FormData with the correct field names for the backend
      const backendFormData = new FormData();
      
      // Map the form fields to what the backend expects
      backendFormData.append("title", title);
      backendFormData.append("description", shortDescription); // Backend expects "description"
      backendFormData.append("shortDescription", shortDescription);
      backendFormData.append("longDescription", longDescription);
      backendFormData.append("technologies", tags); // Backend expects "technologies"
      backendFormData.append("demoLink", "#"); // Default demo link
      backendFormData.append("status", status || "Completed"); // Default to "Completed"
      backendFormData.append("image", imageFile); // The image file
      
      if (slug) {
        backendFormData.append("slug", slug);
      }
      
      // Use the existing backend API with FormData
      const created = await createProjectWithImage(backendFormData);
      return NextResponse.json(created, { status: 201 });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to create project";
      return NextResponse.json({ error: message }, { status: 500 });
    }
  } else {
    // Fallback to JSON handling for backward compatibility
    const body = (await request.json().catch(() => ({}))) as CreateBody;
    const title = (body.title ?? "").trim();
    const coverImage = normalizeImageUrl(body.coverImage ?? body.image ?? "");
    const shortDescription = (body.shortDescription ?? body.description ?? "").trim();
    const longDescription = (body.longDescription ?? body.description ?? "").trim();
    const demoLink = (body.demoLink ?? "#").trim();

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }
    if (!shortDescription) {
      return NextResponse.json({ error: "shortDescription is required" }, { status: 400 });
    }
    if (!longDescription) {
      return NextResponse.json({ error: "longDescription is required" }, { status: 400 });
    }
    if (!coverImage) {
      return NextResponse.json({ error: "image is required" }, { status: 400 });
    }
    if (coverImage && !isHttpUrl(coverImage)) {
      return NextResponse.json(
        { error: "coverImage must be a valid http/https URL (direct image URL preferred)." },
        { status: 400 }
      );
    }

    try {
      const created = await createProjectInApi({
        slug: (body.slug ?? title).trim().toLowerCase(),
        title,
        description: shortDescription,
        coverImage, // Compatibility with older API contracts
        shortDescription,
        longDescription,
        image: coverImage,
        demoLink: demoLink || "#",
        tags: normalizeTags(body.tags),
        status: (body.status ?? "Completed").trim()
      });

      return NextResponse.json(created, { status: 201 });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to create project";
      return NextResponse.json({ error: message }, { status: 500 });
    }
  }
}

