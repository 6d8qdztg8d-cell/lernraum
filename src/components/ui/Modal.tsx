"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import type { ReactNode } from "react";

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  size = "md",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg";
}) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  const widths = { sm: "max-w-sm", md: "max-w-lg", lg: "max-w-2xl" };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 animate-fade-in bg-black/30 backdrop-blur-sm"
        style={{ animationDuration: "180ms" }}
        onClick={onClose}
        aria-hidden
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        className={`relative z-10 w-full ${widths[size]} animate-scale-in rounded-[var(--radius-xl)] bg-[var(--surface)] shadow-[var(--shadow-lg)] outline-none`}
      >
        <div className="flex items-start justify-between gap-4 border-b border-[var(--divider)] px-6 py-5">
          <div>
            <h2 id="modal-title" className="text-[17px] font-semibold text-[var(--text-primary)]">
              {title}
            </h2>
            {description && (
              <p className="mt-1 text-[14px] text-[var(--text-secondary)]">{description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Schliessen"
            className="flex size-8 shrink-0 items-center justify-center rounded-full text-[var(--text-secondary)] transition-colors hover:bg-black/[0.05] hover:text-[var(--text-primary)]"
          >
            <X className="size-4" strokeWidth={1.75} />
          </button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto px-6 py-5">{children}</div>
      </div>
    </div>,
    document.body
  );
}
