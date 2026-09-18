"use client";

import { useAppStore } from "@/lib/store";
import { StudentDashboard } from "@/components/dashboard/StudentDashboard";
import { TeacherDashboard } from "@/components/dashboard/TeacherDashboard";

export default function StartPage() {
  const role = useAppStore((s) => s.role);
  return role === "teacher" ? <TeacherDashboard /> : <StudentDashboard />;
}
