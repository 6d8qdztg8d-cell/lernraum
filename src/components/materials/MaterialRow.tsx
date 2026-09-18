"use client";

import Link from "next/link";
import { Download, MoreHorizontal, Pencil, RefreshCw, Link as LinkIcon, Star, Trash2 } from "lucide-react";
import { FileTypeIcon } from "./FileTypeIcon";
import { NewBadge, ImportantBadge, StatusBadge } from "./StatusBadge";
import { DropdownMenu, MenuItem, MenuDivider } from "@/components/ui/DropdownMenu";
import { formatFileSize, formatRelativeDate } from "@/lib/format";
import { useAppStore, isMaterialImportant } from "@/lib/store";
import type { Material } from "@/lib/types";

interface MaterialRowProps {
  material: Material;
  subjectName: string;
  teacherName: string;
  isNew?: boolean;
  showSubject?: boolean;
  variant?: "student" | "teacher";
  onDelete?: (id: string) => void;
}

export function MaterialRow({
  material,
  subjectName,
  teacherName,
  isNew,
  showSubject = false,
  variant = "student",
  onDelete,
}: MaterialRowProps) {
  const overrides = useAppStore((s) => s.importantOverrides);
  const toggleImportant = useAppStore((s) => s.toggleImportant);
  const showToast = useAppStore((s) => s.showToast);
  const important = isMaterialImportant(material.id, material.isImportant, overrides);

  const metaParts = [
    showSubject ? subjectName : null,
    teacherName,
    material.status === "planned" && material.plannedFor
      ? `Geplant für ${formatRelativeDate(material.plannedFor)}`
      : material.publishedAt
        ? formatRelativeDate(material.publishedAt)
        : null,
    formatFileSize(material.fileSize),
  ].filter(Boolean);

  return (
    <div className="group flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-black/[0.02] sm:gap-4 sm:px-5">
      <Link
        href={`/materialien/${material.id}`}
        className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4"
      >
        <FileTypeIcon type={material.fileType} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <p className="truncate text-[14.5px] font-medium text-[var(--text-primary)]">
              {material.title}
            </p>
            {isNew && <NewBadge />}
            {important && <ImportantBadge />}
            <StatusBadge status={material.status} />
          </div>
          <p className="mt-0.5 truncate text-[13px] text-[var(--text-secondary)]">
            {metaParts.join(" · ")}
          </p>
        </div>
      </Link>

      {variant === "student" ? (
        <a
          href={material.fileUrl}
          download
          onClick={(e) => e.stopPropagation()}
          className="flex h-8 shrink-0 items-center gap-1.5 rounded-[var(--radius-sm)] px-3 text-[13px] font-medium text-[var(--accent)] opacity-100 transition-colors hover:bg-[var(--accent-soft)] sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
          aria-label={`${material.title} herunterladen`}
        >
          <Download className="size-4" strokeWidth={1.9} />
          <span className="hidden sm:inline">Download</span>
        </a>
      ) : (
        <DropdownMenu
          trigger={({ toggle }) => (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggle();
              }}
              aria-label="Mehr Aktionen"
              className="flex size-8 shrink-0 items-center justify-center rounded-full text-[var(--text-secondary)] transition-colors hover:bg-black/[0.06] hover:text-[var(--text-primary)]"
            >
              <MoreHorizontal className="size-4" strokeWidth={1.9} />
            </button>
          )}
        >
          {(close) => (
            <>
              <MenuItem
                icon={<Pencil className="size-4" strokeWidth={1.8} />}
                onClick={() => {
                  showToast("Bearbeiten ist in dieser Vorschau nicht verfügbar", "info");
                  close();
                }}
              >
                Bearbeiten
              </MenuItem>
              <MenuItem
                icon={<RefreshCw className="size-4" strokeWidth={1.8} />}
                onClick={() => {
                  showToast("Datei ersetzen ist in dieser Vorschau nicht verfügbar", "info");
                  close();
                }}
              >
                Datei ersetzen
              </MenuItem>
              <MenuItem
                icon={<LinkIcon className="size-4" strokeWidth={1.8} />}
                onClick={() => {
                  navigator.clipboard?.writeText(
                    `${window.location.origin}/materialien/${material.id}`
                  );
                  showToast("Link kopiert");
                  close();
                }}
              >
                Link kopieren
              </MenuItem>
              <MenuItem
                icon={<Star className="size-4" strokeWidth={1.8} />}
                onClick={() => {
                  toggleImportant(material.id, material.isImportant);
                  showToast(important ? "Nicht mehr wichtig markiert" : "Als wichtig markiert");
                  close();
                }}
              >
                {important ? "Nicht mehr wichtig" : "Als wichtig markieren"}
              </MenuItem>
              <MenuDivider />
              <MenuItem
                icon={<Trash2 className="size-4" strokeWidth={1.8} />}
                destructive
                onClick={() => {
                  onDelete?.(material.id);
                  close();
                }}
              >
                Löschen
              </MenuItem>
            </>
          )}
        </DropdownMenu>
      )}
    </div>
  );
}
