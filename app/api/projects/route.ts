import { NextResponse } from "next/server";
import { projects as fallbackProjects } from "@/lib/projects";
import { listProjectsFromApi } from "@/lib/projects-api";

export async function GET() {
  try {
    const projects = await listProjectsFromApi();
    if (projects.length === 0) {
      return NextResponse.json(fallbackProjects);
    }

    return NextResponse.json(projects);
  } catch {
    return NextResponse.json(fallbackProjects);
  }
}

