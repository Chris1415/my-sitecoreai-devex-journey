"use client";

import { useState } from "react";
import Image from "next/image";
import { HelpCircle, Eye, EyeOff } from "lucide-react";

export function PreviewToggle() {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setShowPreview(!showPreview)}
      className="w-full bg-linear-to-br from-violet-50 via-teal-50/50 to-amber-50 dark:from-violet-950/20 dark:via-teal-950/20 dark:to-amber-950/20 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 aspect-video flex items-center justify-center relative group cursor-pointer transition-all duration-300 hover:border-violet-300 dark:hover:border-violet-600 hover:shadow-md"
    >
      {showPreview ? (
        <Image
          src="/FullPageThumbnail.png"
          alt="FAQ Manager Interface Preview"
          fill
          className="object-cover object-top"
        />
      ) : (
        <div className="text-center p-10">
          <HelpCircle className="w-20 h-20 text-violet-400 mx-auto mb-6 opacity-60" />
          <p className="text-lg text-muted-foreground">
            FAQ Manager Interface Preview
          </p>
        </div>
      )}

      {/* Toggle indicator overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 dark:group-hover:bg-white/5 transition-colors duration-200 flex items-center justify-center">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white dark:bg-slate-800 rounded-full p-3 shadow-lg">
          {showPreview ? (
            <EyeOff className="w-6 h-6 text-slate-600 dark:text-slate-300" />
          ) : (
            <Eye className="w-6 h-6 text-violet-500" />
          )}
        </div>
      </div>

      {/* Click hint */}
      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <span className="text-xs text-slate-500 dark:text-slate-400 bg-white/80 dark:bg-slate-800/80 px-2 py-1 rounded">
          {showPreview ? "Click to hide preview" : "Click to show preview"}
        </span>
      </div>
    </button>
  );
}

