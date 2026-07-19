"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Line =
  | { kind: "cmd"; text: string }
  | { kind: "out"; text: string; tone?: "muted" | "brand" | "accent" };

/**
 * A mock terminal card that types out a scripted sequence of shell commands
 * and their outputs, one character at a time.
 */
export function TerminalCard({ className }: { className?: string }) {
  const script: Line[] = React.useMemo(
    () => [
      { kind: "cmd", text: "whoami" },
      { kind: "out", text: "israt-moyeen-noumi", tone: "brand" },
      { kind: "cmd", text: "cat role.txt" },
      { kind: "out", text: "AI/ML Application Developer @ Dexian Bangladesh" },
      { kind: "cmd", text: "ls skills/ | head -6" },
      { kind: "out", text: "agentic-ai/  llm/  rag/", tone: "muted" },
      { kind: "out", text: "fastapi/     nextjs/  langchain/", tone: "muted" },
      { kind: "cmd", text: "cat contact.txt" },
      { kind: "out", text: "isratmoyeen.23@gmail.com", tone: "accent" },
      { kind: "cmd", text: "echo $STATUS" },
      { kind: "out", text: "open to opportunities", tone: "brand" },
    ],
    [],
  );

  // Which line we're currently typing (index into script)
  const [lineIdx, setLineIdx] = React.useState(0);
  // How many characters of the current line have been typed
  const [charIdx, setCharIdx] = React.useState(0);
  const [started, setStarted] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Kick off typing when the terminal enters the viewport
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setStarted(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Advance one character at a time
  React.useEffect(() => {
    if (!started) return;
    if (lineIdx >= script.length) return;
    const line = script[lineIdx];
    if (charIdx < line.text.length) {
      const delay = line.kind === "cmd" ? 55 : 12;
      const t = setTimeout(() => setCharIdx((c) => c + 1), delay);
      return () => clearTimeout(t);
    }
    // finished current line — small pause, then move to next
    const pause = line.kind === "cmd" ? 260 : 140;
    const t = setTimeout(() => {
      setLineIdx((i) => i + 1);
      setCharIdx(0);
    }, pause);
    return () => clearTimeout(t);
  }, [started, lineIdx, charIdx, script]);

  const done = lineIdx >= script.length;

  const renderLine = (line: Line, text: string, showCaret: boolean) => {
    if (line.kind === "cmd") {
      return (
        <div className="flex items-baseline gap-2">
          <span className="text-brand-400">➜</span>
          <span className="text-accent">~</span>
          <span className="text-ink">{text}</span>
          {showCaret && (
            <span
              aria-hidden
              className="ml-0.5 inline-block h-[1em] w-[7px] translate-y-[2px] animate-caret bg-brand-400"
            />
          )}
        </div>
      );
    }
    const toneCls =
      line.tone === "brand"
        ? "text-brand-300"
        : line.tone === "accent"
          ? "text-accent"
          : line.tone === "muted"
            ? "text-ink-faint"
            : "text-ink-muted";
    return (
      <div className={cn("pl-5", toneCls)}>
        {text}
        {showCaret && (
          <span
            aria-hidden
            className="ml-0.5 inline-block h-[1em] w-[7px] translate-y-[2px] animate-caret bg-brand-400"
          />
        )}
      </div>
    );
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={cn(
        "overflow-hidden rounded-2xl border border-white/10 bg-[#0d130d]/95 font-mono text-[11px] leading-relaxed shadow-glow backdrop-blur sm:text-[12px]",
        className,
      )}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-white/10 bg-black/40 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-brand-400/80" />
        <span className="ml-3 hidden text-[11px] text-ink-faint sm:inline">
          noumi@portfolio: ~ — zsh
        </span>
        <span className="ml-3 text-[11px] text-ink-faint sm:hidden">
          ~ — zsh
        </span>
      </div>

      {/* Terminal body */}
      <div className="min-h-[240px] space-y-1 overflow-x-auto p-3 sm:p-4">
        {script.slice(0, lineIdx).map((line, i) => (
          <React.Fragment key={i}>{renderLine(line, line.text, false)}</React.Fragment>
        ))}
        {lineIdx < script.length && (
          <>
            {renderLine(
              script[lineIdx],
              script[lineIdx].text.slice(0, charIdx),
              true,
            )}
          </>
        )}
        {done && (
          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-brand-400">➜</span>
            <span className="text-accent">~</span>
            <span
              aria-hidden
              className="ml-0.5 inline-block h-[1em] w-[7px] translate-y-[2px] animate-caret bg-brand-400"
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}
