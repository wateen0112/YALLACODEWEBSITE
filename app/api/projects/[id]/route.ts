import { NextRequest, NextResponse } from "next/server";
import { listProjectsFromApi } from "@/lib/projects-api";
import { logger } from "@/lib/logger";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const startTime = Date.now();
  let id = '';
  
  try {
    const resolvedParams = await params;
    id = resolvedParams.id;
    const projects = await listProjectsFromApi();
    const project = projects.find(p => p.id === id);
    
    if (!project) {
      const responseTime = Date.now() - startTime;
      logger.logApiResponse(`/api/projects/${id}`, 'GET', 404, responseTime, { projectId: id });
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    
    const responseTime = Date.now() - startTime;
    logger.logApiResponse(`/api/projects/${id}`, 'GET', 200, responseTime, { projectId: id, title: project.title });
    return NextResponse.json(project);
  } catch (error) {
    const responseTime = Date.now() - startTime;
    const message = error instanceof Error ? error.message : "Failed to load project";
    
    logger.logApiResponse(`/api/projects/${id}`, 'GET', 502, responseTime, { error: message });
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
