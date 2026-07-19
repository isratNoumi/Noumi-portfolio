import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10 " +
          "bg-white/[0.03] p-6 backdrop-blur-md transition-all duration-300 " +
          "hover:border-brand-400/40 hover:bg-white/[0.05] hover:shadow-glow",
        className,
      )}
      {...rest}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), rgba(200,255,43,0.10), transparent 40%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
