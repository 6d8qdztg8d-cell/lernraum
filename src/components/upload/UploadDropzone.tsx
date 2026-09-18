"use client";

import { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { ACCEPTED_EXTENSIONS } from "@/lib/file";

export function UploadDropzone({ onFiles }: { onFiles: (files: File[]) => void }) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    onFiles(Array.from(fileList));
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        handleFiles(e.dataTransfer.files);
      }}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
      }}
      className={cn(
        "flex cursor-pointer flex-col items-center justify-center gap-4 rounded-[var(--radius-xl)] border-2 border-dashed px-6 py-16 text-center transition-all duration-200",
        dragging
          ? "scale-[1.005] border-[var(--accent)] bg-[var(--accent-soft)]"
          : "border-[var(--border-strong)] bg-[var(--surface)] hover:bg-black/[0.015]"
      )}
    >
      <div
        className={cn(
          "flex size-16 items-center justify-center rounded-full transition-colors",
          dragging ? "bg-[var(--accent)]" : "bg-[var(--accent-soft)]"
        )}
      >
        <UploadCloud
          className={cn("size-7 transition-colors", dragging ? "text-white" : "text-[var(--accent)]")}
          strokeWidth={1.7}
        />
      </div>
      <div>
        <p className="text-[16px] font-semibold text-[var(--text-primary)]">
          {dragging ? "Loslassen zum Hochladen" : "Dateien hier ablegen"}
        </p>
        <p className="mt-1 text-[13.5px] text-[var(--text-secondary)]">oder</p>
      </div>
      <Button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          inputRef.current?.click();
        }}
      >
        Dateien auswählen
      </Button>
      <p className="text-[12.5px] text-[var(--text-tertiary)]">
        PDF, Word, PowerPoint, Excel, Bilder und ZIP
      </p>
      <input
        ref={inputRef}
        type="file"
        multiple
        className="hidden"
        accept={ACCEPTED_EXTENSIONS.map((ext) => `.${ext}`).join(",")}
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}
