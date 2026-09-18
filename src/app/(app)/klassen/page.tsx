"use client";

import { Users, ChevronRight } from "lucide-react";
import { classes, materials } from "@/lib/data";

export default function KlassenPage() {
  return (
    <div className="space-y-6 pb-6">
      <div>
        <h1 className="text-[28px] font-bold tracking-tight text-[var(--text-primary)] sm:text-[32px]">
          Klassen
        </h1>
        <p className="mt-1.5 text-[15px] text-[var(--text-secondary)]">
          Übersicht über die Klassen, denen du Materialien bereitstellst.
        </p>
      </div>

      <div className="overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-sm)]">
        <div className="divide-y divide-[var(--divider)]">
          {classes.map((klass) => {
            const materialCount = materials.filter(
              (m) => m.classIds.includes(klass.id) && m.status === "published"
            ).length;
            return (
              <div key={klass.id} className="flex items-center gap-4 px-4 py-4 sm:px-5">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[var(--accent-soft)]">
                  <Users className="size-5 text-[var(--accent)]" strokeWidth={1.8} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[15px] font-semibold text-[var(--text-primary)]">Klasse {klass.name}</p>
                  <p className="text-[13px] text-[var(--text-secondary)]">
                    {klass.studentCount} Schüler · {materialCount} Materialien
                  </p>
                </div>
                <ChevronRight className="size-4 shrink-0 text-[var(--text-tertiary)]" strokeWidth={1.8} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
