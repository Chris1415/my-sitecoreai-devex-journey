"use client";

import { useState, useCallback } from "react";
import type { FAQGroup, FAQItem } from "@/types/faq";

export interface DeleteTarget {
  type: "group" | "item";
  id: string;
  groupId?: string;
}

export interface UseFAQDialogsReturn {
  // Dialog states
  groupDialogOpen: boolean;
  itemDialogOpen: boolean;
  deleteDialogOpen: boolean;
  
  // Selected items
  selectedGroup: FAQGroup | null;
  selectedItem: FAQItem | null;
  deleteTarget: DeleteTarget | null;
  
  // Dialog controls
  openNewGroupDialog: () => void;
  openEditGroupDialog: (group: FAQGroup) => void;
  closeGroupDialog: () => void;
  
  openNewItemDialog: (group: FAQGroup) => void;
  openEditItemDialog: (group: FAQGroup, item: FAQItem) => void;
  closeItemDialog: () => void;
  
  openDeleteGroupDialog: (groupId: string) => void;
  openDeleteItemDialog: (groupId: string, itemId: string) => void;
  closeDeleteDialog: () => void;
  
  // Raw setters for dialog components
  setGroupDialogOpen: (open: boolean) => void;
  setItemDialogOpen: (open: boolean) => void;
  setDeleteDialogOpen: (open: boolean) => void;
}

export function useFAQDialogs(): UseFAQDialogsReturn {
  const [groupDialogOpen, setGroupDialogOpen] = useState(false);
  const [itemDialogOpen, setItemDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  const [selectedGroup, setSelectedGroup] = useState<FAQGroup | null>(null);
  const [selectedItem, setSelectedItem] = useState<FAQItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null);

  // Group dialog controls
  const openNewGroupDialog = useCallback(() => {
    setSelectedGroup(null);
    setGroupDialogOpen(true);
  }, []);

  const openEditGroupDialog = useCallback((group: FAQGroup) => {
    setSelectedGroup(group);
    setGroupDialogOpen(true);
  }, []);

  const closeGroupDialog = useCallback(() => {
    setGroupDialogOpen(false);
    setSelectedGroup(null);
  }, []);

  // Item dialog controls
  const openNewItemDialog = useCallback((group: FAQGroup) => {
    setSelectedGroup(group);
    setSelectedItem(null);
    setItemDialogOpen(true);
  }, []);

  const openEditItemDialog = useCallback((group: FAQGroup, item: FAQItem) => {
    setSelectedGroup(group);
    setSelectedItem(item);
    setItemDialogOpen(true);
  }, []);

  const closeItemDialog = useCallback(() => {
    setItemDialogOpen(false);
    setSelectedGroup(null);
    setSelectedItem(null);
  }, []);

  // Delete dialog controls
  const openDeleteGroupDialog = useCallback((groupId: string) => {
    setDeleteTarget({ type: "group", id: groupId });
    setDeleteDialogOpen(true);
  }, []);

  const openDeleteItemDialog = useCallback((groupId: string, itemId: string) => {
    setDeleteTarget({ type: "item", id: itemId, groupId });
    setDeleteDialogOpen(true);
  }, []);

  const closeDeleteDialog = useCallback(() => {
    setDeleteDialogOpen(false);
    setDeleteTarget(null);
  }, []);

  return {
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
  };
}

