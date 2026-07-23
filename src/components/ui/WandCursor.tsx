"use client";

import { useEffect, useRef } from "react";

/**
 * Harry Potter–style wand cursor.
 *
 * Replaces the default pointer with a small wooden wand whose glowing tip sits
 * exactly at the mouse position. A trail of magical sparkles follows the
 * cursor, and a bigger burst is emitted on click.
 *
 * Colors are pulled from the site palette:
 *   - brand lime (#c8ff2b) for the tip glow + primary sparkles
 *   - accent pink (#ff2bd6) for secondary sparkles
 *
 * Disabled automatically on:
 *   - coarse-pointer devices (touch)
 *   - users who prefer reduced motion (sparkles disabled, wand stays)
 */

type Sparkle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number; // 0..1, decreases to 0
  size: number;
  hue: "brand" | "accent";
};

const BRAND = "200, 255, 43"; // #c8ff2b
const ACCENT = "255, 43, 214"; // #ff2bd6

export function WandCursor() {
  const wandRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Skip on touch / coarse-pointer devices.
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const wand = wandRef.current;
    const canvas = canvasRef.current;
    if (!wand || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Hide the native cursor globally while this component is mounted.
    const prevCursor = document.documentElement.style.cursor;
    document.documentElement.style.cursor = "none";
    document.documentElement.classList.add("wand-cursor-active");

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    let mouseX = width / 2;
    let mouseY = height / 2;
    let lastX = mouseX;
    let lastY = mouseY;
    let visible = false;

    const sparkles: Sparkle[] = [];

    const rand = (min: number, max: number) => min + Math.random() * (max - min);

    const spawnSparkle = (x: number, y: number, boost = 1) => {
      if (reduced) return;
      const angle = Math.random() * Math.PI * 2;
      const speed = rand(0.2, 1.4) * boost;
      sparkles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - rand(0.1, 0.6), // slight upward drift
        life: 1,
        size: rand(1, 2.4) * boost,
        hue: Math.random() < 0.7 ? "brand" : "accent",
      });
    };

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) {
        visible = true;
        wand.style.opacity = "1";
      }

      // Trail sparkles based on movement speed.
      const dx = mouseX - lastX;
      const dy = mouseY - lastY;
      const dist = Math.hypot(dx, dy);
      if (!reduced && dist > 2) {
        const count = Math.min(3, Math.floor(dist / 6) + 1);
        for (let i = 0; i < count; i++) {
          // Emit slightly behind the tip for a trailing feel.
          spawnSparkle(mouseX + rand(-2, 2), mouseY + rand(-2, 2));
        }
      }
      lastX = mouseX;
      lastY = mouseY;
    };

    const onLeave = () => {
      visible = false;
      wand.style.opacity = "0";
    };

    const onEnter = () => {
      visible = true;
      wand.style.opacity = "1";
    };

    const onDown = (e: MouseEvent) => {
      // Magical burst on click.
      if (reduced) return;
      for (let i = 0; i < 18; i++) {
        spawnSparkle(e.clientX, e.clientY, 1.8);
      }
    };

    let rafId = 0;
    const render = () => {
      // Position wand — the tip (top-left of SVG) sits at (mouseX, mouseY).
      // The SVG is 56x56 with tip at (4, 4). Offset so that point aligns.
      wand.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;

      // Fade canvas rather than clear, to give sparkles a subtle bloom trail.
      ctx.clearRect(0, 0, width, height);

      for (let i = sparkles.length - 1; i >= 0; i--) {
        const s = sparkles[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.02; // gentle gravity
        s.vx *= 0.98;
        s.vy *= 0.98;
        s.life -= 0.022;
        if (s.life <= 0) {
          sparkles.splice(i, 1);
          continue;
        }

        const rgb = s.hue === "brand" ? BRAND : ACCENT;
        const alpha = Math.max(0, s.life);
        const r = s.size * (0.6 + s.life * 0.6);

        // Outer glow
        const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, r * 4);
        grad.addColorStop(0, `rgba(${rgb}, ${alpha})`);
        grad.addColorStop(0.4, `rgba(${rgb}, ${alpha * 0.35})`);
        grad.addColorStop(1, `rgba(${rgb}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(s.x, s.y, r * 4, 0, Math.PI * 2);
        ctx.fill();

        // Bright core
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, r * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("resize", resize);
      document.documentElement.style.cursor = prevCursor;
      document.documentElement.classList.remove("wand-cursor-active");
    };
  }, []);

  return (
    <>
      {/* Sparkle canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[9998]"
      />
      {/* Wand */}
      <div
        ref={wandRef}
        aria-hidden
        style={{ opacity: 0, willChange: "transform, opacity" }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] transition-opacity duration-150"
      >
        <svg
          width="56"
          height="56"
          viewBox="0 0 56 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.55))",
          }}
        >
          <defs>
            {/* Wood gradient — dark walnut handle to lighter shaft */}
            <linearGradient id="wand-wood" x1="50" y1="50" x2="6" y2="6" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#2b1d10" />
              <stop offset="0.35" stopColor="#4a2f18" />
              <stop offset="0.75" stopColor="#8a5a2b" />
              <stop offset="1" stopColor="#c69c5d" />
            </linearGradient>
            {/* Tip glow gradient — brand lime -> transparent */}
            <radialGradient id="wand-tip-glow" cx="4" cy="4" r="14" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="rgba(200,255,43,0.9)" />
              <stop offset="0.4" stopColor="rgba(200,255,43,0.35)" />
              <stop offset="1" stopColor="rgba(200,255,43,0)" />
            </radialGradient>
          </defs>

          {/* Soft aura behind the tip */}
          <circle cx="4" cy="4" r="14" fill="url(#wand-tip-glow)" />

          {/* Wand body: tapered line from tip (top-left) to handle (bottom-right) */}
          {/* Outline for contrast on light backgrounds */}
          <path
            d="M4 4 L50 50"
            stroke="rgba(0,0,0,0.55)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M4 4 L50 50"
            stroke="url(#wand-wood)"
            strokeWidth="3.2"
            strokeLinecap="round"
          />

          {/* Handle grip band */}
          <path
            d="M46 46 L40 40"
            stroke="#1b120a"
            strokeWidth="4.2"
            strokeLinecap="round"
          />
          <path
            d="M46 46 L40 40"
            stroke="#3a2614"
            strokeWidth="2.6"
            strokeLinecap="round"
          />

          {/* Bright tip core */}
          <circle cx="4" cy="4" r="2.4" fill="#ffffff" />
          <circle cx="4" cy="4" r="1.2" fill="#f6ffd4" />
        </svg>
      </div>
    </>
  );
}
