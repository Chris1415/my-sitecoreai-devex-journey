import { Sparkles } from "lucide-react"

export function AIGeneratedBadge() {
  return (
    <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1 backdrop-blur-sm">
      <Sparkles className="h-3 w-3" />
      AI Generated
    </div>
  )
}
