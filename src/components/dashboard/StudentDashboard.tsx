"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Star } from "lucide-react";
import { MaterialSearch } from "@/components/materials/MaterialSearch";
import { MaterialList } from "@/components/materials/MaterialList";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SubjectRow } from "@/components/subjects/SubjectRow";
import { EmptyState } from "@/components/ui/EmptyState";
import {
  CURRENT_STUDENT,
  subjects,
  materialsForSubject,
  newMaterialsSince,
  newCountForSubject,
  importantMaterialsForClass,
  getMaterial,
} from "@/lib/data";
import { greetingForNow } from "@/lib/format";
import { useAppStore } from "@/lib/store";
import { useAllMaterials } from "@/lib/useMaterials";

export function StudentDashboard() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const recentlyViewed = useAppStore((s) => s.recentlyViewed);
  const pool = useAllMaterials();
  const classId = CURRENT_STUDENT.classId;

  const rawNew = newMaterialsSince(classId, 4, pool);
  const newIds = new Set(rawNew.map((m) => m.id));
  const important = importantMaterialsForClass(classId, pool).slice(0, 4);
  const viewedMaterials = recentlyViewed
    .map((id) => getMaterial(id))
    .filter((m): m is NonNullable<typeof m> => !!m)
    .slice(0, 4);

  const classSubjects = subjects.filter(
    (s) => materialsForSubject(s.id, classId, pool).length > 0 || s.teacherIds.length > 0
  );

  function handleSearchSubmit(e: FormEvent) {
    e.preventDefault();
    router.push(query.trim() ? `/suche?q=${encodeURIComponent(query.trim())}` : "/suche");
  }

  return (
    <div className="space-y-10 pb-6">
      <div className="animate-fade-in-up">
        <h1 className="text-[28px] font-bold tracking-tight text-[var(--text-primary)] sm:text-[34px]">
          {greetingForNow()}, {CURRENT_STUDENT.name}.
        </h1>
        <p className="mt-1.5 text-[15px] text-[var(--text-secondary)]">
          Hier findest du die neuesten Materialien für deine Klasse.
        </p>
        <form onSubmit={handleSearchSubmit} className="mt-6">
          <MaterialSearch value={query} onChange={setQuery} />
        </form>
      </div>

      <section className="animate-fade-in-up" style={{ animationDelay: "40ms" }}>
        <SectionHeader title="Neu für dich" href="/materialien" />
        {rawNew.length > 0 ? (
          <MaterialList materials={rawNew.slice(0, 5)} showSubject newMaterialIds={newIds} />
        ) : (
          <EmptyState
            icon={Star}
            title="Alles gesehen"
            description="Es gibt aktuell keine neuen Materialien für deine Klasse. Schau später wieder vorbei."
          />
        )}
      </section>

      <section className="animate-fade-in-up" style={{ animationDelay: "80ms" }}>
        <SectionHeader title="Deine Fächer" href="/faecher" />
        <div className="overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-sm)]">
          <div className="divide-y divide-[var(--divider)]">
            {classSubjects.map((subject) => (
              <SubjectRow
                key={subject.id}
                subject={subject}
                materialCount={materialsForSubject(subject.id, classId, pool).length}
                newCount={newCountForSubject(subject.id, classId, 4, pool)}
              />
            ))}
          </div>
        </div>
      </section>

      {important.length > 0 && (
        <section className="animate-fade-in-up" style={{ animationDelay: "120ms" }}>
          <SectionHeader title="Wichtig" href="/wichtig" />
          <MaterialList materials={important} showSubject />
        </section>
      )}

      {viewedMaterials.length > 0 && (
        <section className="animate-fade-in-up" style={{ animationDelay: "160ms" }}>
          <SectionHeader title="Zuletzt geöffnet" />
          <MaterialList materials={viewedMaterials} showSubject />
        </section>
      )}
    </div>
  );
}
