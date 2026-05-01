import { NextRequest, NextResponse } from "next/server";
import { listProjectsFromApi, createProjectWithImage } from "@/lib/projects-api";

export async function GET() {
  try {
    const projects = await listProjectsFromApi();
    return NextResponse.json(projects);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load projects from API";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Forward FormData to the backend API
    const project = await createProjectWithImage(formData);
    return NextResponse.json(project);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create project";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}

