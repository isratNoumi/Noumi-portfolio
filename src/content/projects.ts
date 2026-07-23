export type Project = {
  slug: string;
  title: string;
  pitch: string;
  description: string;
  tech: string[];
  highlights: string[];
  links: {
    live?: string;
    code?: string;
    caseStudy?: string;
  };
  featured?: boolean;
  company?: string;
  category: "AI" | "Full-Stack" | "Backend" | "Distributed Systems" | "Personal";
};

// NOTE: Enterprise/work projects don't expose public code links.
// Personal projects link to https://github.com/isratNoumi — update with specific repo URLs when available.
const GH = "https://github.com/isratNoumi";

export const PROJECTS: Project[] = [
  {
    slug: "pricescout-ai",
    title: "PriceScoutAI",
    pitch: "LLM-reasoned shopping across international markets.",
    description:
      "An AI agent that helps shoppers find the best place to buy a product across international markets. Uses an LLM as a reasoning layer over deterministic tools — parses freeform requests, searches live retailers with locale-aware currency detection, and explains recommendations with concrete trade-offs.",
    tech: [
      "FastAPI",
      "Pydantic v2",
      "OpenAI Responses API",
      "Azure OpenAI",
      "Next.js 15",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "TanStack Query",
      "Serper.dev",
      "httpx",
      "uv",
      "pytest",
    ],
    highlights: [
      "Product Understanding Agent parses freeform queries like \"Logitech MX Master 3S under $90\" into normalized search intents",
      "Locale-aware Google Shopping via Serper (gl/hl) — India returns Flipkart/Amazon.in in INR, Bangladesh returns Daraz/Apple Gadgets in BDT",
      "Deterministic comparison layer computes cheapest, best value, fastest delivery & highest rated — objective math kept out of the LLM to prevent hallucination",
      "Recommendation Agent weighs total cost, rating confidence (score + review count), delivery speed, stock & store reputation",
      "Graceful fallback to mock provider + rule-based recommendation when API keys aren't configured — fully usable offline",
    ],
    links: { code: GH },
    featured: true,
    category: "AI",
  },
  {
    slug: "inspectra",
    title: "Inspectra",
    pitch: "AI-powered security assessment platform.",
    description:
      "An automated penetration-testing platform orchestrating SAST, DAST and AI/LLM red-teaming pipelines. Correlates and prioritizes findings across OWASP Top 10 and LLM Top 10.",
    tech: [
      "FastAPI",
      "Next.js",
      "Agentic AI",
      "LLM Integration",
      "LangChain",
      "Azure Blob",
      "Docker",
    ],
    highlights: [
      "Multi-phase pipeline combining SAST, DAST and LLM red-teaming",
      "Agentic AI system for finding correlation & prioritization",
      "Automated DOCX report generation + Azure Blob delivery",
      "Full-stack containerized with Docker",
    ],
    links: {},
    featured: true,
    company: "Dexian Bangladesh",
    category: "AI",
  },
  {
    slug: "hirenext",
    title: "HireNEXT",
    pitch: "AI-powered recruitment platform.",
    description:
      "Recruitment platform automating modern hiring workflows — JD generation, CV analysis, candidate shortlisting and interview prep — powered by Azure OpenAI.",
    tech: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Azure OpenAI",
    ],
    highlights: [
      "AI-driven JD generation, CV analysis & interview prep",
      "JWT + RBAC middleware, RLS policies, rate limiting",
      "Real-time notifications and automated recruitment workflows",
    ],
    links: {},
    featured: true,
    company: "Dexian Bangladesh",
    category: "AI",
  },
  {
    slug: "depot-sync",
    title: "Depot Sync System",
    pitch: "Distributed sync platform for pharmacy software.",
    description:
      "A distributed synchronization system between remote and local pharmacy software. Handles real-time inventory + order sync with conflict resolution and retry mechanisms.",
    tech: ["Golang", "Iris", "GORM", "MySQL", "Redis"],
    highlights: [
      "Concurrent sync via Goroutines & channels for async processing",
      "Conflict resolution, retries and live order consistency",
      "Redis-backed sync state + queue optimization",
      "GORM transactions to guarantee cross-system data integrity",
    ],
    links: {},
    featured: true,
    company: "Selopia",
    category: "Distributed Systems",
  },
  {
    slug: "school-management-system",
    title: "School Management System",
    pitch: "Production-ready enterprise platform.",
    description:
      "End-to-end SMS covering curriculum, routine, academic and result modules — built on Go (Iris) + GORM with a scalable PostgreSQL architecture.",
    tech: ["Golang", "Iris", "GORM", "PostgreSQL", "Redis", "JWT"],
    highlights: [
      "Optimized RESTful APIs for complex academic workflows",
      "JWT + RBAC, GoValidator, Morkid Pagination, centralized errors",
      "Redis caching reduced DB load on hot academic data",
      "GORM transactions ensured data consistency in critical ops",
    ],
    links: {},
    company: "Selopia",
    category: "Backend",
  },
  {
    slug: "hr-management",
    title: "HR Management Software",
    pitch: "Secure enterprise HR REST APIs in Go.",
    description:
      "Employee and workforce management APIs built with Go (Iris) + GORM on PostgreSQL, with middleware-based access control and advanced filtering.",
    tech: ["Golang", "Iris", "GORM", "PostgreSQL", "JWT"],
    highlights: [
      "Secure REST APIs with JWT + middleware access control",
      "Structured validation, filtering & pagination",
      "PostgreSQL data model for enterprise workforce management",
    ],
    links: {},
    company: "Selopia",
    category: "Backend",
  },
  {
    slug: "check-inn",
    title: "Check Inn",
    pitch: "Java hotel management system.",
    description:
      "JavaFX-based hotel management system: automated reservations, customer & staff records, and billing slip generation — all through a friendly desktop UI.",
    tech: ["Java", "JavaFX 15", "MySQL", "JDK 1.8"],
    highlights: [
      "Automated reservation & billing workflow",
      "Customer + staff record management",
      "Full desktop UI with printable billing slips",
    ],
    links: { code: GH },
    category: "Personal",
  },
  {
    slug: "airrush",
    title: "AirRush",
    pitch: "2D side-scrolling desktop game.",
    description:
      "A 2D side-scrolling game written in C with iGraphics. Two playable levels, obstacle dodging, coin collection, persistent high scores and pause/resume.",
    tech: ["C", "iGraphics"],
    highlights: [
      "Two playable levels with obstacle avoidance",
      "Coin collection + persistent high-score system",
      "Pause / resume game-loop control",
    ],
    links: { code: GH },
    category: "Personal",
  },
  {
    slug: "readers-den",
    title: "Reader's Den",
    pitch: "Android online bookstore app.",
    description:
      "Android app for online book shopping — inventory management, customer billing and a clean UI compatible with most Android devices.",
    tech: ["Android", "Java"],
    highlights: [
      "Book catalog + inventory management",
      "Customer billing and order flow",
      "Compatible across Android device sizes",
    ],
    links: { code: GH },
    category: "Personal",
  },
  {
    slug: "bazarsodai",
    title: "BazarSodai",
    pitch: "MVC .NET marketplace for daily essentials.",
    description:
      "Online marketplace built on MVC .NET architecture in C#. Product management, customer ordering and home delivery workflows.",
    tech: ["C#", "ASP.NET MVC"],
    highlights: [
      "Product management modules",
      "Customer ordering workflow",
      "Home-delivery order pipeline",
    ],
    links: { code: GH },
    category: "Personal",
  },
];
