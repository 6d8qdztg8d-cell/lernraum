"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft, Download, FileWarning } from "lucide-react";
import { FileTypeIcon } from "@/components/materials/FileTypeIcon";
import { NewBadge, ImportantBadge, StatusBadge } from "@/components/materials/StatusBadge";
import { EmptyState } from "@/components/ui/EmptyState";
import { LinkButton, Button } from "@/components/ui/Button";
import { useAppStore } from "@/lib/store";
import { getMaterial, getSubject, getTeacher, getClass, newMaterialsSince } from "@/lib/data";
import { formatFileSize, formatFullDate, formatRelativeDate } from "@/lib/format";

export default function MaterialDetailPage() {
  const params = useParams<{ id: string }>();
  const uploads = useAppStore((s) => s.uploads);
  const material = getMaterial(params.id) ?? uploads.find((m) => m.id === params.id);
  const markViewed = useAppStore((s) => s.markViewed);
  const showToast = useAppStore((s) => s.showToast);

  useEffect(() => {
    if (material) markViewed(material.id);
  }, [material, markViewed]);

  if (!material) {
    return (
      <div className="mx-auto max-w-lg pt-10">
        <EmptyState
          icon={FileWarning}
          title="Material nicht verfügbar"
          description="Dieses Material wurde möglicherweise entfernt oder existiert nicht mehr."
          action={
            <LinkButton href="/materialien" variant="secondary">
              Zurück zu Materialien
            </LinkButton>
          }
        />
      </div>
    );
  }

  const subject = getSubject(material.subjectId);
  const teacher = getTeacher(material.teacherId);
  const classNames = material.classIds.map((id) => getClass(id)?.name).filter(Boolean).join(", ");
  const isNew = newMaterialsSince("6j", 4).some((m) => m.id === material.id);

  return (
    <div className="space-y-6 pb-10">
      <Link
        href={subject ? `/faecher/${subject.slug}` : "/materialien"}
        className="inline-flex items-center gap-1 text-[14px] font-medium text-[var(--accent)] hover:text-[var(--accent-hover)]"
      >
        <ChevronLeft className="size-4" strokeWidth={2.2} />
        {subject?.name ?? "Materialien"}
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <FileTypeIcon type={material.fileType} size="lg" />
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-[24px] font-bold tracking-tight text-[var(--text-primary)] sm:text-[28px]">
                {material.title}
              </h1>
              {isNew && <NewBadge />}
              {material.isImportant && <ImportantBadge />}
              <StatusBadge status={material.status} />
            </div>
            <p className="mt-1 text-[14.5px] text-[var(--text-secondary)]">
              {teacher?.name} · {subject?.name}
              {material.status === "planned" && material.plannedFor
                ? ` · Geplant für ${formatRelativeDate(material.plannedFor)}`
                : material.publishedAt
                  ? ` · Hochgeladen am ${formatFullDate(material.publishedAt)}`
                  : ""}
            </p>
          </div>
        </div>
      </div>

      {material.description && (
        <p className="max-w-2xl text-[15px] leading-relaxed text-[var(--text-secondary)]">
          {material.description}
        </p>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">
        <div className="order-2 overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface-secondary)] shadow-[var(--shadow-sm)] lg:order-1">
          {material.fileType === "pdf" ? (
            <iframe
              src={material.fileUrl}
              title={material.title}
              className="h-[70vh] w-full lg:h-[75vh]"
            />
          ) : (
            <div className="flex h-64 flex-col items-center justify-center gap-3 text-center">
              <FileTypeIcon type={material.fileType} size="lg" />
              <p className="text-[14px] text-[var(--text-secondary)]">
                Für diesen Dateityp ist keine Vorschau verfügbar.
              </p>
            </div>
          )}
        </div>

        <aside className="order-1 space-y-5 lg:order-2">
          <a href={material.fileUrl} download onClick={() => showToast("Download gestartet")}>
            <Button fullWidth size="lg" icon={<Download className="size-4" strokeWidth={2} />}>
              Herunterladen
            </Button>
          </a>

          <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)]">
            <dl className="divide-y divide-[var(--divider)] text-[13.5px]">
              <Row label="Fach" value={subject?.name ?? "—"} />
              <Row label="Klasse" value={classNames || "—"} />
              <Row label="Dateityp" value={material.fileType.toUpperCase()} />
              <Row label="Dateigrösse" value={formatFileSize(material.fileSize)} />
              <Row label="Dateiname" value={material.fileName} />
            </dl>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3">
      <dt className="text-[var(--text-secondary)]">{label}</dt>
      <dd className="truncate text-right font-medium text-[var(--text-primary)]">{value}</dd>
    </div>
  );
}
