import { cn } from "@/lib/cn";

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("skeleton rounded-[var(--radius-sm)]", className)} aria-hidden />;
}

export function MaterialRowSkeleton() {
  return (
    <div className="flex items-center gap-4 px-4 py-3.5 sm:px-5">
      <Skeleton className="size-10 shrink-0 rounded-[var(--radius-sm)]" />
      <div className="min-w-0 flex-1 space-y-2">
        <Skeleton className="h-4 w-2/3 max-w-64" />
        <Skeleton className="h-3 w-1/3 max-w-40" />
      </div>
      <Skeleton className="hidden h-8 w-24 rounded-[var(--radius-sm)] sm:block" />
    </div>
  );
}
