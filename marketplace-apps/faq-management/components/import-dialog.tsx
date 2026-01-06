"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, FileJson, CheckCircle2, AlertCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface ImportDialogProps {
  onImport: (file: File) => void
}

export function ImportDialog({ onImport }: ImportDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      onImport(file)
      setIsOpen(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.type === "application/json") {
        onImport(file)
        setIsOpen(false)
      }
    }
  }

  const exampleStructure = {
    name: "Getting Started",
    faqs: [
      {
        question: "What is this product?",
        answer: "This is a comprehensive FAQ management system.",
      },
      {
        question: "How do I get started?",
        answer: "Simply create a new FAQ group and add questions.",
      },
    ],
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="default"
          className="shadow-sm hover:shadow-md transition-all duration-200 bg-gradient-to-r from-background to-muted/30 hover:from-muted/50 hover:to-muted/40 border-border/60"
        >
          <Upload className="w-4 h-4 mr-2" />
          Import
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <FileJson className="w-5 h-5 text-blue-500" />
            Import FAQ Data
          </DialogTitle>
          <DialogDescription className="text-base">
            Upload a JSON file with your FAQ groups and items. The file will replace all existing data.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Upload Area */}
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 transition-all duration-200 ${
              dragActive
                ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20"
                : "border-border hover:border-blue-400 bg-muted/20"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-lg font-semibold mb-1">Drop your JSON file here</p>
                <p className="text-sm text-muted-foreground">or click the button below to browse</p>
              </div>
              <Button
                onClick={() => fileInputRef.current?.click()}
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-md hover:shadow-lg transition-all duration-200"
              >
                <FileJson className="w-4 h-4 mr-2" />
                Choose File
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileChange}
                className="hidden"
                aria-label="Upload FAQ JSON file"
              />
            </div>
          </div>

          {/* Expected Structure */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-500" />
              <h3 className="font-semibold text-sm">Expected JSON Structure</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Your JSON file should be an array of FAQ group objects with the following structure:
            </p>
            <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-xs text-slate-100 font-mono">{JSON.stringify([exampleStructure], null, 2)}</pre>
            </div>
            <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div className="space-y-2 text-sm">
                  <p className="font-medium text-blue-900 dark:text-blue-100">Required fields:</p>
                  <ul className="space-y-1 text-blue-800 dark:text-blue-200">
                    <li>
                      <code className="bg-blue-100 dark:bg-blue-900 px-1.5 py-0.5 rounded">name</code> - The FAQ group
                      name
                    </li>
                    <li>
                      <code className="bg-blue-100 dark:bg-blue-900 px-1.5 py-0.5 rounded">faqs</code> - Array of FAQ
                      items
                    </li>
                    <li>
                      <code className="bg-blue-100 dark:bg-blue-900 px-1.5 py-0.5 rounded">question</code> - The
                      question text
                    </li>
                    <li>
                      <code className="bg-blue-100 dark:bg-blue-900 px-1.5 py-0.5 rounded">answer</code> - The answer
                      text
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
