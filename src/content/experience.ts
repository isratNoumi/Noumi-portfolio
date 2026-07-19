export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  location?: string;
  bullets: string[];
  tech?: string[];
};

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: "Dexian Bangladesh",
    role: "AI/ML Application Developer",
    period: "Feb 2026 — Present",
    location: "Dhaka, Bangladesh · Full-time",
    bullets: [
      "Built Inspectra — an automated penetration-testing platform orchestrating SAST, DAST and AI/LLM red-teaming pipelines.",
      "Built agentic AI workflows to correlate and prioritize findings across OWASP Top 10 and LLM Top 10 categories.",
      "Shipped automated DOCX security report generation and Azure Blob-based delivery pipelines.",
      "Contributed to HireNEXT — an AI-powered recruitment platform (Next.js, TypeScript, Supabase, Azure OpenAI) automating JD generation, CV analysis and interview prep.",
      "Implemented secure APIs with JWT, RBAC middleware, RLS policies and rate limiting; containerized the full stack with Docker.",
    ],
    tech: [
      "FastAPI",
      "Next.js",
      "TypeScript",
      "LLMs",
      "Agentic AI",
      "LangChain",
      "PostgreSQL",
      "Azure",
      "Docker",
    ],
  },
  {
    company: "Selopia",
    role: "Software Engineer (Golang)",
    period: "Sep 2025 — Jan 2026",
    location: "Dhaka, Bangladesh",
    bullets: [
      "Built HR Management Software — secure REST APIs in Go (Iris) with GORM on PostgreSQL, middleware-based access control and advanced filtering/pagination.",
      "Built Depot Sync System — a distributed sync platform between remote and local pharmacy software using Go, Iris and GORM on MySQL.",
      "Implemented concurrent sync workflows with Goroutines and channels for real-time asynchronous processing.",
      "Added conflict resolution, retry mechanisms and live order consistency across distributed platforms.",
      "Used Redis for sync state management + queue optimization; GORM transactions ensured cross-system data integrity.",
    ],
    tech: ["Golang", "Iris", "GORM", "PostgreSQL", "MySQL", "Redis", "JWT"],
  },
  {
    company: "Selopia",
    role: "Golang Developer Intern",
    period: "Apr 2025 — Aug 2025",
    location: "Dhaka, Bangladesh",
    bullets: [
      "Shipped a production-ready School Management System in Go (Iris) + GORM covering curriculum, routine, academic and result modules.",
      "Designed scalable PostgreSQL schemas and optimized RESTful APIs for complex academic workflows.",
      "Integrated JWT auth, RBAC, structured validation (GoValidator), centralized error handling and Morkid Pagination.",
      "Used Redis caching to speed up frequently-accessed academic data and cut database load.",
      "Applied GORM transactions to guarantee data consistency and integrity in critical academic operations.",
    ],
    tech: ["Golang", "Iris", "GORM", "PostgreSQL", "Redis", "JWT"],
  },
];
