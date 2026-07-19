import * as React from "react";
import { cn } from "@/lib/utils";

type SectionProps = Omit<React.HTMLAttributes<HTMLElement>, "title"> & {
  id?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  containerClassName?: string;
};

export function Section({
  id,
  eyebrow,
  title,
  description,
  className,
  containerClassName,
  children,
  ...rest
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("relative scroll-mt-24 py-24 sm:py-28", className)}
      {...rest}
    >
      <div className={cn("container-narrow", containerClassName)}>
        {(eyebrow || title || description) && (
          <header className="mb-12 max-w-3xl">
            {eyebrow && (
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-brand-300">
                <span className="text-accent">/</span> {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-base text-ink-muted sm:text-lg">
                {description}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
