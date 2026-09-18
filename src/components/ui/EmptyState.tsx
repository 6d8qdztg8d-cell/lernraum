import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-[var(--radius-xl)] border border-dashed border-[var(--border-strong)] bg-[var(--surface)] px-6 py-16 text-center animate-fade-in">
      <div className="flex size-14 items-center justify-center rounded-full bg-[var(--accent-soft)]">
        <Icon className="size-6 text-[var(--accent)]" strokeWidth={1.75} aria-hidden />
      </div>
      <div className="max-w-sm space-y-1.5">
        <h3 className="text-[17px] font-semibold text-[var(--text-primary)]">{title}</h3>
        <p className="text-[14px] leading-relaxed text-[var(--text-secondary)]">{description}</p>
      </div>
      {action}
    </div>
  );
}
