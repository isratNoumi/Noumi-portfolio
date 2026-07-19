import { GraduationCap } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { EDUCATION } from "@/content/education";

export function Education() {
  return (
    <Section
      id="education"
      eyebrow="Education"
      title="Where I studied."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {EDUCATION.map((edu, i) => (
          <Card key={`${edu.institution}-${i}`}>
            <div className="mb-3 flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-brand/15 text-brand-300">
                <GraduationCap className="h-4 w-4" />
              </span>
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-brand-300">
                  {edu.period}
                  {edu.location ? (
                    <span className="text-ink-faint"> · {edu.location}</span>
                  ) : null}
                </p>
                <h3 className="mt-1 font-display text-lg font-semibold text-ink">
                  {edu.degree}
                </h3>
                <p className="text-sm text-ink-muted">{edu.institution}</p>
              </div>
            </div>
            {edu.details && (
              <p className="text-sm text-ink-muted">{edu.details}</p>
            )}
          </Card>
        ))}
      </div>
    </Section>
  );
}
