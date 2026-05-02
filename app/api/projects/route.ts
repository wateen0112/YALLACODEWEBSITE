import { NextRequest, NextResponse } from "next/server";
import { listProjectsFromApi, createProjectWithImage } from "@/lib/projects-api";
import { logger } from "@/lib/logger";

export async function GET() {
  const startTime = Date.now();
  try {
    const projects = await listProjectsFromApi();
    const responseTime = Date.now() - startTime;
    
    logger.logApiResponse('/api/projects', 'GET', 200, responseTime, { count: projects.length });
    return NextResponse.json(projects);
  } catch (error) {
    const responseTime = Date.now() - startTime;
    const message = error instanceof Error ? error.message : "Failed to load projects from API";
    
    logger.logApiResponse('/api/projects', 'GET', 502, responseTime, { error: message });
    return NextResponse.json({ error: message }, { status: 502 });
  }
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  try {
    const formData = await request.formData();
    
    // Forward FormData to the backend API
    const project = await createProjectWithImage(formData);
    const responseTime = Date.now() - startTime;
    
    logger.logApiResponse('/api/projects', 'POST', 200, responseTime, { projectId: project.id });
    return NextResponse.json(project);
  } catch (error) {
    const responseTime = Date.now() - startTime;
    const message = error instanceof Error ? error.message : "Failed to create project";
    
    logger.logApiResponse('/api/projects', 'POST', 502, responseTime, { error: message });
    return NextResponse.json({ error: message }, { status: 502 });
  }
}

