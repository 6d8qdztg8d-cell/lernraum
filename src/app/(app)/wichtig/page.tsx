"use client";

import { Star } from "lucide-react";
import { MaterialList } from "@/components/materials/MaterialList";
import { EmptyState } from "@/components/ui/EmptyState";
import { CURRENT_STUDENT, importantMaterialsForClass } from "@/lib/data";

export default function WichtigPage() {
  const important = importantMaterialsForClass(CURRENT_STUDENT.classId);

  return (
    <div className="space-y-6 pb-6">
      <div>
        <h1 className="text-[28px] font-bold tracking-tight text-[var(--text-primary)] sm:text-[32px]">
          Wichtig
        </h1>
        <p className="mt-1.5 text-[15px] text-[var(--text-secondary)]">
          Von deiner Lehrperson als wichtig markierte Materialien.
        </p>
      </div>

      {important.length > 0 ? (
        <MaterialList materials={important} showSubject />
      ) : (
        <EmptyState
          icon={Star}
          title="Nichts als wichtig markiert"
          description="Wenn deine Lehrperson ein Material als wichtig markiert, erscheint es hier."
        />
      )}
    </div>
  );
}
