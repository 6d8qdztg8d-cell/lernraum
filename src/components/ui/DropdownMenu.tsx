"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface DropdownMenuProps {
  trigger: (props: { open: boolean; toggle: () => void }) => ReactNode;
  children: (close: () => void) => ReactNode;
  align?: "left" | "right";
  width?: string;
}

export function DropdownMenu({ trigger, children, align = "right", width = "w-56" }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="relative inline-block" ref={containerRef}>
      {trigger({ open, toggle: () => setOpen((v) => !v) })}
      {open && (
        <div
          role="menu"
          className={cn(
            "absolute z-30 mt-2 animate-scale-in overflow-hidden rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] py-1.5 shadow-[var(--shadow-lg)]",
            width,
            align === "right" ? "right-0" : "left-0"
          )}
          style={{ transformOrigin: align === "right" ? "top right" : "top left" }}
        >
          {children(() => setOpen(false))}
        </div>
      )}
    </div>
  );
}

export function MenuItem({
  onClick,
  children,
  icon,
  destructive,
}: {
  onClick: () => void;
  children: ReactNode;
  icon?: ReactNode;
  destructive?: boolean;
}) {
  return (
    <button
      role="menuitem"
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-2.5 px-3.5 py-2 text-left text-[14px] transition-colors",
        destructive
          ? "text-[var(--danger)] hover:bg-[var(--danger-soft)]"
          : "text-[var(--text-primary)] hover:bg-black/[0.045]"
      )}
    >
      {icon}
      {children}
    </button>
  );
}

export function MenuDivider() {
  return <div className="my-1.5 h-px bg-[var(--divider)]" />;
}
