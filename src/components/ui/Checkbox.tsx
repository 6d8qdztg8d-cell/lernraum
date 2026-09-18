"use client";

import { Check } from "lucide-react";
import { useId } from "react";

export function Checkbox({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
}) {
  const id = useId();
  return (
    <label htmlFor={id} className="flex cursor-pointer items-start gap-3 select-none">
      <span className="relative mt-0.5 inline-flex shrink-0">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer sr-only"
        />
        <span
          className="flex size-5 items-center justify-center rounded-[6px] border border-[var(--border-strong)] bg-[var(--surface)] transition-colors duration-150 peer-checked:border-[var(--accent)] peer-checked:bg-[var(--accent)] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--accent)]"
          aria-hidden
        >
          <Check className="size-3.5 text-white opacity-0 transition-opacity peer-checked:opacity-100" style={{ opacity: checked ? 1 : 0 }} strokeWidth={3} />
        </span>
      </span>
      <span className="text-[14px] leading-tight text-[var(--text-primary)]">
        {label}
        {description && <span className="mt-0.5 block text-[13px] text-[var(--text-secondary)]">{description}</span>}
      </span>
    </label>
  );
}
