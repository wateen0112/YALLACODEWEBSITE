import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin-auth";
import { createProjectInApi, listProjectsFromApi } from "@/lib/projects-api";

type CreateBody = {
  slug?: string;
  title?: string;
  description?: string;
  coverImage?: string;
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

  const body = (await request.json().catch(() => ({}))) as CreateBody;
  const title = (body.title ?? "").trim();
  const coverImage = normalizeImageUrl(body.coverImage ?? "");

  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
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
      description: (body.description ?? "").trim(),
      coverImage,
      tags: normalizeTags(body.tags),
      status: (body.status ?? "Completed").trim()
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create project";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

