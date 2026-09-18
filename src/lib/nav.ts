import type { LucideIcon } from "lucide-react";
import { Home, FolderOpen, BookOpen, Star, Users, UploadCloud, Search, User } from "lucide-react";
import type { Role } from "./types";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const studentSidebar: NavItem[] = [
  { href: "/start", label: "Übersicht", icon: Home },
  { href: "/materialien", label: "Materialien", icon: FolderOpen },
  { href: "/faecher", label: "Fächer", icon: BookOpen },
  { href: "/wichtig", label: "Wichtig", icon: Star },
];

const studentMobile: NavItem[] = [
  { href: "/start", label: "Start", icon: Home },
  { href: "/materialien", label: "Materialien", icon: FolderOpen },
  { href: "/faecher", label: "Fächer", icon: BookOpen },
  { href: "/suche", label: "Suche", icon: Search },
  { href: "/profil", label: "Profil", icon: User },
];

const teacherSidebar: NavItem[] = [
  { href: "/start", label: "Übersicht", icon: Home },
  { href: "/materialien", label: "Meine Materialien", icon: FolderOpen },
  { href: "/klassen", label: "Klassen", icon: Users },
  { href: "/faecher", label: "Fächer", icon: BookOpen },
];

const teacherMobile: NavItem[] = [
  { href: "/start", label: "Start", icon: Home },
  { href: "/materialien", label: "Material", icon: FolderOpen },
  { href: "/upload", label: "Upload", icon: UploadCloud },
  { href: "/klassen", label: "Klassen", icon: Users },
  { href: "/profil", label: "Profil", icon: User },
];

export function getSidebarNav(role: Role): NavItem[] {
  return role === "teacher" ? teacherSidebar : studentSidebar;
}

export function getMobileNav(role: Role): NavItem[] {
  return role === "teacher" ? teacherMobile : studentMobile;
}
