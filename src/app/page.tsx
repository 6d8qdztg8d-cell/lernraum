"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/cn";
import type { Role } from "@/lib/types";

export default function LoginPage() {
  const router = useRouter();
  const setRole = useAppStore((s) => s.setRole);

  const [role, setLocalRole] = useState<Role>("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const nextErrors: typeof errors = {};
    if (!email.trim()) nextErrors.email = "Bitte gib deine E-Mail-Adresse ein.";
    else if (!email.includes("@")) nextErrors.email = "Diese E-Mail-Adresse sieht nicht korrekt aus.";
    if (!password) nextErrors.password = "Bitte gib dein Passwort ein.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    setRole(role);
    window.setTimeout(() => {
      router.push("/start");
    }, 450);
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-[var(--background)] px-4 py-10">
      <div className="w-full max-w-[380px] animate-fade-in-up">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-5 flex size-14 items-center justify-center rounded-[18px] bg-[var(--accent)] text-white shadow-[var(--shadow-md)]">
            <GraduationCap className="size-7" strokeWidth={1.8} />
          </div>
          <h1 className="text-[22px] font-semibold tracking-tight text-[var(--text-primary)]">
            Willkommen zurück
          </h1>
          <p className="mt-1.5 text-[14px] text-[var(--text-secondary)]">
            Melde dich bei Lernraum an, um auf deine Unterrichtsmaterialien zuzugreifen.
          </p>
        </div>

        <div className="mb-5 grid grid-cols-2 gap-1 rounded-[var(--radius-md)] bg-black/[0.045] p-1">
          {(["student", "teacher"] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setLocalRole(option)}
              className={cn(
                "rounded-[9px] py-2 text-[13px] font-medium transition-all",
                role === option
                  ? "bg-[var(--surface)] text-[var(--text-primary)] shadow-[var(--shadow-sm)]"
                  : "text-[var(--text-secondary)]"
              )}
              aria-pressed={role === option}
            >
              {option === "student" ? "Schüler" : "Lehrperson"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <Input
            label="E-Mail-Adresse"
            type="email"
            autoComplete="email"
            placeholder="name@schule.ch"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            required
          />
          <Input
            label="Passwort"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            required
          />
          <Button type="submit" fullWidth size="lg" loading={loading}>
            Anmelden
          </Button>
        </form>

        <div className="mt-5 text-center">
          <button
            type="button"
            onClick={() =>
              useAppStore.getState().showToast("Wende dich an deine Schuladministration.", "info")
            }
            className="text-[13.5px] font-medium text-[var(--accent)] hover:text-[var(--accent-hover)]"
          >
            Passwort vergessen?
          </button>
        </div>
      </div>
    </div>
  );
}
