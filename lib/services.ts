import { LucideIcon, Smartphone, BrainCircuit, Cloud, Palette, Blocks, TerminalSquare } from "lucide-react";

export type ServiceColor = "cyan" | "violet" | "sky" | "fuchsia" | "emerald" | "amber";

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: ServiceColor;
}

export const services: Service[] = [
  {
    id: "web-mobile",
    title: "Web & Mobile Development",
    description: "Scalable, high-performance applications built with modern frameworks.",
    icon: Smartphone,
    color: "cyan",
  },
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    description: "Intelligent systems tailored to automate and optimize workflows.",
    icon: BrainCircuit,
    color: "violet",
  },
  {
    id: "cloud",
    title: "Cloud Architecture",
    description: "Resilient and secure cloud infrastructure designed for global scale.",
    icon: Cloud,
    color: "sky",
  },
  {
    id: "ui-ux",
    title: "UI/UX Design Systems",
    description: "Beautiful, intuitive interfaces that enhance user engagement.",
    icon: Palette,
    color: "fuchsia",
  },
  {
    id: "api",
    title: "API & Microservices",
    description: "Modular backend solutions ensuring seamless data connectivity.",
    icon: Blocks,
    color: "emerald",
  },
  {
    id: "devops",
    title: "DevOps & Automation",
    description: "Streamlined deployment pipelines and infrastructure as code.",
    icon: TerminalSquare,
    color: "amber",
  }
];
