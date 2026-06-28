"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Project } from "@/lib/projects";
import { Clock, Globe, Tag, ExternalLink, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { GlowButton } from "@/components/ui/GlowButton";

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations("projects");
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/projects/${params.id}`);
        if (!response.ok) {
          
          if (response.status === 404) {
            setError("Project not found");
          } else {
            setError("Failed to load project");
          }
          return;
        }
        const data = await response.json();
        console.log(data)
        setProject(data);
      } catch {
        setError("Failed to load project");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProject();
    }
  }, [params.id]);

  const statusKeyMap: Record<string, string> = {
    Completed: "completed",
    "In Progress": "in_progress",
    "Case Study": "case_study",
    completed: "completed",
    in_progress: "in_progress",
    "in progress": "in_progress",
    case_study: "case_study",
    "case study": "case_study"
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary mb-4">
            {error || "Project not found"}
          </h1>
          <GlowButton onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("back_to_projects")}
          </GlowButton>
        </div>
      </div>
    );
  }

  const statusKey = statusKeyMap[project.status] ?? "";
  const titleKey = `items.${project.slug}.title`;
  const descriptionKey = `items.${project.slug}.description`;
  const translatedTitle = t.has(titleKey) ? t(titleKey) : project.title;
  const translatedDescription = t.has(descriptionKey) ? t(descriptionKey) : project.description;
  const translatedStatus = statusKey && t.has(`status.${statusKey}`) ? t(`status.${statusKey}`) : project.status;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <GlowButton 
            variant="secondary" 
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("back_to_projects")}
          </GlowButton>
        </motion.div>

        {/* Project Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative rounded-2xl overflow-hidden bg-surface border border-primary-600/20 shadow-xl mb-6">
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                priority
              />
              <div className="absolute top-4 left-4">
                <span className="px-4 py-2 text-sm font-semibold bg-surface/80 text-primary-400 rounded-full backdrop-blur-md border border-primary-600/20">
                  {translatedStatus}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-text-primary mb-2">
                {translatedTitle}
              </h1>
              <p className="text-lg text-text-secondary">
                {translatedDescription}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Project Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid lg:grid-cols-3 gap-8"
        >
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Overview */}
            <div className="bg-surface rounded-2xl p-6 border border-primary-600/20">
              <h2 className="text-2xl font-bold text-text-primary mb-4">
                {t("project_overview")}
              </h2>
           
            </div>

            {/* Technologies */}
            <div className="bg-surface rounded-2xl p-6 border border-primary-600/20">
              <h2 className="text-2xl font-bold text-text-primary mb-4">
                {t("technologies")}
              </h2>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-primary-600/10 text-primary-400 rounded-lg border border-primary-600/20 font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <div className="bg-surface rounded-2xl p-6 border border-primary-600/20">
                <h2 className="text-2xl font-bold text-text-primary mb-4">
                  {t("tags")}
                </h2>
                <div className="flex flex-wrap gap-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-primary-600/10 text-primary-400 rounded-lg border border-primary-600/20 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Info */}
            <div className="bg-surface rounded-2xl p-6 border border-primary-600/20">
              <h3 className="text-lg font-bold text-text-primary mb-4">
                {t("project_info")}
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary-400" />
                  <div>
                    <p className="text-sm text-text-secondary">{t("status_label")}</p>
                    <p className="font-medium text-text-primary">{translatedStatus}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Tag className="w-5 h-5 text-primary-400" />
                  <div>
                    <p className="text-sm text-text-secondary">{t("project_id")}</p>
                    <p className="font-medium text-text-primary">{project.id}</p>
                  </div>
                </div>

         
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary-400" />
                  <div>
                    <p className="text-sm text-text-secondary">{t("created")}</p>
                    <p className="font-medium text-text-primary">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary-400" />
                  <div>
                    <p className="text-sm text-text-secondary">{t("updated")}</p>
                    <p className="font-medium text-text-primary">
                      {new Date(project.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-surface rounded-2xl p-6 border border-primary-600/20">
              <h3 className="text-lg font-bold text-text-primary mb-4">
                {t("actions")}
              </h3>
              
              <div className="space-y-3">
                {project.project_url && project.project_url !== "" && (
                  <GlowButton 
                    className="w-full justify-center"
                    onClick={() => window.open(project.project_url, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {t("view_live_project")}
                  </GlowButton>
                )}
                {project.demoLink && project.demoLink !== "#" && (
                  <GlowButton 
                    className="w-full justify-center"
                    onClick={() => window.open(project.demoLink, '_blank')}
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    View Demo
                  </GlowButton>
                )}
                {(!project.project_url || project.project_url === "") && !project.demoLink && (
                  <div className="text-center text-text-secondary text-sm p-4 border border-primary-600/20 rounded-lg">
                    <ExternalLink className="w-4 h-4 mx-auto mb-2 opacity-50" />
                    <p>No project links available</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
