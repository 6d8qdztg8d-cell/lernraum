import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

export function SectionHeader({
  title,
  href,
  hrefLabel = "Alle anzeigen",
  action,
}: {
  title: string;
  href?: string;
  hrefLabel?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h2 className="text-[19px] font-semibold tracking-tight text-[var(--text-primary)]">{title}</h2>
      {href ? (
        <Link
          href={href}
          className="flex items-center gap-0.5 text-[13.5px] font-medium text-[var(--accent)] hover:text-[var(--accent-hover)]"
        >
          {hrefLabel}
          <ChevronRight className="size-3.5" strokeWidth={2.2} />
        </Link>
      ) : (
        action
      )}
    </div>
  );
}
