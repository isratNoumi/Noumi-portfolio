"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

type Tilt3DProps = {
  children: React.ReactNode;
  className?: string;
  /** Max rotation in degrees along X and Y axes. */
  max?: number;
  /** Base perspective in px. */
  perspective?: number;
  /** Optional glare highlight following the cursor. */
  glare?: boolean;
  /** Optional scale on hover. */
  hoverScale?: number;
};

/**
 * Reusable mouse-driven 3D tilt wrapper.
 * Pure CSS transforms + spring physics — no external 3D libs.
 */
export function Tilt3D({
  children,
  className,
  max = 12,
  perspective = 900,
  glare = false,
  hoverScale = 1,
}: Tilt3DProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const springCfg = { stiffness: 180, damping: 18, mass: 0.4 };
  const sx = useSpring(px, springCfg);
  const sy = useSpring(py, springCfg);

  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const glareBg = useTransform(
    [sx, sy],
    ([x, y]: number[]) =>
      `radial-gradient(400px circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.25), transparent 55%)`,
  );

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const handleLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ perspective }}
      className={cn("relative", className)}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          borderRadius: "inherit",
        }}
        whileHover={hoverScale !== 1 ? { scale: hoverScale } : undefined}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="relative h-full w-full"
      >
        {children}
        {glare && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-overlay"
            style={{ background: glareBg }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}
