"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { CheckCircle2, ChevronLeft, Plus, X } from "lucide-react";
import { UploadDropzone } from "@/components/upload/UploadDropzone";
import { UploadProgress, type UploadItem } from "@/components/upload/UploadProgress";
import { FileTypeIcon } from "@/components/materials/FileTypeIcon";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button, LinkButton } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { useAppStore } from "@/lib/store";
import { useAllTopics } from "@/lib/useMaterials";
import { subjects, classes, teachers, CURRENT_STUDENT } from "@/lib/data";
import { ACCEPTED_EXTENSIONS, MAX_FILE_SIZE, extensionOf, fileKindFromExtension, titleFromFileName } from "@/lib/file";
import { formatFileSize } from "@/lib/format";
import type { Material, MaterialStatus } from "@/lib/types";

type Step = "select" | "details" | "uploading" | "success";

const NEW_TOPIC_VALUE = "__new__";

export default function UploadPage() {
  const showToast = useAppStore((s) => s.showToast);
  const addUpload = useAppStore((s) => s.addUpload);
  const addCustomTopic = useAppStore((s) => s.addCustomTopic);
  const allTopics = useAllTopics();

  const [step, setStep] = useState<Step>("select");
  const [files, setFiles] = useState<File[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subjectId, setSubjectId] = useState(subjects[0]?.id ?? "");
  const [classIds, setClassIds] = useState<string[]>([CURRENT_STUDENT.classId]);
  const [topicId, setTopicId] = useState("");
  const [newTopicName, setNewTopicName] = useState("");
  const [isImportant, setIsImportant] = useState(false);
  const [schedule, setSchedule] = useState<"now" | "planned">("now");
  const [plannedFor, setPlannedFor] = useState(() => defaultPlannedDate());
  const [errors, setErrors] = useState<{ classIds?: string; topic?: string }>({});
  const [uploadItems, setUploadItems] = useState<UploadItem[]>([]);
  const timersRef = useRef<number[]>([]);

  const subjectTopics = allTopics.filter((t) => t.subjectId === subjectId);

  function handleIncomingFiles(incoming: File[]) {
    const accepted: File[] = [];
    const rejected: string[] = [];

    for (const file of incoming) {
      const ext = extensionOf(file.name);
      if (!ACCEPTED_EXTENSIONS.includes(ext)) {
        rejected.push(`${file.name} (Dateityp nicht unterstützt)`);
        continue;
      }
      if (file.size > MAX_FILE_SIZE) {
        rejected.push(`${file.name} (grösser als ${formatFileSize(MAX_FILE_SIZE)})`);
        continue;
      }
      accepted.push(file);
    }

    if (rejected.length > 0) {
      showToast(`${rejected.length} Datei${rejected.length > 1 ? "en" : ""} konnte(n) nicht hinzugefügt werden`, "error");
    }
    if (accepted.length === 0) return;

    setFiles(accepted);
    setTitle(accepted.length === 1 ? titleFromFileName(accepted[0].name) : "");
    setStep("details");
  }

  function removeFile(index: number) {
    const next = files.filter((_, i) => i !== index);
    setFiles(next);
    if (next.length === 0) {
      setStep("select");
    } else if (next.length === 1) {
      setTitle(titleFromFileName(next[0].name));
    }
  }

  function toggleClass(id: string) {
    setClassIds((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]));
  }

  function handleSubmit() {
    const nextErrors: typeof errors = {};
    if (classIds.length === 0) nextErrors.classIds = "Wähle mindestens eine Klasse aus.";
    if (topicId === NEW_TOPIC_VALUE && !newTopicName.trim())
      nextErrors.topic = "Bitte gib einen Namen für das neue Thema ein.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStep("uploading");
    const items: UploadItem[] = files.map((file) => ({ file, progress: 0, done: false }));
    setUploadItems(items);

    files.forEach((_, index) => {
      const duration = 900 + Math.random() * 700;
      const start = Date.now();
      const tick = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(100, (elapsed / duration) * 100);
        setUploadItems((prev) =>
          prev.map((it, i) => (i === index ? { ...it, progress, done: progress >= 100 } : it))
        );
        if (progress < 100) {
          const id = window.setTimeout(tick, 60);
          timersRef.current.push(id);
        } else if (index === files.length - 1) {
          window.setTimeout(finalizeUpload, 350);
        }
      };
      tick();
    });
  }

  function finalizeUpload() {
    let resolvedTopicId: string | undefined = topicId || undefined;
    if (topicId === NEW_TOPIC_VALUE) {
      const id = `topic-${subjectId}-${slugify(newTopicName)}`;
      addCustomTopic({ id, subjectId, name: newTopicName.trim() });
      resolvedTopicId = id;
    }

    const status: MaterialStatus = schedule === "planned" ? "planned" : "published";
    const nowIso = new Date().toISOString();

    files.forEach((file, index) => {
      const ext = extensionOf(file.name);
      const material: Material = {
        id: `upload-${Date.now()}-${index}-${Math.random().toString(36).slice(2, 7)}`,
        title: files.length === 1 ? title.trim() || titleFromFileName(file.name) : titleFromFileName(file.name),
        description: description.trim() || undefined,
        fileName: file.name,
        fileUrl: URL.createObjectURL(file),
        fileType: fileKindFromExtension(ext),
        fileSize: file.size,
        subjectId,
        classIds,
        topicId: resolvedTopicId,
        teacherId: teachers[0].id,
        isImportant,
        status,
        publishedAt: status === "published" ? nowIso : undefined,
        plannedFor: status === "planned" ? new Date(plannedFor).toISOString() : undefined,
        createdAt: nowIso,
      };
      addUpload(material);
    });

    setStep("success");
  }

  function resetAll() {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
    setStep("select");
    setFiles([]);
    setTitle("");
    setDescription("");
    setSubjectId(subjects[0]?.id ?? "");
    setClassIds([CURRENT_STUDENT.classId]);
    setTopicId("");
    setNewTopicName("");
    setIsImportant(false);
    setSchedule("now");
    setPlannedFor(defaultPlannedDate());
    setErrors({});
    setUploadItems([]);
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 pb-10">
      {step !== "success" && (
        <Link
          href="/materialien"
          className="inline-flex items-center gap-1 text-[14px] font-medium text-[var(--accent)] hover:text-[var(--accent-hover)]"
        >
          <ChevronLeft className="size-4" strokeWidth={2.2} />
          Materialien
        </Link>
      )}

      {step === "select" && (
        <>
          <Header title="Material hochladen" subtitle="Wähle eine oder mehrere Dateien aus, um sie deiner Klasse bereitzustellen." />
          <UploadDropzone onFiles={handleIncomingFiles} />
        </>
      )}

      {step === "details" && (
        <>
          <Header
            title={files.length === 1 ? "Material beschreiben" : `${files.length} Dateien beschreiben`}
            subtitle="Ordne die Datei einem Fach und einer Klasse zu, bevor du sie veröffentlichst."
          />

          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center gap-3 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5"
              >
                <FileTypeIcon type={fileKindFromExtension(extensionOf(file.name))} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13.5px] font-medium text-[var(--text-primary)]">{file.name}</p>
                  <p className="text-[12px] text-[var(--text-secondary)]">{formatFileSize(file.size)}</p>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  aria-label={`${file.name} entfernen`}
                  className="flex size-7 shrink-0 items-center justify-center rounded-full text-[var(--text-tertiary)] hover:bg-black/[0.06] hover:text-[var(--text-primary)]"
                >
                  <X className="size-3.5" />
                </button>
              </div>
            ))}
          </div>

          <div className="space-y-5 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-5">
            {files.length === 1 && (
              <Input label="Titel" value={title} onChange={(e) => setTitle(e.target.value)} required />
            )}

            <Textarea
              label="Beschreibung"
              placeholder="Optionale Beschreibung …"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Select
                label="Fach"
                value={subjectId}
                onChange={(e) => {
                  setSubjectId(e.target.value);
                  setTopicId("");
                }}
                required
              >
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </Select>

              <Select
                label="Ordner / Thema"
                value={topicId}
                onChange={(e) => setTopicId(e.target.value)}
                error={errors.topic}
                hint={topicId === NEW_TOPIC_VALUE ? undefined : "Optional"}
              >
                <option value="">Kein Thema</option>
                {subjectTopics.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
                <option value={NEW_TOPIC_VALUE}>+ Neues Thema erstellen</option>
              </Select>
            </div>

            {topicId === NEW_TOPIC_VALUE && (
              <Input
                label="Name des neuen Themas"
                value={newTopicName}
                onChange={(e) => setNewTopicName(e.target.value)}
                placeholder="z. B. Trigonometrie"
                autoFocus
              />
            )}

            <div>
              <p className="mb-2 text-[13px] font-medium text-[var(--text-primary)]">
                Klasse<span className="text-[var(--danger)]"> *</span>
              </p>
              <div className="flex flex-wrap gap-4">
                {classes.map((klass) => (
                  <Checkbox
                    key={klass.id}
                    label={`Klasse ${klass.name}`}
                    checked={classIds.includes(klass.id)}
                    onChange={() => toggleClass(klass.id)}
                  />
                ))}
              </div>
              {errors.classIds && <p className="mt-1.5 text-[13px] text-[var(--danger)]">{errors.classIds}</p>}
            </div>

            <div>
              <p className="mb-2 text-[13px] font-medium text-[var(--text-primary)]">Veröffentlichung</p>
              <div className="grid grid-cols-2 gap-1 rounded-[var(--radius-md)] bg-black/[0.045] p-1">
                {(["now", "planned"] as const).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setSchedule(option)}
                    className={cn(
                      "rounded-[9px] py-2 text-[13px] font-medium transition-all",
                      schedule === option
                        ? "bg-[var(--surface)] text-[var(--text-primary)] shadow-[var(--shadow-sm)]"
                        : "text-[var(--text-secondary)]"
                    )}
                  >
                    {option === "now" ? "Sofort veröffentlichen" : "Später planen"}
                  </button>
                ))}
              </div>
              {schedule === "planned" && (
                <Input
                  type="datetime-local"
                  className="mt-3"
                  value={plannedFor}
                  onChange={(e) => setPlannedFor(e.target.value)}
                />
              )}
            </div>

            <Checkbox
              label="Als wichtig markieren"
              description="Wird für Schüler besonders hervorgehoben."
              checked={isImportant}
              onChange={setIsImportant}
            />
          </div>

          <div className="flex items-center justify-end gap-3">
            <Button variant="secondary" onClick={resetAll}>
              Abbrechen
            </Button>
            <Button onClick={handleSubmit}>
              {schedule === "planned" ? "Planen" : "Veröffentlichen"}
            </Button>
          </div>
        </>
      )}

      {step === "uploading" && (
        <>
          <Header title="Wird hochgeladen …" subtitle="Bitte warte, während deine Datei(en) hochgeladen werden." />
          <UploadProgress items={uploadItems} />
        </>
      )}

      {step === "success" && (
        <div className="flex flex-col items-center gap-5 py-16 text-center animate-scale-in">
          <div className="flex size-16 items-center justify-center rounded-full bg-[var(--success-soft)]">
            <CheckCircle2 className="size-8 text-[var(--success)]" strokeWidth={1.8} />
          </div>
          <div>
            <h1 className="text-[20px] font-semibold text-[var(--text-primary)]">
              {schedule === "planned" ? "Material geplant" : "Material veröffentlicht"}
            </h1>
            <p className="mt-1.5 max-w-sm text-[14.5px] text-[var(--text-secondary)]">
              {files.length === 1 ? `„${title || files[0]?.name}“` : `${files.length} Materialien`} wurde
              {files.length === 1 ? "" : "n"} erfolgreich {schedule === "planned" ? "eingeplant" : "veröffentlicht"}.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" icon={<Plus className="size-4" strokeWidth={2} />} onClick={resetAll}>
              Weiteres Material hochladen
            </Button>
            <LinkButton href="/materialien">Zu den Materialien</LinkButton>
          </div>
        </div>
      )}
    </div>
  );
}

function Header({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <h1 className="text-[26px] font-bold tracking-tight text-[var(--text-primary)] sm:text-[30px]">{title}</h1>
      <p className="mt-1.5 text-[15px] text-[var(--text-secondary)]">{subtitle}</p>
    </div>
  );
}

function defaultPlannedDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  d.setHours(8, 0, 0, 0);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[äÄ]/g, "ae")
    .replace(/[öÖ]/g, "oe")
    .replace(/[üÜ]/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
