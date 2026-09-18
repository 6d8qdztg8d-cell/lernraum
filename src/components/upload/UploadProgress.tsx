"use client";

import { CheckCircle2 } from "lucide-react";
import { FileTypeIcon } from "@/components/materials/FileTypeIcon";
import { formatFileSize } from "@/lib/format";
import { extensionOf, fileKindFromExtension } from "@/lib/file";

export interface UploadItem {
  file: File;
  progress: number;
  done: boolean;
}

export function UploadProgress({ items }: { items: UploadItem[] }) {
  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const kind = fileKindFromExtension(extensionOf(item.file.name));
        return (
          <div
            key={index}
            className="flex items-center gap-3.5 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] px-4 py-3.5"
          >
            <FileTypeIcon type={kind} size="sm" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-[13.5px] font-medium text-[var(--text-primary)]">
                  {item.file.name}
                </p>
                <span className="shrink-0 text-[12.5px] tabular-nums text-[var(--text-secondary)]">
                  {item.done ? formatFileSize(item.file.size) : `${Math.round(item.progress)} %`}
                </span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-black/[0.06]">
                <div
                  className="h-full rounded-full bg-[var(--accent)] transition-[width] duration-150 ease-linear"
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            </div>
            {item.done && (
              <CheckCircle2 className="size-4.5 shrink-0 text-[var(--success)]" strokeWidth={2} />
            )}
          </div>
        );
      })}
    </div>
  );
}
