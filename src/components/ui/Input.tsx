"use client";

import { forwardRef, useId } from "react";
import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface FieldWrapProps {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
}

const fieldBase =
  "w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-secondary)] px-3.5 text-[15px] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none transition-[border-color,box-shadow,background-color] duration-150 focus:border-[var(--accent)] focus:bg-[var(--surface)] focus:ring-4 focus:ring-[var(--accent-soft)]";

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & FieldWrapProps
>(({ label, hint, error, required, className, id, ...props }, ref) => {
  const autoId = useId();
  const fieldId = id ?? autoId;
  return (
    <Field label={label} hint={hint} error={error} required={required} fieldId={fieldId}>
      <input
        ref={ref}
        id={fieldId}
        className={cn(fieldBase, "h-11", error && "border-[var(--danger)]", className)}
        aria-invalid={!!error}
        aria-describedby={error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined}
        {...props}
      />
    </Field>
  );
});
Input.displayName = "Input";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement> & FieldWrapProps
>(({ label, hint, error, required, className, id, rows = 3, ...props }, ref) => {
  const autoId = useId();
  const fieldId = id ?? autoId;
  return (
    <Field label={label} hint={hint} error={error} required={required} fieldId={fieldId}>
      <textarea
        ref={ref}
        id={fieldId}
        rows={rows}
        className={cn(fieldBase, "resize-none py-2.5 leading-relaxed", error && "border-[var(--danger)]", className)}
        aria-invalid={!!error}
        aria-describedby={error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined}
        {...props}
      />
    </Field>
  );
});
Textarea.displayName = "Textarea";

export const Select = forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement> & FieldWrapProps & { children: ReactNode }
>(({ label, hint, error, required, className, id, children, ...props }, ref) => {
  const autoId = useId();
  const fieldId = id ?? autoId;
  return (
    <Field label={label} hint={hint} error={error} required={required} fieldId={fieldId}>
      <div className="relative">
        <select
          ref={ref}
          id={fieldId}
          className={cn(fieldBase, "h-11 appearance-none pr-9", error && "border-[var(--danger)]", className)}
          {...props}
        >
          {children}
        </select>
        <svg
          className="pointer-events-none absolute right-3.5 top-1/2 size-3.5 -translate-y-1/2 text-[var(--text-tertiary)]"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden
        >
          <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </Field>
  );
});
Select.displayName = "Select";

function Field({
  label,
  hint,
  error,
  required,
  fieldId,
  children,
}: FieldWrapProps & { fieldId: string; children: ReactNode }) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={fieldId} className="block text-[13px] font-medium text-[var(--text-primary)]">
          {label}
          {required && <span className="text-[var(--danger)]"> *</span>}
        </label>
      )}
      {children}
      {error ? (
        <p id={`${fieldId}-error`} className="text-[13px] text-[var(--danger)]">
          {error}
        </p>
      ) : hint ? (
        <p id={`${fieldId}-hint`} className="text-[13px] text-[var(--text-secondary)]">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
