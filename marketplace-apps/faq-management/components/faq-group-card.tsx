"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Plus, Edit2, Trash2, ChevronDown, MessageCircleQuestion } from "lucide-react"
import type { FAQGroup, FAQItem } from "@/types/faq"
import {
  Empty,
  EmptyMedia,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty"

interface FAQGroupCardProps {
  group: FAQGroup
  onToggle: () => void
  onEdit: () => void
  onDelete: () => void
  onAddItem: () => void
  onEditItem: (item: FAQItem) => void
  onDeleteItem: (item: FAQItem) => void
}

export function FAQGroupCard({
  group,
  onToggle,
  onEdit,
  onDelete,
  onAddItem,
  onEditItem,
  onDeleteItem,
}: FAQGroupCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl border-border/50 bg-card">
      <Collapsible open={group.expanded} onOpenChange={onToggle}>
        <CardHeader className="pt-8 pb-6 bg-linear-to-br from-slate-50 via-blue-50/30 to-slate-50 dark:from-slate-900 dark:via-blue-950/20 dark:to-slate-900 border-b border-border/50">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1 h-10 w-10 rounded-lg hover:bg-muted transition-all duration-200"
                >
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ${!group.expanded ? "-rotate-90" : ""}`}
                  />
                </Button>
              </CollapsibleTrigger>
              <div className="flex-1 pt-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-xl font-bold tracking-tight text-black dark:text-white">{group.name}</h2>
                  <Badge colorScheme="neutral" className="text-xs font-medium px-2.5 py-0.5">
                    {group.items.length} {group.items.length === 1 ? "item" : "items"}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <Button
                variant="ghost"
                size="sm"
                onClick={onAddItem}
                className="hover:bg-success/20 hover:text-success transition-all duration-200 hover:scale-105 rounded-lg"
              >
                <Plus className="w-4 h-4 mr-1.5" />
                Add Item
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onEdit}
                className="hover:bg-blue-100 hover:text-blue-600 transition-all duration-200 hover:scale-110 rounded-lg h-9 w-9 p-0"
              >
                <Edit2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onDelete}
                className="hover:bg-destructive/20 hover:text-destructive transition-all duration-200 hover:scale-110 rounded-lg h-9 w-9 p-0"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CollapsibleContent className="transition-all duration-300 ease-in-out">
          <CardContent className="p-0">
            {group.items.length === 0 ? (
              <div className="py-16 px-6">
                <Empty>
                  <EmptyMedia variant="icon">
                    <MessageCircleQuestion className="w-6 h-6" />
                  </EmptyMedia>
                  <EmptyHeader>
                    <EmptyTitle>No FAQ Items</EmptyTitle>
                    <EmptyDescription>
                      Add your first question and answer to this group
                    </EmptyDescription>
                  </EmptyHeader>
                  <EmptyContent>
                    <Button
                      onClick={onAddItem}
                      variant="outline"
                      size="sm"
                      className="shadow-md hover:scale-105 transition-all duration-200 bg-transparent"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add First Item
                    </Button>
                  </EmptyContent>
                </Empty>
              </div>
            ) : (
              <div className="divide-y divide-border/30">
                {group.items.map((item, index) => (
                  <div key={item.id} className="px-6 py-6 hover:bg-muted/30 transition-all duration-300 group/item">
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 w-8 h-8 rounded-lg bg-muted text-muted-foreground text-sm font-bold flex items-center justify-center mt-0.5">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-base mb-3 leading-snug text-balance">{item.question}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed text-pretty">{item.answer}</p>
                      </div>
                      <div className="flex items-center gap-1.5 opacity-0 group-hover/item:opacity-100 transition-all duration-300">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEditItem(item)}
                          className="hover:bg-blue-100 hover:text-blue-600 transition-all duration-200 h-9 w-9 p-0 rounded-lg"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDeleteItem(item)}
                          className="hover:bg-destructive/20 hover:text-destructive transition-all duration-200 h-9 w-9 p-0 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}
