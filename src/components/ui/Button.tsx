"use client";

import Link from "next/link";
import { Loader2 } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "tertiary" | "destructive";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  iconRight?: ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
}

type ButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type LinkButtonProps = BaseProps & {
  href: string;
  children?: ReactNode;
  className?: string;
};

const base =
  "inline-flex items-center justify-center gap-2 font-medium select-none transition-[background-color,box-shadow,transform,opacity] duration-150 ease-[cubic-bezier(0.2,0.8,0.2,1)] active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] whitespace-nowrap";

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-[13px] rounded-[var(--radius-sm)]",
  md: "h-10 px-4 text-[14px] rounded-[var(--radius-md)]",
  lg: "h-12 px-5 text-[15px] rounded-[var(--radius-md)]",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] active:bg-[var(--accent-active)] shadow-[0_1px_2px_rgba(0,0,0,0.06)]",
  secondary:
    "bg-black/[0.04] text-[var(--text-primary)] hover:bg-black/[0.065] active:bg-black/[0.08]",
  tertiary: "bg-transparent text-[var(--accent)] hover:bg-[var(--accent-soft)] px-2.5",
  destructive: "bg-[var(--danger)] text-white hover:bg-[var(--danger-hover)]",
};

function content(loading: boolean | undefined, icon: ReactNode, iconRight: ReactNode, children: ReactNode) {
  return (
    <>
      {loading ? <Loader2 className="size-4 animate-spin" aria-hidden /> : icon}
      {children}
      {!loading && iconRight}
    </>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  icon,
  iconRight,
  loading,
  fullWidth,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        base,
        sizes[size],
        variants[variant],
        fullWidth && "w-full",
        className
      )}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {content(loading, icon, iconRight, children)}
    </button>
  );
}

export function LinkButton({
  href,
  variant = "primary",
  size = "md",
  icon,
  iconRight,
  className,
  children,
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={cn(base, sizes[size], variants[variant], className)}
    >
      {icon}
      {children}
      {iconRight}
    </Link>
  );
}
