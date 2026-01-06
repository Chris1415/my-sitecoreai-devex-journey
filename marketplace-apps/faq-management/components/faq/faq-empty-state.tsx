"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, FolderOpen } from "lucide-react";
import {
  Empty,
  EmptyMedia,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty";

interface FAQEmptyStateProps {
  onCreateGroup: () => void;
}

export function FAQEmptyState({ onCreateGroup }: FAQEmptyStateProps) {
  return (
    <Card className="border-dashed border-2 hover:border-primary/50 transition-colors">
      <CardContent className="flex flex-col items-center justify-center py-20 px-4">
        <Empty>
          <EmptyMedia variant="icon">
            <FolderOpen className="w-6 h-6" />
          </EmptyMedia>
          <EmptyHeader>
            <EmptyTitle>No FAQ Groups Yet</EmptyTitle>
            <EmptyDescription>
              Create your first FAQ group to get started organizing your
              questions and answers
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button onClick={onCreateGroup} size="lg" className="shadow-lg">
              <Plus className="w-4 h-4 mr-2" />
              Create First Group
            </Button>
          </EmptyContent>
        </Empty>
      </CardContent>
    </Card>
  );
}

