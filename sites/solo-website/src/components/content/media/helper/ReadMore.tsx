"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { cn } from "lib/utils";

type ReadMoreProps = {
  children: React.ReactNode;
  /** Optional actions (e.g. CTA buttons) rendered on the same row as Read more */
  actions?: React.ReactNode;
  className?: string;
};

export function ReadMore({
  children,
  actions,
  className,
}: ReadMoreProps) {
  const uid = useId();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const measure = () => {
      if (isExpanded) return setIsOverflowing(false);
      setIsOverflowing(el.scrollHeight > el.clientHeight + 1);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [children, isExpanded]);

  const showActions = isOverflowing || actions;

  return (
    <div className={cn("space-y-3", className)}>
      <div className="relative">
        <div
          ref={contentRef}
          id={`readmore-${uid}`}
          className={cn(
            "prose prose-neutral max-w-none dark:prose-invert prose-p:text-muted-foreground prose-a:text-primary",
            isExpanded ? "max-h-none" : "max-h-40 overflow-hidden"
          )}
        >
          {children}
        </div>
        {!isExpanded && isOverflowing && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-linear-to-t from-background to-transparent" />
        )}
      </div>

      {showActions && (
        <div className="flex flex-nowrap items-center gap-2 md:gap-3">
          {isOverflowing && (
            <button
              type="button"
              aria-controls={`readmore-${uid}`}
              aria-expanded={isExpanded}
              onClick={() => setIsExpanded((v) => !v)}
              className="whitespace-nowrap rounded-full border border-border bg-background px-3 py-2 text-xs font-medium transition-colors hover:bg-muted/50"
            >
              {isExpanded ? "Read less" : "Read more"}
            </button>
          )}
          {actions}
        </div>
      )}
    </div>
  );
}
