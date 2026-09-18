"use client";

import { useState } from "react";
import { FileQuestion } from "lucide-react";
import { MaterialRow } from "./MaterialRow";
import { EmptyState } from "@/components/ui/EmptyState";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { useAppStore } from "@/lib/store";
import { getSubject, getTeacher } from "@/lib/data";
import type { Material } from "@/lib/types";

interface MaterialListProps {
  materials: Material[];
  showSubject?: boolean;
  variant?: "student" | "teacher";
  newMaterialIds?: Set<string>;
  emptyTitle?: string;
  emptyDescription?: string;
}

export function MaterialList({
  materials,
  showSubject = false,
  variant = "student",
  newMaterialIds,
  emptyTitle = "Keine Materialien gefunden.",
  emptyDescription = "Versuche einen anderen Suchbegriff oder entferne einen Filter.",
}: MaterialListProps) {
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const showToast = useAppStore((s) => s.showToast);

  if (materials.length === 0) {
    return <EmptyState icon={FileQuestion} title={emptyTitle} description={emptyDescription} />;
  }

  const pendingMaterial = materials.find((m) => m.id === pendingDeleteId);

  return (
    <>
      <div className="overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-sm)]">
        <div className="divide-y divide-[var(--divider)]">
          {materials.map((material) => {
            const subject = getSubject(material.subjectId);
            const teacher = getTeacher(material.teacherId);
            return (
              <MaterialRow
                key={material.id}
                material={material}
                subjectName={subject?.name ?? ""}
                teacherName={teacher?.name ?? ""}
                showSubject={showSubject}
                variant={variant}
                isNew={newMaterialIds?.has(material.id)}
                onDelete={variant === "teacher" ? setPendingDeleteId : undefined}
              />
            );
          })}
        </div>
      </div>

      <ConfirmDialog
        open={!!pendingMaterial}
        onClose={() => setPendingDeleteId(null)}
        onConfirm={() => {
          showToast(`„${pendingMaterial?.title}“ wurde gelöscht`);
        }}
        title="Material löschen?"
        description={`„${pendingMaterial?.title}“ wird für alle Schüler entfernt. Diese Aktion kann nicht rückgängig gemacht werden.`}
        confirmLabel="Löschen"
        destructive
      />
    </>
  );
}
