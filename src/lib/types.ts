export type Role = "student" | "teacher";

export type FileKind =
  | "pdf"
  | "doc"
  | "ppt"
  | "xls"
  | "zip"
  | "image"
  | "video"
  | "file";

export type MaterialStatus = "published" | "draft" | "planned";

export interface Teacher {
  id: string;
  name: string;
  initials: string;
  subjectIds: string[];
}

export interface SchoolClass {
  id: string;
  name: string;
  studentCount: number;
}

export interface Subject {
  id: string;
  slug: string;
  name: string;
  accent: string;
  teacherIds: string[];
}

export interface Topic {
  id: string;
  subjectId: string;
  name: string;
}

export interface Material {
  id: string;
  title: string;
  description?: string;

  fileName: string;
  fileUrl: string;
  fileType: FileKind;
  fileSize: number;

  subjectId: string;
  classIds: string[];
  topicId?: string;
  teacherId: string;

  isImportant: boolean;
  status: MaterialStatus;

  publishedAt?: string;
  plannedFor?: string;
  createdAt: string;
}
