export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  tags: string[];
  status: "Completed" | "In Progress" | "Case Study" | string;
}

export const projects: Project[] = [
  {
    id: "1",
    slug: "novapay",
    title: "NovaPay",
    description: "Fintech payment platform with secure transactions.",
    coverImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80",
    tags: ["React", "Node.js", "Stripe"],
    status: "Completed",
  },
  {
    id: "2",
    slug: "healthai",
    title: "HealthAI",
    description: "Medical diagnosis assistant powered by deep learning.",
    coverImage: "https://images.unsplash.com/photo-1576091160550-2173ff9e5eb3?auto=format&fit=crop&q=80",
    tags: ["Python", "TensorFlow"],
    status: "Case Study",
  },
  {
    id: "3",
    slug: "urbannav",
    title: "UrbanNav",
    description: "Smart city navigation with real-time traffic updates.",
    coverImage: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80",
    tags: ["React Native", "MapBox"],
    status: "In Progress",
  },
  {
    id: "4",
    slug: "eduflow",
    title: "EduFlow",
    description: "LMS platform for modern decentralized education.",
    coverImage: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80",
    tags: ["Next.js", "PostgreSQL", "WebRTC"],
    status: "Completed",
  },
  {
    id: "5",
    slug: "stocksense",
    title: "StockSense",
    description: "AI trading insights and market predictions.",
    coverImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80",
    tags: ["FastAPI", "Chart.js"],
    status: "In Progress",
  },
  {
    id: "6",
    slug: "cloudops",
    title: "CloudOps",
    description: "DevOps dashboard for global infrastructure monitoring.",
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80",
    tags: ["Docker", "Kubernetes", "Grafana"],
    status: "Completed",
  }
];
