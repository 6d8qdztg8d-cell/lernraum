"use client";

import { Suspense, useMemo, useState } from "react";
import { UploadCloud } from "lucide-react";
import { MaterialSearch } from "@/components/materials/MaterialSearch";
import { MaterialFilters, defaultFilterState, type FilterState } from "@/components/materials/MaterialFilters";
import { MaterialList } from "@/components/materials/MaterialList";
import { LinkButton } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { useAppStore } from "@/lib/store";
import { useAllMaterials } from "@/lib/useMaterials";
import { useSearchParams } from "next/navigation";
import {
  CURRENT_STUDENT,
  subjects,
  publishedMaterialsForClass,
  materialsByTeacher,
  getTeacher,
  getSubject,
  newMaterialsSince,
  teachers,
} from "@/lib/data";

type TeacherTab = "all" | "draft" | "planned";

export default function MaterialienPage() {
  return (
    <Suspense fallback={null}>
      <MaterialienContent />
    </Suspense>
  );
}

function MaterialienContent() {
  const role = useAppStore((s) => s.role);
  const pool = useAllMaterials();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>(() => ({
    ...defaultFilterState,
    subjectId: searchParams.get("subject") ?? "all",
  }));
  const [tab, setTab] = useState<TeacherTab>("all");

  const baseList =
    role === "teacher"
      ? materialsByTeacher(teachers[0].id, pool)
      : publishedMaterialsForClass(CURRENT_STUDENT.classId, pool);

  const newIds = useMemo(
    () => new Set(newMaterialsSince(CURRENT_STUDENT.classId, 4, pool).map((m) => m.id)),
    [pool]
  );

  const filtered = useMemo(() => {
    let list = baseList;

    if (role === "teacher" && tab !== "all") {
      list = list.filter((m) => m.status === tab);
    }

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter((m) => {
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
    }

    if (filters.subjectId !== "all") list = list.filter((m) => m.subjectId === filters.subjectId);
    if (filters.fileType !== "all") list = list.filter((m) => m.fileType === filters.fileType);
    if (filters.onlyNew) list = list.filter((m) => newIds.has(m.id));
    if (filters.onlyImportant) list = list.filter((m) => m.isImportant);

    const sorted = [...list].sort((a, b) => {
      if (filters.sort === "title") return a.title.localeCompare(b.title, "de");
      const aDate = a.publishedAt ?? a.createdAt;
      const bDate = b.publishedAt ?? b.createdAt;
      return filters.sort === "oldest" ? aDate.localeCompare(bDate) : bDate.localeCompare(aDate);
    });

    return sorted;
  }, [baseList, role, tab, query, filters, newIds]);

  const activeFilterCount =
    (filters.subjectId !== "all" ? 1 : 0) +
    (filters.fileType !== "all" ? 1 : 0) +
    (filters.onlyNew ? 1 : 0) +
    (filters.onlyImportant ? 1 : 0);

  const draftCount = pool.filter((m) => m.teacherId === teachers[0].id && m.status === "draft").length;
  const plannedCount = pool.filter((m) => m.teacherId === teachers[0].id && m.status === "planned").length;

  return (
    <div className="space-y-6 pb-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-[28px] font-bold tracking-tight text-[var(--text-primary)] sm:text-[32px]">
            Materialien
          </h1>
          <p className="mt-1.5 text-[15px] text-[var(--text-secondary)]">
            {role === "teacher"
              ? "Alle Materialien, die du für deine Klassen bereitgestellt hast."
              : "Alle Unterrichtsmaterialien deiner Klasse."}
          </p>
        </div>
        {role === "teacher" && (
          <LinkButton href="/upload" icon={<UploadCloud className="size-4" strokeWidth={2} />}>
            Material hochladen
          </LinkButton>
        )}
      </div>

      <MaterialSearch value={query} onChange={setQuery} />

      {role === "teacher" && (
        <div className="flex gap-1 border-b border-[var(--divider)]">
          <TabButton active={tab === "all"} onClick={() => setTab("all")}>
            Alle
          </TabButton>
          <TabButton active={tab === "draft"} onClick={() => setTab("draft")} count={draftCount}>
            Entwürfe
          </TabButton>
          <TabButton active={tab === "planned"} onClick={() => setTab("planned")} count={plannedCount}>
            Geplant
          </TabButton>
        </div>
      )}

      <MaterialFilters
        value={filters}
        onChange={(patch) => setFilters((prev) => ({ ...prev, ...patch }))}
        subjects={subjects.map((s) => ({ id: s.id, name: s.name }))}
        activeCount={activeFilterCount}
      />

      <MaterialList
        materials={filtered}
        showSubject
        variant={role}
        newMaterialIds={newIds}
        emptyTitle={query ? `Keine Materialien für „${query}“ gefunden.` : "Keine Materialien gefunden."}
        emptyDescription="Versuche einen anderen Suchbegriff oder entferne einen Filter."
      />
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
  count,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  count?: number;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative px-3 pb-3 text-[14px] font-medium transition-colors",
        active ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
      )}
    >
      {children}
      {typeof count === "number" && count > 0 && (
        <span className="ml-1.5 text-[12px] text-[var(--text-tertiary)]">{count}</span>
      )}
      {active && (
        <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-[var(--accent)]" />
      )}
    </button>
  );
}
