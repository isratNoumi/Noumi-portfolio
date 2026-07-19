"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Command,
  FileDown,
  Github,
  Home,
  Layers,
  Linkedin,
  Mail,
  Search,
  User,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SOCIALS } from "@/content/profile";
import { withBase } from "@/lib/paths";
import { cn } from "@/lib/utils";

type Action = {
  id: string;
  label: string;
  hint?: string;
  icon: LucideIcon;
  keywords?: string;
  group: "Navigate" | "Links" | "Actions";
  run: () => void;
};

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const github = SOCIALS.find((s) => s.label === "GitHub")?.href;
  const linkedin = SOCIALS.find((s) => s.label === "LinkedIn")?.href;
  const email = SOCIALS.find((s) => s.label === "Email")?.href;

  const actions: Action[] = React.useMemo(
    () => [
      {
        id: "nav-top",
        label: "Home",
        icon: Home,
        group: "Navigate",
        run: () => scrollToId("top"),
      },
      {
        id: "nav-about",
        label: "About",
        icon: User,
        group: "Navigate",
        run: () => scrollToId("about"),
      },
      {
        id: "nav-skills",
        label: "Skills",
        icon: Wrench,
        group: "Navigate",
        run: () => scrollToId("skills"),
      },
      {
        id: "nav-projects",
        label: "Projects",
        icon: Layers,
        group: "Navigate",
        run: () => scrollToId("projects"),
      },
      {
        id: "nav-experience",
        label: "Experience",
        icon: Layers,
        group: "Navigate",
        run: () => scrollToId("experience"),
      },
      {
        id: "nav-education",
        label: "Education",
        icon: Layers,
        group: "Navigate",
        run: () => scrollToId("education"),
      },
      {
        id: "nav-contact",
        label: "Contact",
        icon: Mail,
        group: "Navigate",
        run: () => scrollToId("contact"),
      },
      ...(github
        ? [
            {
              id: "link-github",
              label: "Open GitHub",
              hint: "github.com/isratNoumi",
              icon: Github,
              group: "Links" as const,
              run: () => window.open(github, "_blank", "noopener,noreferrer"),
            },
          ]
        : []),
      ...(linkedin
        ? [
            {
              id: "link-linkedin",
              label: "Open LinkedIn",
              hint: "linkedin.com/in/isratnoumi",
              icon: Linkedin,
              group: "Links" as const,
              run: () =>
                window.open(linkedin, "_blank", "noopener,noreferrer"),
            },
          ]
        : []),
      ...(email
        ? [
            {
              id: "link-email",
              label: "Send email",
              hint: "isratmoyeen.23@gmail.com",
              icon: Mail,
              group: "Links" as const,
              run: () => (window.location.href = email),
            },
          ]
        : []),
      {
        id: "action-resume",
        label: "Download resume",
        hint: "PDF",
        icon: FileDown,
        group: "Actions",
        run: () => window.open(withBase("/resume.pdf"), "_blank"),
      },
    ],
    [github, linkedin, email],
  );

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter((a) => {
      const hay = `${a.label} ${a.hint ?? ""} ${a.keywords ?? ""} ${a.group}`.toLowerCase();
      return hay.includes(q);
    });
  }, [actions, query]);

  // Global keyboard handling
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const meta = e.metaKey || e.ctrlKey;
      if (meta && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setOpen(false);
      } else if (open) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setActive((i) => Math.min(i + 1, filtered.length - 1));
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setActive((i) => Math.max(i - 1, 0));
        } else if (e.key === "Enter") {
          e.preventDefault();
          const action = filtered[active];
          if (action) {
            action.run();
            setOpen(false);
          }
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, active]);

  // Reset state whenever the palette opens
  React.useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  React.useEffect(() => setActive(0), [query]);

  // Lock body scroll while open
  React.useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // Group actions by section for rendering
  const grouped = React.useMemo(() => {
    const map = new Map<string, Action[]>();
    filtered.forEach((a) => {
      const arr = map.get(a.group) ?? [];
      arr.push(a);
      map.set(a.group, arr);
    });
    return Array.from(map.entries());
  }, [filtered]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/70 px-4 pt-[16vh] backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-bg-surface/95 shadow-glow backdrop-blur-xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
          >
            {/* Search input */}
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
              <Search className="h-4 w-4 text-ink-faint" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search…"
                className="flex-1 bg-transparent text-sm text-ink placeholder:text-ink-faint focus:outline-none"
              />
              <kbd className="hidden rounded border border-white/10 px-1.5 py-0.5 font-mono text-[10px] text-ink-faint sm:inline">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-[50vh] overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <div className="px-3 py-8 text-center text-sm text-ink-faint">
                  No matches for &quot;{query}&quot;
                </div>
              ) : (
                grouped.map(([group, items]) => (
                  <div key={group} className="mb-2 last:mb-0">
                    <p className="px-3 pb-1 pt-2 font-mono text-[10px] uppercase tracking-widest text-ink-faint">
                      {group}
                    </p>
                    <ul>
                      {items.map((a) => {
                        const globalIdx = filtered.indexOf(a);
                        const isActive = globalIdx === active;
                        const Icon = a.icon;
                        return (
                          <li key={a.id}>
                            <button
                              type="button"
                              onMouseEnter={() => setActive(globalIdx)}
                              onClick={() => {
                                a.run();
                                setOpen(false);
                              }}
                              className={cn(
                                "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                                isActive
                                  ? "bg-white/[0.06] text-ink"
                                  : "text-ink-muted hover:bg-white/[0.04] hover:text-ink",
                              )}
                            >
                              <Icon
                                className={cn(
                                  "h-4 w-4 flex-none",
                                  isActive ? "text-brand-300" : "text-ink-faint",
                                )}
                              />
                              <span className="flex-1 truncate">{a.label}</span>
                              {a.hint && (
                                <span className="hidden text-xs text-ink-faint sm:inline">
                                  {a.hint}
                                </span>
                              )}
                              {isActive && (
                                <ArrowRight className="h-3.5 w-3.5 text-brand-300" />
                              )}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-white/10 px-4 py-2 font-mono text-[10px] text-ink-faint">
              <span className="flex items-center gap-1.5">
                <Command className="h-3 w-3" />
                <span>K to toggle</span>
              </span>
              <span className="flex items-center gap-3">
                <span>
                  <kbd className="rounded border border-white/10 px-1">↑↓</kbd>{" "}
                  navigate
                </span>
                <span>
                  <kbd className="rounded border border-white/10 px-1">↵</kbd>{" "}
                  select
                </span>
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
