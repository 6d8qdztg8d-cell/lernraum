"use client";

import { useState } from "react";
import { ChevronDown, ListFilter, Star, Sparkles } from "lucide-react";
import { DropdownMenu, MenuItem } from "@/components/ui/DropdownMenu";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import type { FileKind } from "@/lib/types";

export type SortOption = "newest" | "oldest" | "title";

export interface FilterState {
  subjectId: string;
  fileType: FileKind | "all";
  sort: SortOption;
  onlyNew: boolean;
  onlyImportant: boolean;
}

export const defaultFilterState: FilterState = {
  subjectId: "all",
  fileType: "all",
  sort: "newest",
  onlyNew: false,
  onlyImportant: false,
};

const fileTypeLabels: Record<FileKind | "all", string> = {
  all: "Alle Dateitypen",
  pdf: "PDF",
  doc: "Word",
  ppt: "PowerPoint",
  xls: "Excel",
  zip: "ZIP",
  image: "Bild",
  video: "Video",
  file: "Datei",
};

const sortLabels: Record<SortOption, string> = {
  newest: "Neueste zuerst",
  oldest: "Älteste zuerst",
  title: "Titel A–Z",
};

interface MaterialFiltersProps {
  value: FilterState;
  onChange: (patch: Partial<FilterState>) => void;
  subjects?: { id: string; name: string }[];
  activeCount: number;
}

export function MaterialFilters({ value, onChange, subjects, activeCount }: MaterialFiltersProps) {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <div className="hidden flex-wrap items-center gap-2 sm:flex">
          {subjects && (
            <FilterDropdown
              label={subjects.find((s) => s.id === value.subjectId)?.name ?? "Alle Fächer"}
              active={value.subjectId !== "all"}
            >
              {(close) => (
                <>
                  <MenuItem onClick={() => { onChange({ subjectId: "all" }); close(); }}>
                    Alle Fächer
                  </MenuItem>
                  {subjects.map((s) => (
                    <MenuItem key={s.id} onClick={() => { onChange({ subjectId: s.id }); close(); }}>
                      {s.name}
                    </MenuItem>
                  ))}
                </>
              )}
            </FilterDropdown>
          )}

          <FilterDropdown label={fileTypeLabels[value.fileType]} active={value.fileType !== "all"}>
            {(close) => (
              <>
                {(Object.keys(fileTypeLabels) as (FileKind | "all")[]).map((key) => (
                  <MenuItem key={key} onClick={() => { onChange({ fileType: key }); close(); }}>
                    {fileTypeLabels[key]}
                  </MenuItem>
                ))}
              </>
            )}
          </FilterDropdown>

          <FilterDropdown label={sortLabels[value.sort]}>
            {(close) => (
              <>
                {(Object.keys(sortLabels) as SortOption[]).map((key) => (
                  <MenuItem key={key} onClick={() => { onChange({ sort: key }); close(); }}>
                    {sortLabels[key]}
                  </MenuItem>
                ))}
              </>
            )}
          </FilterDropdown>

          <Chip
            active={value.onlyNew}
            onClick={() => onChange({ onlyNew: !value.onlyNew })}
            icon={<Sparkles className="size-3.5" strokeWidth={2} />}
          >
            Neu
          </Chip>
          <Chip
            active={value.onlyImportant}
            onClick={() => onChange({ onlyImportant: !value.onlyImportant })}
            icon={<Star className="size-3.5" strokeWidth={2} />}
          >
            Wichtig
          </Chip>
        </div>

        <button
          onClick={() => setSheetOpen(true)}
          className={cn(
            "flex h-9 items-center gap-2 rounded-full border px-3.5 text-[13px] font-medium transition-colors sm:hidden",
            activeCount > 0
              ? "border-transparent bg-[var(--accent-soft)] text-[var(--accent)]"
              : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)]"
          )}
        >
          <ListFilter className="size-3.5" strokeWidth={2} />
          Filter
          {activeCount > 0 && (
            <span className="flex size-4 items-center justify-center rounded-full bg-[var(--accent)] text-[10px] font-semibold text-white">
              {activeCount}
            </span>
          )}
        </button>
      </div>

      <Modal open={sheetOpen} onClose={() => setSheetOpen(false)} title="Filter" size="sm">
        <div className="space-y-6">
          {subjects && (
            <FilterGroup label="Fach">
              <RadioRow
                options={[{ id: "all", name: "Alle Fächer" }, ...subjects]}
                value={value.subjectId}
                onSelect={(id) => onChange({ subjectId: id })}
              />
            </FilterGroup>
          )}
          <FilterGroup label="Dateityp">
            <RadioRow
              options={(Object.keys(fileTypeLabels) as (FileKind | "all")[]).map((k) => ({
                id: k,
                name: fileTypeLabels[k],
              }))}
              value={value.fileType}
              onSelect={(id) => onChange({ fileType: id as FileKind | "all" })}
            />
          </FilterGroup>
          <FilterGroup label="Sortierung">
            <RadioRow
              options={(Object.keys(sortLabels) as SortOption[]).map((k) => ({ id: k, name: sortLabels[k] }))}
              value={value.sort}
              onSelect={(id) => onChange({ sort: id as SortOption })}
            />
          </FilterGroup>
          <div className="flex gap-3">
            <Chip active={value.onlyNew} onClick={() => onChange({ onlyNew: !value.onlyNew })}>
              Nur neue
            </Chip>
            <Chip active={value.onlyImportant} onClick={() => onChange({ onlyImportant: !value.onlyImportant })}>
              Nur wichtige
            </Chip>
          </div>
          <div className="flex justify-between border-t border-[var(--divider)] pt-4">
            <Button
              variant="tertiary"
              onClick={() => {
                onChange({ subjectId: "all", fileType: "all", sort: "newest", onlyNew: false, onlyImportant: false });
              }}
            >
              Zurücksetzen
            </Button>
            <Button onClick={() => setSheetOpen(false)}>Anwenden</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

function FilterDropdown({
  label,
  active,
  children,
}: {
  label: string;
  active?: boolean;
  children: (close: () => void) => React.ReactNode;
}) {
  return (
    <DropdownMenu
      align="left"
      trigger={({ toggle, open }) => (
        <button
          onClick={toggle}
          className={cn(
            "flex h-9 items-center gap-1.5 rounded-full border px-3.5 text-[13px] font-medium transition-colors",
            active
              ? "border-transparent bg-[var(--accent-soft)] text-[var(--accent)]"
              : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] hover:bg-black/[0.03]",
            open && "ring-4 ring-[var(--accent-soft)]"
          )}
        >
          {label}
          <ChevronDown className="size-3.5" strokeWidth={2} />
        </button>
      )}
    >
      {children}
    </DropdownMenu>
  );
}

function Chip({
  active,
  onClick,
  children,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "flex h-9 items-center gap-1.5 rounded-full border px-3.5 text-[13px] font-medium transition-colors",
        active
          ? "border-transparent bg-[var(--accent-soft)] text-[var(--accent)]"
          : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] hover:bg-black/[0.03]"
      )}
    >
      {icon}
      {children}
    </button>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-[13px] font-semibold text-[var(--text-secondary)]">{label}</p>
      {children}
    </div>
  );
}

function RadioRow({
  options,
  value,
  onSelect,
}: {
  options: { id: string; name: string }[];
  value: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <Chip key={option.id} active={value === option.id} onClick={() => onSelect(option.id)}>
          {option.name}
        </Chip>
      ))}
    </div>
  );
}
