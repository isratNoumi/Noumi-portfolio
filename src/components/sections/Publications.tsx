import { BookOpen, Trophy } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { PUBLICATIONS, ACHIEVEMENTS } from "@/content/publications";

export function Publications() {
  return (
    <Section
      id="publications"
      eyebrow="Research & Recognition"
      title="Publications & achievements."
      description="Peer-reviewed research and academic honors."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <h3 className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-brand-300">
            <BookOpen className="h-3.5 w-3.5" /> Publications
          </h3>
          {PUBLICATIONS.map((p, i) => (
            <Card key={i}>
              <h4 className="font-display text-base font-semibold leading-snug text-ink">
                {p.title}
              </h4>
              <p className="mt-2 text-sm text-ink-muted">{p.authors}</p>
              <p className="mt-2 text-xs text-ink-faint">
                <span className="text-brand-300">{p.year}</span> · {p.venue}
              </p>
              {p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-sm text-brand-300 hover:text-accent"
                >
                  Read paper →
                </a>
              )}
            </Card>
          ))}
        </div>

        <div className="space-y-4">
          <h3 className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-brand-300">
            <Trophy className="h-3.5 w-3.5" /> Achievements
          </h3>
          {ACHIEVEMENTS.map((a, i) => (
            <Card key={i}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="font-display text-base font-semibold text-ink">
                    {a.title}
                  </h4>
                  {a.detail && (
                    <p className="mt-1 text-sm text-ink-muted">{a.detail}</p>
                  )}
                </div>
                <span className="font-mono text-xs text-brand-300">
                  {a.year}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
