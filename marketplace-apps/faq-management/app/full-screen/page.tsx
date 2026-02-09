"use client";

import {
  FAQHeader,
  FAQEmptyState,
  FAQList,
  FAQDialogs,
} from "@/components/faq";
import { useFAQManager } from "@/hooks/use-faq-manager";
import { useFAQDialogs } from "@/hooks/use-faq-dialogs";

export default function FAQManagement() {
  // FAQ data and operations
  const {
    groups,
    addGroup,
    updateGroup,
    deleteGroup,
    toggleGroup,
    addItem,
    updateItem,
    deleteItem,
    exportData,
    importData,
  } = useFAQManager();

  // Dialog state management
  const {
    groupDialogOpen,
    itemDialogOpen,
    deleteDialogOpen,
    selectedGroup,
    selectedItem,
    deleteTarget,
    openNewGroupDialog,
    openEditGroupDialog,
    closeGroupDialog,
    openNewItemDialog,
    openEditItemDialog,
    closeItemDialog,
    openDeleteGroupDialog,
    openDeleteItemDialog,
    closeDeleteDialog,
    setGroupDialogOpen,
    setItemDialogOpen,
    setDeleteDialogOpen,
  } = useFAQDialogs();

  // Handlers that bridge hooks together
  const handleGroupSave = (data: { name: string }) => {
    if (selectedGroup) {
      updateGroup(selectedGroup.id, data.name);
    } else {
      addGroup(data.name);
    }
    closeGroupDialog();
  };

  const handleItemSave = (data: { question: string; answer: string }) => {
    if (!selectedGroup) return;
    if (selectedItem) {
      updateItem(selectedGroup.id, selectedItem.id, data.question, data.answer);
    } else {
      addItem(selectedGroup.id, data.question, data.answer);
    }
    closeItemDialog();
  };

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    if (deleteTarget.type === "group") {
      deleteGroup(deleteTarget.id);
    } else if (deleteTarget.groupId) {
      deleteItem(deleteTarget.groupId, deleteTarget.id);
    }
    closeDeleteDialog();
  };

  const handleImport = async (file: File) => {
    const result = await importData(file);
    if (!result.success && result.error) {
      alert(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-muted/30 to-accent/10">
      <FAQHeader
        onExport={exportData}
        onImport={handleImport}
        onNewGroup={openNewGroupDialog}
        canExport={groups.length > 0}
      />

      <main className="container max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {groups.length === 0 ? (
          <FAQEmptyState onCreateGroup={openNewGroupDialog} />
        ) : (
          <FAQList
            groups={groups}
            onToggleGroup={toggleGroup}
            onEditGroup={openEditGroupDialog}
            onDeleteGroup={openDeleteGroupDialog}
            onAddItem={openNewItemDialog}
            onEditItem={openEditItemDialog}
            onDeleteItem={openDeleteItemDialog}
          />
        )}
      </main>

      <FAQDialogs
        groupDialogOpen={groupDialogOpen}
        onGroupDialogOpenChange={setGroupDialogOpen}
        selectedGroup={selectedGroup}
        onGroupSave={handleGroupSave}
        itemDialogOpen={itemDialogOpen}
        onItemDialogOpenChange={setItemDialogOpen}
        selectedItem={selectedItem}
        onItemSave={handleItemSave}
        deleteDialogOpen={deleteDialogOpen}
        onDeleteDialogOpenChange={setDeleteDialogOpen}
        deleteTarget={deleteTarget}
        onDeleteConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
