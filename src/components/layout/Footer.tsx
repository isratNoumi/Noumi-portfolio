import Link from "next/link";
import { SOCIALS, PROFILE } from "@/content/profile";
import { withBase } from "@/lib/paths";

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 py-10">
      <div className="container-narrow flex flex-col items-center justify-between gap-6 sm:flex-row">
        <p className="text-sm text-ink-muted">
          © {new Date().getFullYear()}{" "}
          <span className="text-ink">{PROFILE.name}</span>. Built with{" "}
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-300 hover:text-accent"
          >
            Next.js
          </a>{" "}
          &{" "}
          <a
            href="https://tailwindcss.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-300 hover:text-accent"
          >
            Tailwind
          </a>
          .
        </p>
        <div className="flex items-center gap-2">
          {SOCIALS.map((s) => {
            const Icon = s.icon;
            const href = s.href.startsWith("/") ? withBase(s.href) : s.href;
            const external =
              s.external || href.startsWith("http") || href.startsWith("mailto:");
            const Cmp = external ? "a" : Link;
            return (
              <Cmp
                key={s.label}
                href={href}
                aria-label={s.label}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-ink-muted transition hover:border-brand-400/40 hover:text-brand-300"
              >
                <Icon className="h-4 w-4" />
              </Cmp>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
