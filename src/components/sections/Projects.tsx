"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github as GithubIcon, ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Chip } from "@/components/ui/Chip";
import { Tilt3D } from "@/components/ui/Tilt3D";
import { PROJECTS, type Project } from "@/content/projects";
import { cn } from "@/lib/utils";

type Filter = "All" | Project["category"];

const FILTERS: Filter[] = [
  "All",
  "AI",
  "Backend",
  "Distributed Systems",
  "Personal",
];

function ProjectCard({
  project,
  index,
  featured,
}: {
  project: Project;
  index: number;
  featured: boolean;
}) {
  const cardRef = React.useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--x", `${x}%`);
    el.style.setProperty("--y", `${y}%`);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={cn(featured && "md:col-span-2")}
    >
      <Tilt3D max={6} perspective={1100} className="h-full">
        <article
          ref={cardRef}
          onMouseMove={onMouseMove}
          className={cn(
            "group relative h-full overflow-hidden rounded-2xl border border-white/10 " +
              "bg-white/[0.03] p-6 backdrop-blur-md transition-all duration-300 " +
              "hover:border-brand-400/40 hover:shadow-glow",
          )}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), rgba(200,255,43,0.12), transparent 40%)",
            }}
          />
          <div
            className="relative flex h-full flex-col"
            style={{ transform: "translateZ(30px)" }}
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs uppercase tracking-widest text-brand-300">
                  {project.category}
                </span>
                {featured && (
                  <span className="rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent-soft">
                    Featured
                  </span>
                )}
              </div>
              <span className="font-mono text-xs text-ink-faint">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <h3 className="mb-2 font-display text-xl font-semibold text-ink">
              {project.title}
            </h3>
            <p className="mb-5 text-sm text-ink-muted">
              {featured ? project.description : project.pitch}
            </p>

            {project.highlights.length > 0 && (
              <ul className="mb-5 space-y-1.5 text-sm text-ink-muted">
                {project.highlights.slice(0, 3).map((h) => (
                  <li key={h} className="flex gap-2">
                    <span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-brand-400" />
                    {h}
                  </li>
                ))}
              </ul>
            )}

            <div className="mb-5 flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
            </div>

            <div className="mt-auto flex items-center gap-3">
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-medium text-brand-300 transition hover:text-accent"
                >
                  Live <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              )}
              {project.links.code && (
                <a
                  href={project.links.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-medium text-ink-muted transition hover:text-ink"
                >
                  <GithubIcon className="h-3.5 w-3.5" /> Code
                </a>
              )}
              {project.links.caseStudy && (
                <a
                  href={project.links.caseStudy}
                  className="inline-flex items-center gap-1 text-sm font-medium text-ink-muted transition hover:text-ink"
                >
                  Case Study <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
        </article>
      </Tilt3D>
    </motion.div>
  );
}

export function Projects() {
  const [filter, setFilter] = React.useState<Filter>("All");
  const visible =
    filter === "All"
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === filter);

  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Selected work."
      description="Production AI, backend systems, and personal builds — filtered by the work you want to inspect."
    >
      <div
        className="mb-8 flex gap-2 overflow-x-auto pb-2"
        role="group"
        aria-label="Filter projects"
      >
        {FILTERS.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            aria-pressed={filter === item}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 font-mono text-xs transition-colors",
              filter === item
                ? "border-brand-400/50 bg-brand/10 text-brand-300"
                : "border-white/10 bg-white/[0.02] text-ink-muted hover:border-white/20 hover:text-ink",
            )}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {visible.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={index}
            featured={index === 0 && Boolean(project.featured)}
          />
        ))}
      </div>
    </Section>
  );
}
