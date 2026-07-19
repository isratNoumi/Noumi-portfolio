"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { PROFILE } from "@/content/profile";
import { withBase } from "@/lib/paths";
import { cn } from "@/lib/utils";

/**
 * A mock IDE window rendering a `noumi.ts` source file with syntax highlighting,
 * line numbers, tab bar, traffic lights, and the profile photo embedded as an
 * author avatar in the JSDoc comment header.
 *
 * All highlighting is hand-rolled with small colored <span>s so there are no
 * heavy syntax-highlighter deps.
 */

type Tok = { t: string; c?: string };

// Convenience token colors (Tailwind classes)
const KW = "text-accent"; // magenta — keywords
const STR = "text-brand-300"; // lime — strings
const NUM = "text-orange-300"; // literals
const FN = "text-brand"; // fn names
const CMT = "text-ink-faint italic"; // comments
const PROP = "text-sky-300"; // property keys
const PUNCT = "text-ink-muted";

// Compose a syntax-highlighted line from tokens
function Line({ tokens }: { tokens: Tok[] }) {
  return (
    <>
      {tokens.map((tok, i) => (
        <span key={i} className={tok.c}>
          {tok.t}
        </span>
      ))}
    </>
  );
}

export function CodeEditorCard({ className }: { className?: string }) {
  const [src, setSrc] = React.useState(withBase(PROFILE.avatar));

  const tabs = ["noumi.ts", "about.md", "stack.json"] as const;
  type TabName = (typeof tabs)[number];
  const [activeTab, setActiveTab] = React.useState<TabName>("noumi.ts");

  const profileLines: Tok[][] = [
    [{ t: "/**", c: CMT }],
    [{ t: " * @author  ", c: CMT }, { t: "__AVATAR__" }, { t: `  ${PROFILE.name}`, c: CMT }],
    [{ t: ` * ${PROFILE.tagline} · ${PROFILE.location}`, c: CMT }],
    [{ t: " */", c: CMT }],
    [],
    [
      { t: "export ", c: KW },
      { t: "const ", c: KW },
      { t: "noumi ", c: FN },
      { t: "= ", c: PUNCT },
      { t: "{", c: PUNCT },
    ],
    [
      { t: "  role", c: PROP },
      { t: ": ", c: PUNCT },
      { t: `"AI Engineer"`, c: STR },
      { t: ",", c: PUNCT },
    ],
    [
      { t: "  focus", c: PROP },
      { t: ": [", c: PUNCT },
    ],
    [
      { t: `    "agentic AI"`, c: STR },
      { t: ", ", c: PUNCT },
      { t: `"LLMs"`, c: STR },
      { t: ", ", c: PUNCT },
      { t: `"RAG"`, c: STR },
      { t: "],", c: PUNCT },
    ],
    [
      { t: "  stack", c: PROP },
      { t: ": [", c: PUNCT },
    ],
    [
      { t: `    "Python"`, c: STR },
      { t: ", ", c: PUNCT },
      { t: `"TypeScript"`, c: STR },
      { t: ",", c: PUNCT },
    ],
    [
      { t: `    "Next.js"`, c: STR },
      { t: ", ", c: PUNCT },
      { t: `"FastAPI"`, c: STR },
      { t: "],", c: PUNCT },
    ],
    [
      { t: "  shipping", c: PROP },
      { t: ": ", c: PUNCT },
      { t: `"Dexian Bangladesh"`, c: STR },
      { t: ",", c: PUNCT },
    ],
    [
      { t: "  since", c: PROP },
      { t: ": ", c: PUNCT },
      { t: "2023", c: NUM },
      { t: ",", c: PUNCT },
    ],
    [
      { t: "  available", c: PROP },
      { t: ": ", c: PUNCT },
      { t: "true", c: KW },
      { t: ",", c: PUNCT },
    ],
    [{ t: "};", c: PUNCT }],
    [],
    [
      { t: "// ", c: CMT },
      { t: "next()", c: FN + " " + CMT },
      { t: " → let's build something.", c: CMT },
    ],
  ];

  const aboutLines: Tok[][] = [
    [{ t: "# About", c: FN }],
    [],
    [{ t: "I turn AI research into products", c: "text-ink" }],
    [{ t: "people actually use.", c: STR }],
    [],
    [{ t: "## Current focus", c: PROP }],
    [{ t: "- Agentic security workflows", c: "text-ink-muted" }],
    [{ t: "- Reliable LLM applications", c: "text-ink-muted" }],
    [{ t: "- Full-stack AI products", c: "text-ink-muted" }],
    [],
    [{ t: `Based in ${PROFILE.location}.`, c: CMT }],
  ];

  const stackLines: Tok[][] = [
    [{ t: "{", c: PUNCT }],
    [{ t: '  "languages"', c: PROP }, { t: ": [", c: PUNCT }],
    [{ t: '    "Python", "TypeScript", "Go"', c: STR }],
    [{ t: "  ],", c: PUNCT }],
    [{ t: '  "ai"', c: PROP }, { t: ": [", c: PUNCT }],
    [{ t: '    "LangChain", "RAG", "Azure OpenAI"', c: STR }],
    [{ t: "  ],", c: PUNCT }],
    [{ t: '  "web"', c: PROP }, { t: ": [", c: PUNCT }],
    [{ t: '    "Next.js", "FastAPI", "PostgreSQL"', c: STR }],
    [{ t: "  ],", c: PUNCT }],
    [{ t: '  "delivery"', c: PROP }, { t: ': "Docker + Azure"', c: STR }],
    [{ t: "}", c: PUNCT }],
  ];

  const lines =
    activeTab === "noumi.ts"
      ? profileLines
      : activeTab === "about.md"
        ? aboutLines
        : stackLines;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, rotateX: 6 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
      className={cn(
        "relative w-full max-w-[460px] overflow-hidden rounded-xl border border-white/10 " +
          "bg-[#0d130d]/95 font-mono text-[10px] leading-relaxed shadow-glow backdrop-blur " +
          "sm:text-[11px]",
        className,
      )}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-white/10 bg-black/40 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-brand-400/80" />
        <span className="ml-3 hidden truncate text-[11px] text-ink-faint sm:inline">
          ~ / noumi-portfolio / src / {activeTab}
        </span>
        <span className="ml-3 text-[11px] text-ink-faint sm:hidden">
          {activeTab}
        </span>
        <span className="ml-auto flex items-center gap-1.5 text-[10px] text-ink-faint">
          <span className="relative inline-flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-400" />
          </span>
          live
        </span>
      </div>

      {/* Tab bar */}
      <div className="flex items-center gap-0 border-b border-white/10 bg-black/20 pl-2 text-[11px]">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
          <button
            type="button"
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "flex items-center gap-2 border-r border-white/5 px-3 py-2",
              isActive
                ? "bg-[#0d130d] text-ink"
                : "text-ink-faint hover:text-ink-muted",
            )}
          >
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                isActive ? "bg-brand-400" : "bg-ink-faint/50",
              )}
            />
            {tab}
          </button>
          );
        })}
      </div>

      {/* Code area */}
      <div className="flex">
        {/* Line numbers */}
        <div className="select-none border-r border-white/5 bg-black/20 px-2 py-4 text-right text-[10px] text-ink-faint sm:px-3 sm:text-[11px]">
          {lines.map((_, i) => (
            <div key={i} className="leading-relaxed">
              {String(i + 1).padStart(2, "0")}
            </div>
          ))}
        </div>

        {/* Code */}
        <div className="min-w-0 flex-1 overflow-x-auto py-4 pl-3 pr-2 sm:pl-4 sm:pr-3">
          {lines.map((tokens, li) => (
            <motion.div
              key={li}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: 0.45 + li * 0.04 }}
              className="whitespace-pre"
            >
              {tokens.length === 0 ? (
                <span>&nbsp;</span>
              ) : (
                tokens.map((tok, ti) =>
                  tok.t === "__AVATAR__" ? (
                    <span
                      key={ti}
                      className="mx-1 inline-flex h-5 w-5 -translate-y-[2px] overflow-hidden rounded-full border border-white/15 align-middle shadow-glow"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
                        onError={() =>
                          setSrc(withBase(PROFILE.avatarFallback))
                        }
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </span>
                  ) : (
                    <span key={ti} className={tok.c}>
                      {tok.t}
                    </span>
                  ),
                )
              )}
              {/* Blinking caret on the last non-empty line */}
              {li === lines.length - 1 && (
                <span
                  aria-hidden
                  className="ml-0.5 inline-block h-[1em] w-[7px] translate-y-[2px] animate-caret bg-brand-400"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between border-t border-white/10 bg-black/40 px-3 py-1.5 text-[10px] uppercase tracking-widest text-ink-faint">
        <span className="flex items-center gap-3">
          <span className="text-brand-300">
            ● {activeTab.endsWith(".ts") ? "TypeScript" : activeTab.endsWith(".md") ? "Markdown" : "JSON"}
          </span>
          <span>UTF-8</span>
          <span>LF</span>
        </span>
        <span className="flex items-center gap-3">
          <span>Ln {lines.length}, Col 1</span>
          <span className="text-brand-300">✓ ready</span>
        </span>
      </div>
    </motion.div>
  );
}
