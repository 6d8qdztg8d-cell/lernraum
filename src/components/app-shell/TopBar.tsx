"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Bell, GraduationCap, LogOut, Search, Settings, UserRoundCog } from "lucide-react";
import { DropdownMenu, MenuItem, MenuDivider } from "@/components/ui/DropdownMenu";
import { useAppStore } from "@/lib/store";
import { CURRENT_STUDENT, teachers } from "@/lib/data";
import Link from "next/link";

export function TopBar() {
  const role = useAppStore((s) => s.role);
  const setRole = useAppStore((s) => s.setRole);
  const showToast = useAppStore((s) => s.showToast);
  const router = useRouter();
  const [query, setQuery] = useState("");

  const currentTeacher = teachers[0];
  const displayName = role === "teacher" ? currentTeacher.name : CURRENT_STUDENT.name;
  const initials =
    role === "teacher"
      ? currentTeacher.initials
      : CURRENT_STUDENT.name
          .split(" ")
          .map((p) => p[0])
          .join("")
          .toUpperCase();

  function submitSearch() {
    router.push(query.trim() ? `/suche?q=${encodeURIComponent(query.trim())}` : "/suche");
  }

  return (
    <header className="sticky top-0 z-20 flex h-[var(--topbar-height)] items-center gap-3 border-b border-[var(--divider)] bg-[var(--surface)]/85 px-4 backdrop-blur-xl sm:px-6 md:pl-6">
      <Link href="/start" className="flex items-center gap-2 md:hidden">
        <div className="flex size-7 items-center justify-center rounded-[8px] bg-[var(--accent)] text-white">
          <GraduationCap className="size-4" strokeWidth={2} />
        </div>
      </Link>

      <div className="hidden flex-1 max-w-md md:block">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[var(--text-tertiary)]"
            strokeWidth={2}
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submitSearch()}
            type="text"
            placeholder="Materialien, Fächer oder Dateien suchen …"
            aria-label="Suchen"
            className="h-9 w-full rounded-full border border-transparent bg-black/[0.04] pl-10 pr-4 text-[13.5px] text-[var(--text-primary)] outline-none transition-[background-color,box-shadow] placeholder:text-[var(--text-tertiary)] focus:bg-[var(--surface)] focus:ring-4 focus:ring-[var(--accent-soft)] focus:border-[var(--accent)]"
          />
        </div>
      </div>

      <div className="flex flex-1 items-center justify-end gap-1.5 md:flex-none">
        <Link
          href="/suche"
          aria-label="Suchen"
          className="flex size-9 items-center justify-center rounded-full text-[var(--text-secondary)] transition-colors hover:bg-black/[0.05] hover:text-[var(--text-primary)] md:hidden"
        >
          <Search className="size-4.5" strokeWidth={1.9} />
        </Link>

        <DropdownMenu
          width="w-64"
          trigger={({ toggle }) => (
            <button
              onClick={() => {
                toggle();
              }}
              aria-label="Benachrichtigungen"
              className="flex size-9 items-center justify-center rounded-full text-[var(--text-secondary)] transition-colors hover:bg-black/[0.05] hover:text-[var(--text-primary)]"
            >
              <Bell className="size-4.5" strokeWidth={1.9} />
            </button>
          )}
        >
          {() => (
            <div className="px-4 py-6 text-center">
              <p className="text-[13px] text-[var(--text-secondary)]">Keine neuen Benachrichtigungen.</p>
            </div>
          )}
        </DropdownMenu>

        <DropdownMenu
          trigger={({ toggle }) => (
            <button
              onClick={toggle}
              className="ml-1 flex size-9 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[12.5px] font-semibold text-[var(--accent)] transition-transform active:scale-95"
              aria-label="Profilmenü öffnen"
            >
              {initials}
            </button>
          )}
        >
          {(close) => (
            <>
              <div className="px-3.5 py-2.5">
                <p className="text-[14px] font-semibold text-[var(--text-primary)]">{displayName}</p>
                <p className="text-[12.5px] text-[var(--text-secondary)]">
                  {role === "teacher" ? "Lehrperson" : `Schüler · Klasse ${CURRENT_STUDENT.classId.toUpperCase()}`}
                </p>
              </div>
              <MenuDivider />
              <MenuItem icon={<Settings className="size-4" strokeWidth={1.8} />} onClick={() => { router.push("/profil"); close(); }}>
                Profil &amp; Einstellungen
              </MenuItem>
              <MenuItem
                icon={<UserRoundCog className="size-4" strokeWidth={1.8} />}
                onClick={() => {
                  const next = role === "teacher" ? "student" : "teacher";
                  setRole(next);
                  showToast(
                    next === "teacher" ? "Zur Lehreransicht gewechselt" : "Zur Schüleransicht gewechselt",
                    "info"
                  );
                  router.push("/start");
                  close();
                }}
              >
                Zu {role === "teacher" ? "Schüleransicht" : "Lehreransicht"} wechseln
              </MenuItem>
              <MenuDivider />
              <MenuItem
                icon={<LogOut className="size-4" strokeWidth={1.8} />}
                onClick={() => {
                  close();
                  router.push("/");
                }}
              >
                Abmelden
              </MenuItem>
            </>
          )}
        </DropdownMenu>
      </div>
    </header>
  );
}
