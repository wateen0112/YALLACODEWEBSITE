export interface Project {
  id: string;
  _id: string;
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  image: string;

  tags: string[];
  status: "Completed" | "In Progress" | "Case Study" | "Pending" | string;
  project_url?: string;
  shortDescription: string;
  longDescription: string;
  technologies: string[];
  demoLink: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export const projects: Project[] = [
  {
    id: "1",
    _id: "1",
    slug: "novapay",
    title: "NovaPay",
    description: "Fintech payment platform with secure transactions.",
    coverImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80",
    tags: ["React", "Node.js", "Stripe"],
    status: "Completed",
    shortDescription: "Fintech payment platform with secure transactions.",
    longDescription: "Fintech payment platform with secure transactions and real-time processing.",
    technologies: ["React", "Node.js", "Stripe"],
    demoLink: "https://novapay.example.com",
    project_url: "https://novapay.example.com",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
    __v: 0,
  },
  {
    id: "2",
    _id: "2",
    slug: "healthai",
    title: "HealthAI",
    description: "Medical diagnosis assistant powered by deep learning.",
    coverImage: "https://images.unsplash.com/photo-1576091160550-2173ff9e5eb3?auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1576091160550-2173ff9e5eb3?auto=format&fit=crop&q=80",
    tags: ["Python", "TensorFlow"],
    status: "Case Study",
    shortDescription: "Medical diagnosis assistant powered by deep learning.",
    longDescription: "Medical diagnosis assistant powered by deep learning with advanced image recognition.",
    technologies: ["Python", "TensorFlow"],
    demoLink: "https://healthai.example.com",
    project_url: "https://healthai.example.com",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
    __v: 0,
  },
  {
    id: "3",
    _id: "3",
    slug: "urbannav",
    title: "UrbanNav",
    description: "Smart city navigation with real-time traffic updates.",
    coverImage: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80",
    tags: ["React Native", "MapBox"],
    status: "In Progress",
    shortDescription: "Smart city navigation with real-time traffic updates.",
    longDescription: "Smart city navigation with real-time traffic updates and route optimization.",
    technologies: ["React Native", "MapBox"],
    demoLink: "https://urbannav.example.com",
    project_url: "https://urbannav.example.com",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
    __v: 0,
  },
  {
    id: "4",
    _id: "4",
    slug: "eduflow",
    title: "EduFlow",
    description: "LMS platform for modern decentralized education.",
    coverImage: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80",
    tags: ["Next.js", "PostgreSQL", "WebRTC"],
    status: "Completed",
    shortDescription: "LMS platform for modern decentralized education.",
    longDescription: "LMS platform for modern decentralized education with video conferencing.",
    technologies: ["Next.js", "PostgreSQL", "WebRTC"],
    demoLink: "https://eduflow.example.com",
    project_url: "https://eduflow.example.com",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
    __v: 0,
  },
  {
    id: "5",
    _id: "5",
    slug: "stocksense",
    title: "StockSense",
    description: "AI trading insights and market predictions.",
    coverImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80",
    tags: ["FastAPI", "Chart.js"],
    status: "In Progress",
    shortDescription: "AI trading insights and market predictions.",
    longDescription: "AI trading insights and market predictions with real-time data analysis.",
    technologies: ["FastAPI", "Chart.js"],
    demoLink: "https://stocksense.example.com",
    project_url: "https://stocksense.example.com",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
    __v: 0,
  },
  {
    id: "6",
    _id: "6",
    slug: "cloudops",
    title: "CloudOps",
    description: "DevOps dashboard for global infrastructure monitoring.",
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80",
    tags: ["Docker", "Kubernetes", "Grafana"],
    status: "Completed",
    shortDescription: "DevOps dashboard for global infrastructure monitoring.",
    longDescription: "DevOps dashboard for global infrastructure monitoring with real-time alerts.",
    technologies: ["Docker", "Kubernetes", "Grafana"],
    demoLink: "https://cloudops.example.com",
    project_url: "https://cloudops.example.com",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
    __v: 0,
  }
];
