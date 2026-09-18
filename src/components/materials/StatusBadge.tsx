import { Badge } from "@/components/ui/Badge";
import type { MaterialStatus } from "@/lib/types";

export function NewBadge() {
  return <Badge tone="accent">Neu</Badge>;
}

export function ImportantBadge() {
  return <Badge tone="warning">Wichtig</Badge>;
}

export function StatusBadge({ status }: { status: MaterialStatus }) {
  if (status === "draft") return <Badge tone="neutral">Entwurf</Badge>;
  if (status === "planned") return <Badge tone="accent">Geplant</Badge>;
  return null;
}
