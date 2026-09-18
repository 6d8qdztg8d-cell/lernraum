import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Material, Role, Topic } from "./types";

export interface Toast {
  id: string;
  message: string;
  tone: "success" | "info" | "error";
}

interface AppState {
  role: Role;
  setRole: (role: Role) => void;

  recentlyViewed: string[];
  markViewed: (materialId: string) => void;

  importantOverrides: Record<string, boolean>;
  toggleImportant: (materialId: string, base: boolean) => void;

  toasts: Toast[];
  showToast: (message: string, tone?: Toast["tone"]) => void;
  dismissToast: (id: string) => void;

  uploads: Material[];
  addUpload: (material: Material) => void;
  removeUpload: (id: string) => void;

  customTopics: Topic[];
  addCustomTopic: (topic: Topic) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      role: "student",
      setRole: (role) => set({ role }),

      recentlyViewed: [],
      markViewed: (materialId) =>
        set((state) => ({
          recentlyViewed: [
            materialId,
            ...state.recentlyViewed.filter((id) => id !== materialId),
          ].slice(0, 6),
        })),

      importantOverrides: {},
      toggleImportant: (materialId, base) =>
        set((state) => {
          const current = state.importantOverrides[materialId] ?? base;
          return {
            importantOverrides: { ...state.importantOverrides, [materialId]: !current },
          };
        }),

      toasts: [],
      showToast: (message, tone = "success") => {
        const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        set((state) => ({ toasts: [...state.toasts, { id, message, tone }] }));
        setTimeout(() => {
          get().dismissToast(id);
        }, 4000);
      },
      dismissToast: (id) =>
        set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),

      uploads: [],
      addUpload: (material) => set((state) => ({ uploads: [material, ...state.uploads] })),
      removeUpload: (id) =>
        set((state) => ({ uploads: state.uploads.filter((m) => m.id !== id) })),

      customTopics: [],
      addCustomTopic: (topic) => set((state) => ({ customTopics: [...state.customTopics, topic] })),
    }),
    {
      name: "lernraum-state",
      partialize: (state) => ({
        role: state.role,
        recentlyViewed: state.recentlyViewed,
        importantOverrides: state.importantOverrides,
      }),
    }
  )
);

export function isMaterialImportant(
  materialId: string,
  base: boolean,
  overrides: Record<string, boolean>
): boolean {
  return overrides[materialId] ?? base;
}
