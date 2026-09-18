"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getMobileNav } from "@/lib/nav";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/cn";

export function MobileNav() {
  const role = useAppStore((s) => s.role);
  const pathname = usePathname();
  const items = getMobileNav(role);

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 border-t border-[var(--divider)] bg-[var(--surface)]/90 backdrop-blur-xl md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Hauptnavigation"
    >
      <div className="grid grid-cols-5">
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex min-h-14 flex-col items-center justify-center gap-0.5 py-1.5"
              aria-current={active ? "page" : undefined}
            >
              <Icon
                className={cn("size-5", active ? "text-[var(--accent)]" : "text-[var(--text-tertiary)]")}
                strokeWidth={active ? 2.2 : 1.8}
              />
              <span
                className={cn(
                  "text-[10.5px] font-medium",
                  active ? "text-[var(--accent)]" : "text-[var(--text-tertiary)]"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
