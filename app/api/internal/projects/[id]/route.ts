import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin-auth";
import { deleteProjectInApi, updateProjectInApi } from "@/lib/projects-api";

type UpdateBody = {
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
    const updated = await updateProjectInApi(id, {
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

