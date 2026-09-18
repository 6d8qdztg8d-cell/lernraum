"use client";

import { UploadCloud, FolderOpen } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { MaterialList } from "@/components/materials/MaterialList";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { teachers, materialsByTeacher, plannedOrDraftByTeacher } from "@/lib/data";
import { greetingForNow } from "@/lib/format";
import { useAllMaterials } from "@/lib/useMaterials";

export function TeacherDashboard() {
  const teacher = teachers[0];
  const pool = useAllMaterials();
  const own = materialsByTeacher(teacher.id, pool);
  const recent = own.filter((m) => m.status === "published").slice(0, 5);
  const upcoming = plannedOrDraftByTeacher(teacher.id, pool);

  return (
    <div className="space-y-10 pb-6">
      <div className="flex flex-col gap-5 animate-fade-in-up sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-[28px] font-bold tracking-tight text-[var(--text-primary)] sm:text-[34px]">
            {greetingForNow()}, {teacher.name}.
          </h1>
          <p className="mt-1.5 text-[15px] text-[var(--text-secondary)]">
            Verwalte die Materialien, die du deinen Klassen bereitgestellt hast.
          </p>
        </div>
        <LinkButton href="/upload" size="lg" icon={<UploadCloud className="size-4" strokeWidth={2} />}>
          Material hochladen
        </LinkButton>
      </div>

      <section className="animate-fade-in-up" style={{ animationDelay: "40ms" }}>
        <SectionHeader title="Zuletzt hochgeladen" href="/materialien" />
        {recent.length > 0 ? (
          <MaterialList materials={recent} showSubject variant="teacher" />
        ) : (
          <EmptyState
            icon={FolderOpen}
            title="Noch keine Materialien"
            description="Lade dein erstes Unterrichtsmaterial hoch und stelle es deiner Klasse zur Verfügung."
            action={
              <LinkButton href="/upload" icon={<UploadCloud className="size-4" strokeWidth={2} />}>
                Material hochladen
              </LinkButton>
            }
          />
        )}
      </section>

      {upcoming.length > 0 && (
        <section className="animate-fade-in-up" style={{ animationDelay: "80ms" }}>
          <SectionHeader title="Entwürfe & Geplant" href="/materialien" />
          <MaterialList materials={upcoming} showSubject variant="teacher" />
        </section>
      )}
    </div>
  );
}
