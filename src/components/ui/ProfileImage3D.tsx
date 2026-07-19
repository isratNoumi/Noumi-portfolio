"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Tilt3D } from "@/components/ui/Tilt3D";
import { PROFILE } from "@/content/profile";
import { withBase } from "@/lib/paths";
import { cn } from "@/lib/utils";

/**
 * A 3D-tilting profile picture with:
 *  - Depth-layered gradient rings behind the photo
 *  - Real tech-stack badges orbiting the portrait
 *  - Cursor-driven parallax tilt
 *  - Automatic fallback to a shipped SVG if the JPG is missing
 */
export function ProfileImage3D({ className }: { className?: string }) {
  const [src, setSrc] = React.useState(withBase(PROFILE.avatar));

  // Real tech stack — evenly distributed around the circle.
  const stack = [
    "Python",
    "TypeScript",
    "Next.js",
    "FastAPI",
    "LangChain",
    "Azure OpenAI",
    "PyTorch",
    "RAG",
  ];
  const orbitDuration = 60; // seconds — slow, calm

  return (
    <div
      className={cn(
        "relative mx-auto flex aspect-square w-full max-w-[380px] items-center justify-center",
        className,
      )}
    >
      {/* Outer soft glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-8 rounded-full bg-brand/25 blur-[70px]" />
        <div className="absolute inset-16 rounded-full bg-accent/20 blur-[80px]" />
      </div>

      {/* Rotating dashed rings for depth */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full border border-dashed border-brand-400/25"
        animate={{ rotate: 360 }}
        transition={{ duration: 50, ease: "linear", repeat: Infinity }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-6 rounded-full border border-dashed border-accent/20"
        animate={{ rotate: -360 }}
        transition={{ duration: 70, ease: "linear", repeat: Infinity }}
      />

      {/* Orbiting real-stack badges (parent rotates, children counter-rotate) */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{
          duration: orbitDuration,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {stack.map((label, i) => {
          const angle = (i / stack.length) * 360;
          const rad = (angle * Math.PI) / 180;
          // Percent offsets from center → sit just outside the portrait circle
          const cx = 50 + Math.cos(rad) * 48;
          const cy = 50 + Math.sin(rad) * 48;
          return (
            <motion.span
              key={label}
              className="absolute select-none rounded-full border border-white/10 bg-bg-surface/80 px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-wider text-ink-muted backdrop-blur"
              style={{
                left: `${cx}%`,
                top: `${cy}%`,
                transform: "translate(-50%, -50%)",
              }}
              animate={{ rotate: -360 }}
              transition={{
                duration: orbitDuration,
                ease: "linear",
                repeat: Infinity,
              }}
            >
              {label}
            </motion.span>
          );
        })}
      </motion.div>

      {/* The tilting portrait card */}
      <Tilt3D
        max={16}
        perspective={1000}
        glare
        className="relative h-[78%] w-[78%] rounded-full"
      >
        <div
          className="relative h-full w-full overflow-hidden rounded-full border border-white/10 bg-bg-surface shadow-glow"
          style={{ transform: "translateZ(40px)", isolation: "isolate" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            onError={() => setSrc(withBase(PROFILE.avatarFallback))}
            alt={`${PROFILE.name} — portrait`}
            className="absolute inset-0 h-full w-full rounded-full object-cover"
            loading="eager"
            decoding="async"
          />
          {/* Gradient sheen */}
          <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-tr from-brand/10 via-transparent to-accent/10 mix-blend-overlay" />
        </div>
      </Tilt3D>
    </div>
  );
}
