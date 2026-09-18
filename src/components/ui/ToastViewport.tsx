"use client";

import { CheckCircle2, Info, XCircle, X } from "lucide-react";
import { useAppStore } from "@/lib/store";

const icons = {
  success: CheckCircle2,
  info: Info,
  error: XCircle,
};

const iconColors = {
  success: "text-[var(--success)]",
  info: "text-[var(--accent)]",
  error: "text-[var(--danger)]",
};

export function ToastViewport() {
  const toasts = useAppStore((s) => s.toasts);
  const dismissToast = useAppStore((s) => s.dismissToast);

  if (toasts.length === 0) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-20 z-[60] flex flex-col items-center gap-2 px-4 sm:bottom-6 sm:items-end sm:px-6"
      aria-live="polite"
    >
      {toasts.map((toast) => {
        const Icon = icons[toast.tone];
        return (
          <div
            key={toast.id}
            className="pointer-events-auto flex w-full max-w-sm animate-fade-in-up items-center gap-3 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)]/95 px-4 py-3 shadow-[var(--shadow-lg)] backdrop-blur-md"
          >
            <Icon className={`size-4 shrink-0 ${iconColors[toast.tone]}`} strokeWidth={2} />
            <p className="flex-1 text-[13.5px] font-medium text-[var(--text-primary)]">{toast.message}</p>
            <button
              onClick={() => dismissToast(toast.id)}
              aria-label="Schliessen"
              className="shrink-0 text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
            >
              <X className="size-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
