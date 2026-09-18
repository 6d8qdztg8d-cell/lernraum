import type { FileKind } from "./types";

export const ACCEPTED_EXTENSIONS = [
  "pdf",
  "doc",
  "docx",
  "ppt",
  "pptx",
  "xls",
  "xlsx",
  "zip",
  "jpg",
  "jpeg",
  "png",
  "mp4",
  "mov",
];

export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB

export function extensionOf(fileName: string): string {
  return fileName.split(".").pop()?.toLowerCase() ?? "";
}

export function fileKindFromExtension(extension: string): FileKind {
  if (extension === "pdf") return "pdf";
  if (["doc", "docx"].includes(extension)) return "doc";
  if (["ppt", "pptx"].includes(extension)) return "ppt";
  if (["xls", "xlsx"].includes(extension)) return "xls";
  if (extension === "zip") return "zip";
  if (["jpg", "jpeg", "png", "gif", "webp"].includes(extension)) return "image";
  if (["mp4", "mov", "webm"].includes(extension)) return "video";
  return "file";
}

export function titleFromFileName(fileName: string): string {
  const withoutExtension = fileName.replace(/\.[^.]+$/, "");
  return withoutExtension.replace(/[_-]+/g, " ").trim();
}
