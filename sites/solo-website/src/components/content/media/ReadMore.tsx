"use client";

import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import { cn } from "lib/utils";

type ReadMoreProps = {
  children: React.ReactNode;
  /**
   * Collapsed height for small/tablet layouts.
   * Keep it in sync with your typography scale.
   */
  collapsedClassName?: string;
  /**
   * Collapsed behavior for lg+ layouts (typically clip to media height).
   */
  collapsedLgClassName?: string;
  className?: string;
};

export function ReadMore({
  children,
  collapsedClassName =
    "max-md:max-h-36 max-md:overflow-hidden md:max-lg:max-h-44 md:max-lg:overflow-hidden lg:max-xl:max-h-52 lg:max-xl:overflow-hidden",
  collapsedLgClassName = "xl:max-h-full xl:overflow-hidden",
  className,
}: ReadMoreProps) {
  const uid = useId();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const collapsedClasses = useMemo(
    () => cn(collapsedClassName, collapsedLgClassName),
    [collapsedClassName, collapsedLgClassName]
  );

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const measure = () => {
      // Only measure overflow when collapsed.
      if (isExpanded) {
        setIsOverflowing(false);
        return;
      }
      // scrollHeight includes hidden content, clientHeight is visible height.
      setIsOverflowing(el.scrollHeight > el.clientHeight + 1);
    };

    measure();

    const ro = new ResizeObserver(() => measure());
    ro.observe(el);

    return () => {
      ro.disconnect();
    };
  }, [children, isExpanded]);

  return (
    <div className={cn("mt-4", className)}>
      <div className="relative">
        <div
          ref={contentRef}
          className={cn(
            "prose prose-neutral max-w-none dark:prose-invert prose-p:text-muted-foreground prose-a:text-primary",
            isExpanded ? "max-h-none overflow-visible" : collapsedClasses
          )}
        >
          {children}
        </div>

        {!isExpanded && isOverflowing && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-background to-transparent max-lg:block lg:block" />
        )}
      </div>

      {isOverflowing && (
        <button
          type="button"
          aria-controls={`readmore-${uid}`}
          aria-expanded={isExpanded}
          onClick={() => setIsExpanded((v) => !v)}
          className="mt-4 inline-flex select-none items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-2 text-sm font-semibold text-foreground shadow-sm backdrop-blur transition hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 max-lg:w-fit"
        >
          <span>{isExpanded ? "Read less" : "Read more"}</span>
        </button>
      )}
    </div>
  );
}

