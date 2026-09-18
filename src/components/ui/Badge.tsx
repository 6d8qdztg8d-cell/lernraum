import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "accent" | "success" | "warning" | "danger" | "neutral";

const tones: Record<Tone, string> = {
  accent: "bg-[var(--accent-soft)] text-[var(--accent)]",
  success: "bg-[var(--success-soft)] text-[var(--success)]",
  warning: "bg-[var(--warning-soft)] text-[var(--warning)]",
  danger: "bg-[var(--danger-soft)] text-[var(--danger)]",
  neutral: "bg-black/[0.05] text-[var(--text-secondary)]",
};

export function Badge({ tone = "neutral", children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold leading-none",
        tones[tone]
      )}
    >
      {children}
    </span>
  );
}
