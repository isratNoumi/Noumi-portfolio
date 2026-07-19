export type SkillGroup = {
  title: string;
  items: string[];
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "AI & LLM",
    items: [
      "Agentic AI Systems",
      "AI Agents",
      "LangChain",
      "RAG Pipelines",
      "Prompt Engineering",
      "LLM Integration",
      "Embedding Models",
      "Azure OpenAI",
    ],
  },
  {
    title: "Machine Learning & NLP",
    items: [
      "PyTorch",
      "TensorFlow",
      "Scikit-learn",
      "Transformers (Hugging Face)",
      "CNNs",
      "RNNs",
      "GANs",
      "Reinforcement Learning",
      "NER",
      "Sentiment Analysis",
    ],
  },
  {
    title: "Backend & Go",
    items: [
      "Golang",
      "Iris",
      "Gin",
      "GORM",
      "FastAPI",
      "REST APIs",
      "Microservices",
      "Concurrency",
      "WebSockets",
      "Distributed Systems",
    ],
  },
  {
    title: "Frontend & Web",
    items: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "HTML5",
      "CSS",
    ],
  },
  {
    title: "Databases & Data",
    items: [
      "PostgreSQL",
      "MySQL",
      "MS-SQL",
      "Redis",
      "Supabase",
      "Pandas",
      "NumPy",
    ],
  },
  {
    title: "DevOps & Cloud",
    items: [
      "Docker",
      "Azure",
      "AWS",
      "Terraform",
      "CI/CD",
      "Git / GitHub",
      "Postman",
      "Bruno",
    ],
  },
];

export const LANGUAGES = ["Golang", "Python", "TypeScript", "Java", "C", "SQL"];

export const SPOKEN_LANGUAGES = [
  { name: "English", level: "Fluent" },
  { name: "Bangla", level: "Native" },
];
