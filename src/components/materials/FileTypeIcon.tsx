import { FileText, FileImage, FileSpreadsheet, FileArchive, FileVideo, File } from "lucide-react";
import type { FileKind } from "@/lib/types";
import { cn } from "@/lib/cn";

const config: Record<FileKind, { icon: typeof FileText; color: string; bg: string }> = {
  pdf: { icon: FileText, color: "#d70015", bg: "rgba(215,0,21,0.08)" },
  doc: { icon: FileText, color: "#0071e3", bg: "rgba(0,113,227,0.08)" },
  ppt: { icon: FileText, color: "#ff9f0a", bg: "rgba(255,159,10,0.1)" },
  xls: { icon: FileSpreadsheet, color: "#1a8f4c", bg: "rgba(26,143,76,0.1)" },
  zip: { icon: FileArchive, color: "#6e6e73", bg: "rgba(110,110,115,0.1)" },
  image: { icon: FileImage, color: "#8a4fff", bg: "rgba(138,79,255,0.1)" },
  video: { icon: FileVideo, color: "#ff2d55", bg: "rgba(255,45,85,0.08)" },
  file: { icon: File, color: "#6e6e73", bg: "rgba(110,110,115,0.1)" },
};

export function FileTypeIcon({ type, size = "md" }: { type: FileKind; size?: "sm" | "md" | "lg" }) {
  const { icon: Icon, color, bg } = config[type] ?? config.file;
  const dimensions = { sm: "size-8", md: "size-10", lg: "size-12" }[size];
  const iconSize = { sm: "size-4", md: "size-5", lg: "size-6" }[size];

  return (
    <div
      className={cn("flex shrink-0 items-center justify-center rounded-[var(--radius-sm)]", dimensions)}
      style={{ backgroundColor: bg }}
      aria-hidden
    >
      <Icon className={iconSize} style={{ color }} strokeWidth={1.8} />
    </div>
  );
}
