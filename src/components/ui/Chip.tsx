import * as React from "react";
import { cn } from "@/lib/utils";

export function Chip({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-white/10 " +
          "bg-white/[0.04] px-3 py-1 text-xs font-medium text-ink-muted " +
          "backdrop-blur-sm transition hover:border-brand-400/40 hover:text-ink",
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
