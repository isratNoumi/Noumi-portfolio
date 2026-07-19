"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Chip } from "@/components/ui/Chip";
import { EXPERIENCE } from "@/content/experience";

/** Two-letter monogram from the company name */
function monogram(name: string) {
  const parts = name.trim().split(/\s+/);
  const letters = (parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? parts[0]?.[1] ?? "");
  return letters.toUpperCase();
}

export function Experience() {
  const trackRef = React.useRef<HTMLDivElement>(null);
  // Draw the timeline stroke as the section scrolls through the viewport
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 80%", "end 20%"],
  });
  const strokeHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Where I've built things."
      description="A short timeline of the teams and problems I've worked on."
    >
      <div ref={trackRef} className="relative">
        {/* Static background rail */}
        <div className="pointer-events-none absolute left-[15px] top-0 h-full w-px bg-white/10 md:left-[19px]" />
        {/* Animated stroke drawn on scroll */}
        <motion.div
          style={{ height: strokeHeight }}
          className="pointer-events-none absolute left-[15px] top-0 w-px origin-top bg-gradient-to-b from-brand-400 via-brand-400/70 to-accent md:left-[19px]"
        />

        <ol className="space-y-10">
          {EXPERIENCE.map((item, i) => (
            <motion.li
              key={`${item.company}-${i}`}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative pl-12 md:pl-16"
            >
              {/* Marker */}
              <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-brand-400/40 bg-bg-surface shadow-glow md:h-10 md:w-10">
                {i === 0 ? (
                  <Briefcase className="h-4 w-4 text-brand-300" />
                ) : (
                  <span className="font-mono text-[10px] font-semibold text-brand-300 md:text-xs">
                    {monogram(item.company)}
                  </span>
                )}
                {i === 0 && (
                  <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-brand-400/40" />
                )}
              </div>

              {/* Card */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md transition-colors hover:border-brand-400/40">
                <p className="font-mono text-xs uppercase tracking-widest text-brand-300">
                  {item.period}
                  {item.location ? (
                    <span className="text-ink-faint"> · {item.location}</span>
                  ) : null}
                </p>
                <h3 className="mt-1 font-display text-xl font-semibold text-ink">
                  {item.role}{" "}
                  <span className="text-ink-muted">@ {item.company}</span>
                </h3>
                {item.bullets.length > 0 && (
                  <ul className="mt-3 space-y-1.5 text-sm text-ink-muted">
                    {item.bullets.map((b, bi) => (
                      <li key={bi} className="flex gap-2">
                        <span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-brand-400" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
                {item.tech && item.tech.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {item.tech.map((t) => (
                      <Chip key={t}>{t}</Chip>
                    ))}
                  </div>
                )}
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
