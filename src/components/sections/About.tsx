import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { TerminalCard } from "@/components/ui/TerminalCard";
import { BookOpen, FlaskConical, ShieldCheck } from "lucide-react";
import { PROFILE } from "@/content/profile";
import { LANGUAGES } from "@/content/skills";

const STATS = [
  { label: "Production Systems", value: "5+" },
  { label: "Personal Projects", value: "4+" },
  { label: "BSc CGPA", value: "3.83" },
  { label: "Publication", value: "1" },
];

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title={
        <>
          I turn AI research into products people{" "}
          <span className="text-gradient">actually use</span>.
        </>
      }
      description={`I'm ${PROFILE.name} — an AI/ML Application Developer at Dexian Bangladesh and MSc student at Brac University. I build LLM-powered products end-to-end: models, agents, APIs, and the UIs on top.`}
    >
      <div className="grid gap-6 md:grid-cols-5">
        <Card className="md:col-span-3">
          <div className="space-y-4 text-ink-muted">
            <p>
              My current work centers on{" "}
              <span className="text-ink">applied AI</span> —{" "}
              <span className="text-ink">agentic AI pipelines</span> for
              automated penetration testing, retrieval-augmented workflows,
              and{" "}
              <span className="text-ink">Azure OpenAI</span>-powered products
              like AI-driven recruitment platforms. I care about wiring models
              into real user experiences, not just prompts on a page.
            </p>
            <p>
              I also enjoy the engineering underneath —{" "}
              <span className="text-ink">FastAPI</span> backends,{" "}
              <span className="text-ink">Next.js</span> frontends, Docker
              containers, and reliable data pipelines. On the side I&apos;ve
              co-authored peer-reviewed NLP research on Bangla misogyny
              detection and shipped a few C/Java/.NET projects for fun.
            </p>
            <div className="pt-2">
              <p className="mb-2 font-mono text-xs uppercase tracking-widest text-ink-faint">
                Languages I code in
              </p>
              <div className="flex flex-wrap gap-2">
                {LANGUAGES.map((l) => (
                  <Chip key={l}>{l}</Chip>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-4 md:col-span-2">
          {STATS.map((s) => (
            <Card
              key={s.label}
              className="flex flex-col items-start justify-between p-5"
            >
              <span className="font-display text-3xl font-bold text-gradient">
                {s.value}
              </span>
              <span className="mt-2 text-xs uppercase tracking-widest text-ink-faint">
                {s.label}
              </span>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-8 border-y border-white/10 py-6">
        <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-brand-300">
          Currently
        </p>
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="flex gap-3">
            <ShieldCheck className="mt-0.5 h-4 w-4 flex-none text-brand-300" />
            <div>
              <p className="text-sm font-medium text-ink">Building</p>
              <p className="mt-1 text-sm text-ink-muted">
                Agentic security workflows and production AI products.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <BookOpen className="mt-0.5 h-4 w-4 flex-none text-brand-300" />
            <div>
              <p className="text-sm font-medium text-ink">Studying</p>
              <p className="mt-1 text-sm text-ink-muted">
                Advanced AI systems through my MSc at Brac University.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <FlaskConical className="mt-0.5 h-4 w-4 flex-none text-brand-300" />
            <div>
              <p className="text-sm font-medium text-ink">Exploring</p>
              <p className="mt-1 text-sm text-ink-muted">
                Reliable evaluation for LLM and retrieval workflows.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Terminal `whoami` — dev-flavored intro */}
      <div className="mt-8">
        <TerminalCard />
      </div>
    </Section>
  );
}
