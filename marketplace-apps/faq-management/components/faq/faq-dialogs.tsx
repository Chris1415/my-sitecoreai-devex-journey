"use client";

import { FAQGroupDialog } from "@/components/faq-group-dialog";
import { FAQItemDialog } from "@/components/faq-item-dialog";
import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog";
import type { FAQGroup, FAQItem } from "@/types/faq";
import type { DeleteTarget } from "@/hooks/use-faq-dialogs";

interface FAQDialogsProps {
  // Group dialog
  groupDialogOpen: boolean;
  onGroupDialogOpenChange: (open: boolean) => void;
  selectedGroup: FAQGroup | null;
  onGroupSave: (data: { name: string }) => void;
  
  // Item dialog
  itemDialogOpen: boolean;
  onItemDialogOpenChange: (open: boolean) => void;
  selectedItem: FAQItem | null;
  onItemSave: (data: { question: string; answer: string }) => void;
  
  // Delete dialog
  deleteDialogOpen: boolean;
  onDeleteDialogOpenChange: (open: boolean) => void;
  deleteTarget: DeleteTarget | null;
  onDeleteConfirm: () => void;
}

export function FAQDialogs({
  groupDialogOpen,
  onGroupDialogOpenChange,
  selectedGroup,
  onGroupSave,
  itemDialogOpen,
  onItemDialogOpenChange,
  selectedItem,
  onItemSave,
  deleteDialogOpen,
  onDeleteDialogOpenChange,
  deleteTarget,
  onDeleteConfirm,
}: FAQDialogsProps) {
  return (
    <>
      <FAQGroupDialog
        open={groupDialogOpen}
        onOpenChange={onGroupDialogOpenChange}
        group={selectedGroup}
        onSave={onGroupSave}
      />

      <FAQItemDialog
        open={itemDialogOpen}
        onOpenChange={onItemDialogOpenChange}
        group={selectedGroup}
        item={selectedItem}
        onSave={onItemSave}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={onDeleteDialogOpenChange}
        type={deleteTarget?.type || "group"}
        onConfirm={onDeleteConfirm}
      />
    </>
  );
}

