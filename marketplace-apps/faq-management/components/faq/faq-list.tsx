"use client";

import { FAQGroupCard } from "@/components/faq-group-card";
import type { FAQGroup, FAQItem } from "@/types/faq";

interface FAQListProps {
  groups: FAQGroup[];
  onToggleGroup: (groupId: string) => void;
  onEditGroup: (group: FAQGroup) => void;
  onDeleteGroup: (groupId: string) => void;
  onAddItem: (group: FAQGroup) => void;
  onEditItem: (group: FAQGroup, item: FAQItem) => void;
  onDeleteItem: (groupId: string, itemId: string) => void;
}

export function FAQList({
  groups,
  onToggleGroup,
  onEditGroup,
  onDeleteGroup,
  onAddItem,
  onEditItem,
  onDeleteItem,
}: FAQListProps) {
  return (
    <div className="space-y-6">
      {groups.map((group, index) => (
        <div
          key={group.id}
          className="animate-in fade-in slide-in-from-bottom-4 duration-500"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <FAQGroupCard
            group={group}
            onToggle={() => onToggleGroup(group.id)}
            onEdit={() => onEditGroup(group)}
            onDelete={() => onDeleteGroup(group.id)}
            onAddItem={() => onAddItem(group)}
            onEditItem={(item) => onEditItem(group, item)}
            onDeleteItem={(item) => onDeleteItem(group.id, item.id)}
          />
        </div>
      ))}
    </div>
  );
}

