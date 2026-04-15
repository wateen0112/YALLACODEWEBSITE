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

  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  try {
    const created = await createProjectInApi({
      slug: (body.slug ?? title).trim().toLowerCase(),
      title,
      description: (body.description ?? "").trim(),
      coverImage: (body.coverImage ?? "").trim(),
      tags: normalizeTags(body.tags),
      status: (body.status ?? "Completed").trim()
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create project";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

