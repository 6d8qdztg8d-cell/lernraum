import type { Material, SchoolClass, Subject, Teacher, Topic } from "./types";

export const CURRENT_STUDENT = {
  name: "Luca",
  classId: "6j",
};

export const teachers: Teacher[] = [
  { id: "weber", name: "Herr Weber", initials: "HW", subjectIds: ["physik", "chemie"] },
  { id: "mueller", name: "Herr Müller", initials: "HM", subjectIds: ["mathematik", "informatik", "wirtschaft"] },
  { id: "schneider", name: "Frau Schneider", initials: "FS", subjectIds: ["deutsch", "geschichte", "geografie"] },
  { id: "keller", name: "Frau Keller", initials: "FK", subjectIds: ["englisch", "biologie"] },
];

export const classes: SchoolClass[] = [
  { id: "6j", name: "6J", studentCount: 24 },
  { id: "6a", name: "6A", studentCount: 22 },
];

export const subjects: Subject[] = [
  { id: "mathematik", slug: "mathematik", name: "Mathematik", accent: "#0071e3", teacherIds: ["mueller"] },
  { id: "deutsch", slug: "deutsch", name: "Deutsch", accent: "#8a4fff", teacherIds: ["schneider"] },
  { id: "englisch", slug: "englisch", name: "Englisch", accent: "#ff5c8a", teacherIds: ["keller"] },
  { id: "biologie", slug: "biologie", name: "Biologie", accent: "#1a8f4c", teacherIds: ["keller"] },
  { id: "chemie", slug: "chemie", name: "Chemie", accent: "#ff9f0a", teacherIds: ["weber"] },
  { id: "physik", slug: "physik", name: "Physik", accent: "#0071e3", teacherIds: ["weber"] },
  { id: "geschichte", slug: "geschichte", name: "Geschichte", accent: "#a2673f", teacherIds: ["schneider"] },
  { id: "geografie", slug: "geografie", name: "Geografie", accent: "#12a4a8", teacherIds: ["schneider"] },
  { id: "informatik", slug: "informatik", name: "Informatik", accent: "#5856d6", teacherIds: ["mueller"] },
  { id: "wirtschaft", slug: "wirtschaft", name: "Wirtschaft", accent: "#636366", teacherIds: ["mueller"] },
  { id: "sport", slug: "sport", name: "Sport", accent: "#ff3b30", teacherIds: [] },
];

export const topics: Topic[] = [
  { id: "physik-allgemein", subjectId: "physik", name: "Allgemein" },
  { id: "physik-mechanik-1", subjectId: "physik", name: "Mechanik I" },
  { id: "physik-schwingungen", subjectId: "physik", name: "Schwingungen und Wellen" },
  { id: "mathe-lineare-funktionen", subjectId: "mathematik", name: "Lineare Funktionen" },
  { id: "mathe-geometrie", subjectId: "mathematik", name: "Geometrie" },
  { id: "deutsch-grammatik", subjectId: "deutsch", name: "Grammatik" },
  { id: "deutsch-literatur", subjectId: "deutsch", name: "Literatur" },
  { id: "englisch-unit-6", subjectId: "englisch", name: "Unit 6" },
  { id: "bio-pflanzen", subjectId: "biologie", name: "Stoffwechsel der Pflanzen" },
  { id: "bio-zellbiologie", subjectId: "biologie", name: "Zellbiologie" },
];

export const materials: Material[] = [
  {
    id: "physik-kursuebersicht",
    title: "Physik 6J – Kursübersicht",
    description:
      "Übersicht über die Prüfungstermine, erlaubten Hilfsmittel und den Aufbau des Physikjahres.",
    fileName: "physik-6j-kursuebersicht.pdf",
    fileUrl: "/materials/physik/physik-6j-kursuebersicht.pdf",
    fileType: "pdf",
    fileSize: 12361545,
    subjectId: "physik",
    classIds: ["6j"],
    topicId: "physik-allgemein",
    teacherId: "weber",
    isImportant: true,
    status: "published",
    publishedAt: "2026-08-24T07:30:00",
    createdAt: "2026-08-24T07:30:00",
  },
  {
    id: "physik-mechanik-1",
    title: "Mechanik I",
    description:
      "Einführung in die Mechanik: Kräfte, einfache Maschinen und Statik im Überblick.",
    fileName: "mechanik-1.pdf",
    fileUrl: "/materials/physik/mechanik-1.pdf",
    fileType: "pdf",
    fileSize: 89045,
    subjectId: "physik",
    classIds: ["6j"],
    topicId: "physik-mechanik-1",
    teacherId: "weber",
    isImportant: false,
    status: "published",
    publishedAt: "2026-09-01T08:15:00",
    createdAt: "2026-09-01T08:15:00",
  },
  {
    id: "physik-was-ist-eine-kraft",
    title: "Was ist physikalische Kraft?",
    description:
      "Lernziele: Kraft als Grösse verstehen, Wirkungen einer Kraft kennen und als Vektor darstellen.",
    fileName: "was-ist-eine-kraft.pdf",
    fileUrl: "/materials/physik/was-ist-eine-kraft.pdf",
    fileType: "pdf",
    fileSize: 108741,
    subjectId: "physik",
    classIds: ["6j"],
    topicId: "physik-mechanik-1",
    teacherId: "weber",
    isImportant: false,
    status: "published",
    publishedAt: "2026-09-08T09:05:00",
    createdAt: "2026-09-08T09:05:00",
  },
  {
    id: "physik-physikalische-kraefte",
    title: "Physikalische Kräfte",
    description:
      "Gewichtskraft, Federkraft, Normalkraft und Reibungskraft – inkl. Kraft-Challenge zum Selbsttest.",
    fileName: "physikalische-kraefte.pdf",
    fileUrl: "/materials/physik/physikalische-kraefte.pdf",
    fileType: "pdf",
    fileSize: 123188,
    subjectId: "physik",
    classIds: ["6j"],
    topicId: "physik-mechanik-1",
    teacherId: "weber",
    isImportant: true,
    status: "published",
    publishedAt: "2026-09-09T07:50:00",
    createdAt: "2026-09-09T07:50:00",
  },
  {
    id: "physik-fadenpendel",
    title: "Das Fadenpendel",
    description:
      "Bewegungsgleichung und Schwingungsdauer des Fadenpendels herleiten, berechnen und messen.",
    fileName: "fadenpendel.pdf",
    fileUrl: "/materials/physik/fadenpendel.pdf",
    fileType: "pdf",
    fileSize: 114479,
    subjectId: "physik",
    classIds: ["6j"],
    topicId: "physik-schwingungen",
    teacherId: "weber",
    isImportant: false,
    status: "planned",
    plannedFor: "2026-11-10T08:00:00",
    createdAt: "2026-09-09T10:00:00",
  },
  {
    id: "mathe-lineare-funktionen",
    title: "Lineare Funktionen – Arbeitsblatt",
    description: "Steigung, y-Achsenabschnitt und Anwendungsaufgaben zu linearen Funktionen.",
    fileName: "lineare-funktionen-arbeitsblatt.pdf",
    fileUrl: "/materials/mathematik/lineare-funktionen-arbeitsblatt.pdf",
    fileType: "pdf",
    fileSize: 1719,
    subjectId: "mathematik",
    classIds: ["6j", "6a"],
    topicId: "mathe-lineare-funktionen",
    teacherId: "mueller",
    isImportant: false,
    status: "published",
    publishedAt: "2026-09-09T06:40:00",
    createdAt: "2026-09-09T06:40:00",
  },
  {
    id: "mathe-pruefungsvorbereitung",
    title: "Prüfungsvorbereitung Kapitel 4",
    description: "Zusammenfassung der wichtigsten Begriffe und Formen vor der Prüfung.",
    fileName: "pruefungsvorbereitung-kapitel-4.pdf",
    fileUrl: "/materials/mathematik/pruefungsvorbereitung-kapitel-4.pdf",
    fileType: "pdf",
    fileSize: 1625,
    subjectId: "mathematik",
    classIds: ["6j", "6a"],
    topicId: "mathe-lineare-funktionen",
    teacherId: "mueller",
    isImportant: true,
    status: "published",
    publishedAt: "2026-09-05T08:00:00",
    createdAt: "2026-09-05T08:00:00",
  },
  {
    id: "mathe-hausaufgabe-woche-12",
    title: "Hausaufgabe Woche 12",
    description: "Flächenberechnung, Dreieckskonstruktion und Kosinussatz.",
    fileName: "hausaufgabe-woche-12.pdf",
    fileUrl: "/materials/mathematik/hausaufgabe-woche-12.pdf",
    fileType: "pdf",
    fileSize: 1439,
    subjectId: "mathematik",
    classIds: ["6j"],
    topicId: "mathe-geometrie",
    teacherId: "mueller",
    isImportant: false,
    status: "published",
    publishedAt: "2026-08-28T08:00:00",
    createdAt: "2026-08-28T08:00:00",
  },
  {
    id: "deutsch-pruefungsvorbereitung",
    title: "Prüfungsvorbereitung Kapitel 4",
    description: "Aktiv/Passiv, Konjunktiv I in der indirekten Rede und Satzglieder.",
    fileName: "pruefungsvorbereitung-kapitel-4.pdf",
    fileUrl: "/materials/deutsch/pruefungsvorbereitung-kapitel-4.pdf",
    fileType: "pdf",
    fileSize: 1466,
    subjectId: "deutsch",
    classIds: ["6j", "6a"],
    topicId: "deutsch-grammatik",
    teacherId: "schneider",
    isImportant: true,
    status: "published",
    publishedAt: "2026-09-08T08:30:00",
    createdAt: "2026-09-08T08:30:00",
  },
  {
    id: "deutsch-interpretation",
    title: "Interpretation einer Kurzgeschichte",
    description: "Leitfaden zum Aufbau einer Interpretation inkl. Abgabetermin.",
    fileName: "interpretation-kurzgeschichte.pdf",
    fileUrl: "/materials/deutsch/interpretation-kurzgeschichte.pdf",
    fileType: "pdf",
    fileSize: 1528,
    subjectId: "deutsch",
    classIds: ["6j"],
    topicId: "deutsch-literatur",
    teacherId: "schneider",
    isImportant: false,
    status: "published",
    publishedAt: "2026-08-30T08:30:00",
    createdAt: "2026-08-30T08:30:00",
  },
  {
    id: "englisch-vokabelliste",
    title: "Vokabelliste Unit 6",
    description: "Wortschatz zu Achievement & Ambition inkl. Lernkontrolle am Freitag.",
    fileName: "vokabelliste-unit-6.pdf",
    fileUrl: "/materials/englisch/vokabelliste-unit-6.pdf",
    fileType: "pdf",
    fileSize: 1611,
    subjectId: "englisch",
    classIds: ["6j"],
    topicId: "englisch-unit-6",
    teacherId: "keller",
    isImportant: false,
    status: "published",
    publishedAt: "2026-09-07T08:30:00",
    createdAt: "2026-09-07T08:30:00",
  },
  {
    id: "englisch-reading",
    title: "Reading Comprehension Worksheet",
    description: "Leseverständnisfragen zum Klassenartikel über Ambition und Durchhaltevermögen.",
    fileName: "reading-comprehension-worksheet.pdf",
    fileUrl: "/materials/englisch/reading-comprehension-worksheet.pdf",
    fileType: "pdf",
    fileSize: 1499,
    subjectId: "englisch",
    classIds: ["6j"],
    topicId: "englisch-unit-6",
    teacherId: "keller",
    isImportant: false,
    status: "published",
    publishedAt: "2026-09-02T08:30:00",
    createdAt: "2026-09-02T08:30:00",
  },
  {
    id: "bio-photosynthese",
    title: "Photosynthese – Zusammenfassung",
    description: "Ablauf von Licht- und Dunkelreaktion sowie Bedeutung für Nahrungsketten.",
    fileName: "photosynthese-zusammenfassung.pdf",
    fileUrl: "/materials/biologie/photosynthese-zusammenfassung.pdf",
    fileType: "pdf",
    fileSize: 1687,
    subjectId: "biologie",
    classIds: ["6j"],
    topicId: "bio-pflanzen",
    teacherId: "keller",
    isImportant: false,
    status: "published",
    publishedAt: "2026-09-04T08:30:00",
    createdAt: "2026-09-04T08:30:00",
  },
  {
    id: "bio-zellaufbau",
    title: "Zellaufbau – Arbeitsblatt",
    description: "Zellbestandteile beschriften und tierische mit pflanzlichen Zellen vergleichen.",
    fileName: "zellaufbau-arbeitsblatt.pdf",
    fileUrl: "/materials/biologie/zellaufbau-arbeitsblatt.pdf",
    fileType: "pdf",
    fileSize: 1480,
    subjectId: "biologie",
    classIds: ["6j"],
    topicId: "bio-zellbiologie",
    teacherId: "keller",
    isImportant: false,
    status: "published",
    publishedAt: "2026-08-27T08:30:00",
    createdAt: "2026-08-27T08:30:00",
  },
];

export function getTeacher(id: string): Teacher | undefined {
  return teachers.find((t) => t.id === id);
}

export function getSubject(id: string): Subject | undefined {
  return subjects.find((s) => s.id === id);
}

export function getSubjectBySlug(slug: string): Subject | undefined {
  return subjects.find((s) => s.slug === slug);
}

export function getTopic(id: string): Topic | undefined {
  return topics.find((t) => t.id === id);
}

export function getMaterial(id: string): Material | undefined {
  return materials.find((m) => m.id === id);
}

export function getClass(id: string): SchoolClass | undefined {
  return classes.find((c) => c.id === id);
}

export function publishedMaterialsForClass(classId: string, pool: Material[] = materials): Material[] {
  return pool
    .filter((m) => m.status === "published" && m.classIds.includes(classId))
    .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""));
}

export function materialsForSubject(
  subjectId: string,
  classId?: string,
  pool: Material[] = materials
): Material[] {
  return pool
    .filter(
      (m) =>
        m.status === "published" &&
        m.subjectId === subjectId &&
        (!classId || m.classIds.includes(classId))
    )
    .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""));
}

export function materialsByTeacher(teacherId: string, pool: Material[] = materials): Material[] {
  return pool
    .filter((m) => m.teacherId === teacherId)
    .sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""));
}

export function newMaterialsSince(classId: string, days: number, pool: Material[] = materials): Material[] {
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
  return publishedMaterialsForClass(classId, pool).filter(
    (m) => m.publishedAt && new Date(m.publishedAt).getTime() >= cutoff
  );
}

export function newCountForSubject(
  subjectId: string,
  classId: string,
  days: number,
  pool: Material[] = materials
): number {
  return newMaterialsSince(classId, days, pool).filter((m) => m.subjectId === subjectId).length;
}

export function importantMaterialsForClass(classId: string, pool: Material[] = materials): Material[] {
  return publishedMaterialsForClass(classId, pool).filter((m) => m.isImportant);
}

export function plannedOrDraftByTeacher(teacherId: string, pool: Material[] = materials): Material[] {
  return pool.filter((m) => m.teacherId === teacherId && m.status !== "published");
}
