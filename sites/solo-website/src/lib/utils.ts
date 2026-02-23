import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Page } from "@sitecore-content-sdk/nextjs"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Checks if the page is being viewed in design mode (Partial-Designs or Page-Designs)
 * @param {Page} page - The Sitecore page object
 * @returns {boolean} True if the page is in design view, false otherwise
 */
export function isDesignView(page: Page | undefined): boolean {
  if (!page?.layout?.sitecore?.context?.itemPath) {
    return false
  }
  const itemPath = page.layout.sitecore.context.itemPath
  return (
    itemPath.includes("Partial-Designs") || itemPath.includes("Page-Designs")
  )
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
