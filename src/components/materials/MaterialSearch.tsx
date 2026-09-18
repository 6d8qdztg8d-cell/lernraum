"use client";

import { Search, X } from "lucide-react";

export function MaterialSearch({
  value,
  onChange,
  placeholder = "Materialien, Fächer oder Dateien suchen …",
  autoFocus,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}) {
  return (
    <div className="relative">
      <Search
        className="pointer-events-none absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-[var(--text-tertiary)]"
        strokeWidth={2}
      />
      <input
        type="text"
        value={value}
        autoFocus={autoFocus}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Suchen"
        className="h-13 w-full rounded-[var(--radius-lg)] border border-transparent bg-[var(--surface)] pl-11 pr-11 text-[15px] text-[var(--text-primary)] shadow-[var(--shadow-sm)] outline-none transition-[box-shadow,border-color] duration-150 placeholder:text-[var(--text-tertiary)] focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent-soft)]"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          aria-label="Suche löschen"
          className="absolute right-3.5 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded-full text-[var(--text-tertiary)] hover:bg-black/[0.06] hover:text-[var(--text-primary)]"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
}
