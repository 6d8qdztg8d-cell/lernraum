"use client";

import { useMemo } from "react";
import { useAppStore } from "./store";
import { materials as staticMaterials, topics as staticTopics } from "./data";
import type { Material, Topic } from "./types";

export function useAllMaterials(): Material[] {
  const uploads = useAppStore((s) => s.uploads);
  return useMemo(() => [...uploads, ...staticMaterials], [uploads]);
}

export function useAllTopics(): Topic[] {
  const customTopics = useAppStore((s) => s.customTopics);
  return useMemo(() => [...staticTopics, ...customTopics], [customTopics]);
}
