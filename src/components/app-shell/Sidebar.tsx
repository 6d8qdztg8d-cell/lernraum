"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, Settings, UploadCloud } from "lucide-react";
import { getSidebarNav } from "@/lib/nav";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/cn";
import { LinkButton } from "@/components/ui/Button";

export function Sidebar() {
  const role = useAppStore((s) => s.role);
  const pathname = usePathname();
  const items = getSidebarNav(role);

  return (
    <aside
      className="fixed inset-y-0 left-0 z-20 hidden w-[var(--sidebar-width)] flex-col border-r border-[var(--divider)] bg-[var(--surface-secondary)] md:flex"
      aria-label="Hauptnavigation"
    >
      <div className="flex h-[var(--topbar-height)] shrink-0 items-center gap-2.5 px-6">
        <div className="flex size-8 items-center justify-center rounded-[9px] bg-[var(--accent)] text-white">
          <GraduationCap className="size-4.5" strokeWidth={2} />
        </div>
        <span className="text-[15px] font-semibold tracking-tight text-[var(--text-primary)]">
          Lernraum
        </span>
      </div>

      <nav className="flex-1 space-y-0.5 px-3.5 py-2">
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-[var(--radius-md)] px-3 py-2 text-[14px] font-medium transition-colors",
                active
                  ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                  : "text-[var(--text-primary)] hover:bg-black/[0.04]"
              )}
              aria-current={active ? "page" : undefined}
            >
              <Icon className="size-4.5" strokeWidth={active ? 2.1 : 1.8} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-2 px-3.5 pb-5">
        {role === "teacher" && (
          <LinkButton href="/upload" icon={<UploadCloud className="size-4" strokeWidth={2} />} fullWidth>
            Material hochladen
          </LinkButton>
        )}
        <Link
          href="/profil"
          className={cn(
            "flex items-center gap-3 rounded-[var(--radius-md)] px-3 py-2 text-[14px] font-medium transition-colors",
            pathname === "/profil"
              ? "bg-[var(--accent-soft)] text-[var(--accent)]"
              : "text-[var(--text-secondary)] hover:bg-black/[0.04] hover:text-[var(--text-primary)]"
          )}
        >
          <Settings className="size-4.5" strokeWidth={1.8} />
          Einstellungen
        </Link>
      </div>
    </aside>
  );
}
