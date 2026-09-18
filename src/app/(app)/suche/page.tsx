"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { MaterialSearch } from "@/components/materials/MaterialSearch";
import { MaterialList } from "@/components/materials/MaterialList";
import { EmptyState } from "@/components/ui/EmptyState";
import { useAppStore } from "@/lib/store";
import { useAllMaterials } from "@/lib/useMaterials";
import { CURRENT_STUDENT, publishedMaterialsForClass, materialsByTeacher, getSubject, getTeacher, teachers } from "@/lib/data";

function SearchContent() {
  const role = useAppStore((s) => s.role);
  const pool = useAllMaterials();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams();
      if (query.trim()) params.set("q", query.trim());
      router.replace(`/suche${params.toString() ? `?${params}` : ""}`, { scroll: false });
    }, 200);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const baseList =
    role === "teacher"
      ? materialsByTeacher(teachers[0].id, pool)
      : publishedMaterialsForClass(CURRENT_STUDENT.classId, pool);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return baseList.filter((m) => {
      const subject = getSubject(m.subjectId);
      const teacher = getTeacher(m.teacherId);
      return (
        m.title.toLowerCase().includes(q) ||
        m.description?.toLowerCase().includes(q) ||
        m.fileName.toLowerCase().includes(q) ||
        subject?.name.toLowerCase().includes(q) ||
        teacher?.name.toLowerCase().includes(q)
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, baseList]);

  return (
    <div className="space-y-6 pb-6">
      <div>
        <h1 className="text-[28px] font-bold tracking-tight text-[var(--text-primary)] sm:text-[32px]">
          Suche
        </h1>
        <p className="mt-1.5 text-[15px] text-[var(--text-secondary)]">
          Durchsuche Materialien, Fächer, Lehrpersonen und Dateinamen.
        </p>
      </div>

      <MaterialSearch value={query} onChange={setQuery} autoFocus />

      {query.trim() === "" ? (
        <EmptyState
          icon={Search}
          title="Wonach suchst du?"
          description="Beginne zu tippen, um Materialien, Fächer oder Lehrpersonen zu finden."
        />
      ) : (
        <MaterialList
          materials={results}
          showSubject
          variant={role}
          emptyTitle={`Keine Materialien für „${query.trim()}“ gefunden.`}
          emptyDescription="Versuche einen anderen Suchbegriff oder entferne einen Filter."
        />
      )}
    </div>
  );
}

export default function SuchePage() {
  return (
    <Suspense fallback={null}>
      <SearchContent />
    </Suspense>
  );
}
