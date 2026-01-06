"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Field } from "@/components/ui/field"
import type { FAQGroup, FAQItem } from "@/types/faq"

interface FAQItemDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  group: FAQGroup | null
  item: FAQItem | null
  onSave: (data: { question: string; answer: string }) => void
}

function FAQItemDialogContent({
  group,
  item,
  onSave,
  onOpenChange,
}: Omit<FAQItemDialogProps, "open">) {
  const [question, setQuestion] = useState(item?.question ?? "")
  const [answer, setAnswer] = useState(item?.answer ?? "")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!question.trim() || !answer.trim()) return
    onSave({ question, answer })
    setQuestion("")
    setAnswer("")
  }

  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>
          {item ? "Edit FAQ Item" : "Add FAQ Item"}
          {group && <span className="text-sm text-muted-foreground font-normal ml-2">in {group.name}</span>}
        </DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <div className="space-y-5 py-4">
          <Field>
            <Label htmlFor="question">Question *</Label>
            <Input
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter the FAQ question"
              required
            />
          </Field>
          <Field>
            <Label htmlFor="answer">Answer *</Label>
            <Textarea
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter the answer to this question"
              rows={6}
              required
            />
          </Field>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" className="text-white">
            {item ? "Save Changes" : "Add Item"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}

export function FAQItemDialog({ open, onOpenChange, group, item, onSave }: FAQItemDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {open && (
        <FAQItemDialogContent
          key={item?.id ?? "new"}
          group={group}
          item={item}
          onSave={onSave}
          onOpenChange={onOpenChange}
        />
      )}
    </Dialog>
  )
}
