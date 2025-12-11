import * as IconsModule from "lucide-react";
import { type LucideIcon } from "lucide-react";

const Icons = IconsModule as unknown as Record<string, LucideIcon>;

export function getLucideIcon(name: string): LucideIcon | null {
  return Icons[name] ?? null;
}
