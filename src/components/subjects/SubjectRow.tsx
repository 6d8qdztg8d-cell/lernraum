import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Subject } from "@/lib/types";

export function SubjectRow({
  subject,
  materialCount,
  newCount,
}: {
  subject: Subject;
  materialCount: number;
  newCount: number;
}) {
  return (
    <Link
      href={`/faecher/${subject.slug}`}
      className="flex items-center gap-3.5 px-4 py-3.5 transition-colors hover:bg-black/[0.02] sm:px-5"
    >
      <span
        className="size-2.5 shrink-0 rounded-full"
        style={{ backgroundColor: subject.accent }}
        aria-hidden
      />
      <span className="min-w-0 flex-1 truncate text-[14.5px] font-medium text-[var(--text-primary)]">
        {subject.name}
      </span>
      <span className="shrink-0 text-[13px] text-[var(--text-secondary)]">
        {newCount > 0
          ? `${newCount} neu`
          : materialCount > 0
            ? `${materialCount} Material${materialCount === 1 ? "" : "ien"}`
            : "Noch nichts"}
      </span>
      <ChevronRight className="size-4 shrink-0 text-[var(--text-tertiary)]" strokeWidth={1.8} />
    </Link>
  );
}
