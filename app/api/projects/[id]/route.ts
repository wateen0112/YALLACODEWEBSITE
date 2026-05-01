import { NextRequest, NextResponse } from "next/server";
import { listProjectsFromApi } from "@/lib/projects-api";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const projects = await listProjectsFromApi();
    const project = projects.find(p => p.id === params.id);
    
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    
    return NextResponse.json(project);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load project";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
