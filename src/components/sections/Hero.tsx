"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight, FileDown, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CodeEditorCard } from "@/components/ui/CodeEditorCard";
import { PROFILE, SOCIALS } from "@/content/profile";
import { withBase } from "@/lib/paths";

const words = [
  "AI Engineer",
  "Agentic AI Engineer",
  "AI/ML Application Developer",
  "Full-Stack AI Engineer"
];

function useRotator(items: string[], intervalMs = 2400) {
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(
      () => setI((prev) => (prev + 1) % items.length),
      intervalMs,
    );
    return () => clearInterval(id);
  }, [items.length, intervalMs]);
  return items[i];
}

export function Hero() {
  const active = useRotator(words);
  const github = SOCIALS.find((s) => s.label === "GitHub")?.href;
  const linkedin = SOCIALS.find((s) => s.label === "LinkedIn")?.href;

  return (
    <section
      id="top"
      className="relative flex min-h-[92vh] items-center overflow-hidden"
    >
      {/* Animated background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-20">
        <div className="absolute left-1/2 top-1/3 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/30 opacity-40 blur-[120px]" />
        <div className="absolute right-1/4 top-1/4 h-[360px] w-[360px] rounded-full bg-accent/20 opacity-40 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(ellipse at center, black 40%, transparent 75%)",
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-[1400px] px-4 py-14 sm:px-6 sm:py-20 md:px-10 md:py-24 lg:px-16">
        <div className="grid items-center gap-10 md:grid-cols-[1fr_1.05fr] md:gap-16 lg:gap-24">
          {/* LEFT — Copy */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Hi, I&apos;m <span className="text-gradient">{PROFILE.name}</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-5 flex items-center text-lg text-ink-muted sm:text-xl"
            >
              <motion.span
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="rounded-md bg-white/[0.04] px-2 py-0.5 font-mono text-brand-300"
              >
                {active}
              </motion.span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-6 max-w-2xl text-base text-ink-muted sm:text-lg"
            >
              I build <span className="text-ink">production AI systems</span>,
              from agentic security pipelines to LLM-powered recruitment
              products. Currently shipping at{" "}
              <span className="text-ink">Dexian Bangladesh</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <Button href="#projects">
                View Work <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                href={withBase("/resume.pdf")}
                variant="outline"
                external
              >
                <FileDown className="h-4 w-4" /> Resume
              </Button>
              {github && (
                <Button
                  href={github}
                  variant="ghost"
                  external
                  aria-label="GitHub"
                >
                  <Github className="h-4 w-4" />
                </Button>
              )}
              {linkedin && (
                <Button
                  href={linkedin}
                  variant="ghost"
                  external
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </Button>
              )}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-12 hidden font-mono text-xs uppercase tracking-[0.25em] text-ink-faint md:mt-16 md:block"
            >
              scroll to explore ↓
            </motion.p>
          </div>

          {/* RIGHT — Mock IDE showing noumi.ts */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="w-full"
          >
            <CodeEditorCard className="mx-auto md:ml-auto md:mr-0" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
