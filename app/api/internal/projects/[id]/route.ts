import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin-auth";
import { deleteProjectInApi, updateProjectInApi } from "@/lib/projects-api";

type UpdateBody = {
  slug?: string;
  title?: string;
  description?: string;
  coverImage?: string;
  tags?: string[] | string;
  status?: string;
};

function normalizeTags(tags: UpdateBody["tags"]) {
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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthenticated(request)) return unauthorized();

  const { id } = await params;
  const body = (await request.json().catch(() => ({}))) as UpdateBody;
  const title = (body.title ?? "").trim();

  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  try {
    const updated = await updateProjectInApi(id, {
      slug: (body.slug ?? title).trim().toLowerCase(),
      title,
      description: (body.description ?? "").trim(),
      coverImage: (body.coverImage ?? "").trim(),
      tags: normalizeTags(body.tags),
      status: (body.status ?? "Completed").trim()
    });

    return NextResponse.json(updated);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update project";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthenticated(request)) return unauthorized();
  const { id } = await params;

  try {
    await deleteProjectInApi(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete project";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

