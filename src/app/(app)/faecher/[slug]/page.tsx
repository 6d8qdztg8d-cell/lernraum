"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft, Inbox } from "lucide-react";
import { MaterialSearch } from "@/components/materials/MaterialSearch";
import { MaterialList } from "@/components/materials/MaterialList";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import {
  CURRENT_STUDENT,
  getSubjectBySlug,
  materialsForSubject,
  newMaterialsSince,
  getTeacher,
} from "@/lib/data";
import { useAllMaterials, useAllTopics } from "@/lib/useMaterials";

export default function SubjectDetailPage() {
  const params = useParams<{ slug: string }>();
  const [query, setQuery] = useState("");
  const subject = getSubjectBySlug(params.slug);
  const pool = useAllMaterials();
  const allTopics = useAllTopics();

  const classId = CURRENT_STUDENT.classId;
  const subjectMaterials = useMemo(
    () => (subject ? materialsForSubject(subject.id, classId, pool) : []),
    [subject, classId, pool]
  );

  const newIds = useMemo(
    () => new Set(newMaterialsSince(classId, 4, pool).map((m) => m.id)),
    [classId, pool]
  );

  const subjectTopics = subject ? allTopics.filter((t) => t.subjectId === subject.id) : [];

  const filtered = query.trim()
    ? subjectMaterials.filter((m) => {
        const q = query.trim().toLowerCase();
        return m.title.toLowerCase().includes(q) || m.description?.toLowerCase().includes(q);
      })
    : null;

  if (!subject) {
    return (
      <div className="mx-auto max-w-lg pt-10">
        <EmptyState
          icon={Inbox}
          title="Fach nicht gefunden"
          description="Dieses Fach existiert nicht oder wurde entfernt."
        />
      </div>
    );
  }

  const teacherNames = subject.teacherIds.map((id) => getTeacher(id)?.name).filter(Boolean).join(", ");
  const recent = subjectMaterials.slice(0, 4);

  return (
    <div className="space-y-6 pb-6">
      <Link
        href="/faecher"
        className="inline-flex items-center gap-1 text-[14px] font-medium text-[var(--accent)] hover:text-[var(--accent-hover)]"
      >
        <ChevronLeft className="size-4" strokeWidth={2.2} />
        Fächer
      </Link>

      <div className="flex items-center gap-3">
        <span className="size-3 shrink-0 rounded-full" style={{ backgroundColor: subject.accent }} aria-hidden />
        <div>
          <h1 className="text-[28px] font-bold tracking-tight text-[var(--text-primary)] sm:text-[32px]">
            {subject.name}
          </h1>
          {teacherNames && (
            <p className="mt-0.5 text-[14.5px] text-[var(--text-secondary)]">
              {teacherNames} · Klasse {classId.toUpperCase()}
            </p>
          )}
        </div>
      </div>

      <MaterialSearch value={query} onChange={setQuery} placeholder={`Suche in ${subject.name}`} />

      {subjectMaterials.length === 0 ? (
        <EmptyState
          icon={Inbox}
          title="Hier ist noch nichts."
          description="Sobald deine Lehrperson neues Material hochlädt, erscheint es hier."
        />
      ) : filtered ? (
        <MaterialList
          materials={filtered}
          newMaterialIds={newIds}
          emptyTitle={`Keine Materialien für „${query}“ gefunden.`}
          emptyDescription="Versuche einen anderen Suchbegriff."
        />
      ) : (
        <div className="space-y-8">
          <section>
            <SectionHeader title="Neu" />
            <MaterialList materials={recent} newMaterialIds={newIds} />
          </section>

          {subjectTopics.map((topic) => {
            const topicMaterials = subjectMaterials.filter((m) => m.topicId === topic.id);
            if (topicMaterials.length === 0) return null;
            return (
              <section key={topic.id}>
                <SectionHeader title={topic.name} />
                <MaterialList materials={topicMaterials} newMaterialIds={newIds} />
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
