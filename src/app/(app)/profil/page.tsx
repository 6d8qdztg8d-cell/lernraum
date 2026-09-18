"use client";

import { useState } from "react";
import { KeyRound } from "lucide-react";
import { Switch } from "@/components/ui/Switch";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { useAppStore } from "@/lib/store";
import { CURRENT_STUDENT, teachers, classes } from "@/lib/data";
import { cn } from "@/lib/cn";

export default function ProfilPage() {
  const role = useAppStore((s) => s.role);
  const showToast = useAppStore((s) => s.showToast);

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [importantOnly, setImportantOnly] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [appearance, setAppearance] = useState<"light" | "dark" | "system">("light");

  const teacher = teachers[0];
  const klass = classes.find((c) => c.id === CURRENT_STUDENT.classId);

  const name = role === "teacher" ? teacher.name : CURRENT_STUDENT.name;
  const initials =
    role === "teacher"
      ? teacher.initials
      : CURRENT_STUDENT.name.split(" ").map((p) => p[0]).join("").toUpperCase();
  const email =
    role === "teacher"
      ? `${teacher.name.split(" ").pop()?.toLowerCase()}@schule.ch`
      : `${CURRENT_STUDENT.name.toLowerCase()}@schule.ch`;

  return (
    <div className="max-w-xl space-y-8 pb-6">
      <div>
        <h1 className="text-[28px] font-bold tracking-tight text-[var(--text-primary)] sm:text-[32px]">
          Profil
        </h1>
        <p className="mt-1.5 text-[15px] text-[var(--text-secondary)]">
          Deine Kontoinformationen und Einstellungen.
        </p>
      </div>

      <div className="flex items-center gap-4 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-sm)]">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[17px] font-semibold text-[var(--accent)]">
          {initials}
        </div>
        <div className="min-w-0">
          <p className="text-[16px] font-semibold text-[var(--text-primary)]">{name}</p>
          <p className="text-[13.5px] text-[var(--text-secondary)]">
            {role === "teacher" ? "Lehrperson" : `Schüler · Klasse ${klass?.name}`}
          </p>
          <p className="mt-0.5 text-[13.5px] text-[var(--text-tertiary)]">{email}</p>
        </div>
      </div>

      <SettingsSection title="Konto">
        <SettingsRow
          label="Passwort"
          description="Zuletzt geändert vor 3 Monaten"
          action={
            <Button variant="secondary" size="sm" icon={<KeyRound className="size-3.5" strokeWidth={2} />} onClick={() => setPasswordModalOpen(true)}>
              Ändern
            </Button>
          }
        />
      </SettingsSection>

      <SettingsSection title="Benachrichtigungen">
        <SettingsRow
          label="Neue Materialien"
          description="E-Mail, sobald neues Material veröffentlicht wird"
          action={
            <Switch
              checked={emailNotifications}
              onChange={(v) => {
                setEmailNotifications(v);
                showToast("Änderungen gespeichert");
              }}
              label="Benachrichtigungen bei neuen Materialien"
            />
          }
        />
        <SettingsRow
          label="Nur wichtige Ankündigungen"
          description="Reduziert die Anzahl der Benachrichtigungen"
          action={
            <Switch
              checked={importantOnly}
              onChange={(v) => {
                setImportantOnly(v);
                showToast("Änderungen gespeichert");
              }}
              label="Nur wichtige Ankündigungen"
            />
          }
        />
      </SettingsSection>

      <SettingsSection title="Erscheinungsbild">
        <div className="grid grid-cols-3 gap-2 px-5 py-4">
          {(["light", "dark", "system"] as const).map((option) => (
            <button
              key={option}
              disabled={option !== "light"}
              onClick={() => setAppearance(option)}
              className={cn(
                "rounded-[var(--radius-md)] border py-2.5 text-[13px] font-medium transition-colors",
                appearance === option
                  ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]"
                  : "border-[var(--border)] text-[var(--text-secondary)]",
                option !== "light" && "cursor-not-allowed opacity-40"
              )}
            >
              {option === "light" ? "Hell" : option === "dark" ? "Dunkel" : "System"}
              {option !== "light" && <span className="ml-1 text-[10.5px]">(bald)</span>}
            </button>
          ))}
        </div>
      </SettingsSection>

      <Modal
        open={passwordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
        title="Passwort ändern"
      >
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setPasswordModalOpen(false);
            showToast("Passwort-Änderung ist in dieser Vorschau nicht verfügbar", "info");
          }}
        >
          <Input label="Neues Passwort" type="password" required autoComplete="new-password" />
          <Input label="Neues Passwort bestätigen" type="password" required autoComplete="new-password" />
          <div className="flex justify-end gap-2.5 pt-2">
            <Button type="button" variant="secondary" onClick={() => setPasswordModalOpen(false)}>
              Abbrechen
            </Button>
            <Button type="submit">Speichern</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

function SettingsSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-2 text-[13px] font-semibold text-[var(--text-secondary)]">{title}</h2>
      <div className="overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-sm)]">
        <div className="divide-y divide-[var(--divider)]">{children}</div>
      </div>
    </div>
  );
}

function SettingsRow({
  label,
  description,
  action,
}: {
  label: string;
  description?: string;
  action: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-4">
      <div className="min-w-0">
        <p className="text-[14.5px] font-medium text-[var(--text-primary)]">{label}</p>
        {description && <p className="mt-0.5 text-[13px] text-[var(--text-secondary)]">{description}</p>}
      </div>
      {action}
    </div>
  );
}
