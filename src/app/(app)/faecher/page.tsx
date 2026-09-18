"use client";

import { BookOpen } from "lucide-react";
import { SubjectRow } from "@/components/subjects/SubjectRow";
import { subjects, materialsForSubject, newCountForSubject, CURRENT_STUDENT } from "@/lib/data";
import { useAppStore } from "@/lib/store";

export default function FaecherPage() {
  const role = useAppStore((s) => s.role);
  const classId = role === "student" ? CURRENT_STUDENT.classId : undefined;

  return (
    <div className="space-y-6 pb-6">
      <div>
        <h1 className="text-[28px] font-bold tracking-tight text-[var(--text-primary)] sm:text-[32px]">
          Fächer
        </h1>
        <p className="mt-1.5 text-[15px] text-[var(--text-secondary)]">
          {role === "teacher"
            ? "Alle Fächer der Schule im Überblick."
            : "Alle Fächer deiner Klasse im Überblick."}
        </p>
      </div>

      <div className="overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-sm)]">
        <div className="divide-y divide-[var(--divider)]">
          {subjects.map((subject) => (
            <SubjectRow
              key={subject.id}
              subject={subject}
              materialCount={materialsForSubject(subject.id, classId).length}
              newCount={classId ? newCountForSubject(subject.id, classId, 4) : 0}
            />
          ))}
        </div>
      </div>

      <p className="flex items-center gap-1.5 text-[13px] text-[var(--text-tertiary)]">
        <BookOpen className="size-3.5" strokeWidth={1.8} />
        {subjects.length} Fächer insgesamt
      </p>
    </div>
  );
}
