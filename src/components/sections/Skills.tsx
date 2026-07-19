import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { SKILL_GROUPS } from "@/content/skills";

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="Tools I reach for."
      description="A working stack shaped by real projects — updated as I learn."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SKILL_GROUPS.map((group) => (
          <Card key={group.title}>
            <h3 className="mb-4 font-display text-lg font-semibold text-ink">
              {group.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <Chip key={item}>{item}</Chip>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
