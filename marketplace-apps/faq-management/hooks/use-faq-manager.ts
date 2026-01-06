"use client";

import { useState, useCallback } from "react";
import type { FAQGroup, FAQItem } from "@/types/faq";
import {
  getInitialFAQData,
  createGroup,
  createItem,
  downloadAsJSON,
  validateImportData,
  parseImportData,
} from "@/services/faq-service";

export interface UseFAQManagerReturn {
  // State
  groups: FAQGroup[];
  
  // Group operations
  addGroup: (name: string) => void;
  updateGroup: (groupId: string, name: string) => void;
  deleteGroup: (groupId: string) => void;
  toggleGroup: (groupId: string) => void;
  
  // Item operations
  addItem: (groupId: string, question: string, answer: string) => void;
  updateItem: (groupId: string, itemId: string, question: string, answer: string) => void;
  deleteItem: (groupId: string, itemId: string) => void;
  
  // Import/Export
  exportData: () => void;
  importData: (file: File) => Promise<{ success: boolean; error?: string }>;
  setGroups: React.Dispatch<React.SetStateAction<FAQGroup[]>>;
}

export function useFAQManager(): UseFAQManagerReturn {
  const [groups, setGroups] = useState<FAQGroup[]>(getInitialFAQData);

  // Group operations
  const addGroup = useCallback((name: string) => {
    const newGroup = createGroup(name);
    setGroups((prev) => [...prev, newGroup]);
  }, []);

  const updateGroup = useCallback((groupId: string, name: string) => {
    setGroups((prev) =>
      prev.map((g) => (g.id === groupId ? { ...g, name } : g))
    );
  }, []);

  const deleteGroup = useCallback((groupId: string) => {
    setGroups((prev) => prev.filter((g) => g.id !== groupId));
  }, []);

  const toggleGroup = useCallback((groupId: string) => {
    setGroups((prev) =>
      prev.map((g) =>
        g.id === groupId ? { ...g, expanded: !g.expanded } : g
      )
    );
  }, []);

  // Item operations
  const addItem = useCallback(
    (groupId: string, question: string, answer: string) => {
      setGroups((prev) =>
        prev.map((g) => {
          if (g.id === groupId) {
            const newItem = createItem(groupId, question, answer, g.items.length);
            return { ...g, items: [...g.items, newItem] };
          }
          return g;
        })
      );
    },
    []
  );

  const updateItem = useCallback(
    (groupId: string, itemId: string, question: string, answer: string) => {
      setGroups((prev) =>
        prev.map((g) => {
          if (g.id === groupId) {
            return {
              ...g,
              items: g.items.map((item) =>
                item.id === itemId ? { ...item, question, answer } : item
              ),
            };
          }
          return g;
        })
      );
    },
    []
  );

  const deleteItem = useCallback((groupId: string, itemId: string) => {
    setGroups((prev) =>
      prev.map((g) => {
        if (g.id === groupId) {
          return {
            ...g,
            items: g.items.filter((item) => item.id !== itemId),
          };
        }
        return g;
      })
    );
  }, []);

  // Import/Export operations
  const exportData = useCallback(() => {
    downloadAsJSON(groups);
  }, [groups]);

  const importData = useCallback(
    (file: File): Promise<{ success: boolean; error?: string }> => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        
        reader.onload = (e) => {
          try {
            const json = JSON.parse(e.target?.result as string);
            
            if (!validateImportData(json)) {
              resolve({
                success: false,
                error: "Invalid file format. Please check the structure of your JSON file.",
              });
              return;
            }

            const importedGroups = parseImportData(json);
            setGroups(importedGroups);
            resolve({ success: true });
          } catch {
            resolve({
              success: false,
              error: "Failed to parse file. Please ensure it's a valid JSON file.",
            });
          }
        };

        reader.onerror = () => {
          resolve({
            success: false,
            error: "Failed to read file.",
          });
        };

        reader.readAsText(file);
      });
    },
    []
  );

  return {
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
    setGroups,
  };
}

