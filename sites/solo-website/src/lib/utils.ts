import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function suppressResizeObserverErrors() {
  if (typeof window !== "undefined") {
    const errorHandler = (event: ErrorEvent) => {
      if (
        event.message.includes("ResizeObserver loop completed with undelivered notifications") ||
        event.message.includes("ResizeObserver loop limit exceeded")
      ) {
        event.stopImmediatePropagation()
        event.preventDefault()
      }
    }
    window.addEventListener("error", errorHandler)
  }
}
