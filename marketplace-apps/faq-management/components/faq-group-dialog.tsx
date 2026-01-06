"use client"

import { Label } from "@/components/ui/label"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field } from "@/components/ui/field"
import type { FAQGroup } from "@/types/faq"

interface FAQGroupDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  group: FAQGroup | null
  onSave: (data: { name: string }) => void
}

function FAQGroupDialogContent({ group, onSave, onOpenChange }: Omit<FAQGroupDialogProps, "open">) {
  const [name, setName] = useState(group?.name ?? "")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    onSave({ name })
    setName("")
  }

  return (
    <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{group ? "Edit FAQ Group" : "Create FAQ Group"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-5 py-4">
            <Field>
              <Label htmlFor="name">Group Name *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., General Questions"
                required
              />
            </Field>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="text-white">
              {group ? "Save Changes" : "Create Group"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
  )
}

export function FAQGroupDialog({ open, onOpenChange, group, onSave }: FAQGroupDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {open && (
        <FAQGroupDialogContent
          key={group?.id ?? "new"}
          group={group}
          onSave={onSave}
          onOpenChange={onOpenChange}
        />
      )}
    </Dialog>
  )
}
