import { NextResponse } from "next/server";
import { listProjectsFromApi } from "@/lib/projects-api";

export async function GET() {
  try {
    const projects = await listProjectsFromApi();
    return NextResponse.json(projects);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load projects from API";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}

