"use client";

import { useEffect, useRef, useState } from "react";
import { TrendingUp, LucideIcon } from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";
import { Page, Text, TextField } from "@sitecore-content-sdk/nextjs";
import { ComponentProps } from "lib/component-props";
import { getLucideIcon } from "lib/iconUtils";
import { Badge } from "components/ui/badge";

function useCountUp(end: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setCount(end);
      return;
    }

    const steps = 60;
    const increment = end / steps;
    const stepDuration = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [end, duration, isVisible]);

  return { count, ref };
}

interface StatElement {
  fields: {
    Icon: TextField;
    Title: TextField;
    Subtitle: TextField;
    Tag: TextField;
  };
}

export interface StatsProps extends ComponentProps {
  fields: {
    Title: TextField;
    Subtitle: TextField;
    Elements: StatElement[];
  };
}

// Parse a stat value into its components
// Handles: "15+", "100%", "$50", "€100K", "5x", "Sitecore" (pure text)
interface ParsedValue {
  isNumeric: boolean;
  number: number;
  prefix: string;
  suffix: string;
  originalValue: string;
}

function parseStatValue(value: string): ParsedValue {
  const trimmed = value.trim();

  // Pattern: optional prefix (non-digits), number, optional suffix (non-digits)
  // Examples: "$100" → prefix="$", number=100, suffix=""
  //           "15+"  → prefix="", number=15, suffix="+"
  //           "100%" → prefix="", number=100, suffix="%"
  //           "5x"   → prefix="", number=5, suffix="x"
  //           "€50K" → prefix="€", number=50, suffix="K"
  const match = trimmed.match(/^([^\d]*?)([\d,.]+)([^\d]*)$/);

  if (match) {
    const prefix = match[1] || "";
    const numberStr = match[2].replace(/,/g, ""); // Remove commas from numbers like "1,000"
    const suffix = match[3] || "";
    const number = parseFloat(numberStr);

    if (!isNaN(number)) {
      return {
        isNumeric: true,
        number,
        prefix,
        suffix,
        originalValue: trimmed,
      };
    }
  }

  // Pure text (no number found or invalid number)
  return {
    isNumeric: false,
    number: 0,
    prefix: "",
    suffix: "",
    originalValue: trimmed,
  };
}

// Individual stat card component to use the hook properly
function StatCard({
  element,
  index,
  page,
}: {
  element: StatElement;
  index: number;
  page: Page;
}) {
  const titleValue = String(element.fields.Title?.value || "");
  const parsed = parseStatValue(titleValue);

  const countUp = useCountUp(parsed.isNumeric ? parsed.number : 0);
  const [IconComponent, setIconComponent] = useState<LucideIcon | null>(null);
  const iconValue = String(element.fields.Icon?.value || "");

  useEffect(() => {
    const icon = getLucideIcon(iconValue);
    setIconComponent(() => icon);
  }, [iconValue]);

  const FallbackIcon = TrendingUp;
  const Icon = IconComponent || FallbackIcon;

  return (
    <Card
      key={index}
      className="group relative overflow-hidden transition-shadow hover:shadow-lg"
    >
      <CardContent className="pt-6">
        {/* Decorative background circle */}
        <div className="absolute -mr-10 -mt-10 right-0 top-0 h-20 w-20 rounded-full bg-primary/5 transition-transform group-hover:scale-150" />

        {/* Icon */}
        <Icon
          className="relative z-10 mb-4 h-10 w-10 text-primary"
          aria-hidden="true"
        />

        {/* Value with count-up animation for numbers */}
        <div
          ref={parsed.isNumeric ? countUp.ref : undefined}
          className="relative z-10 mb-2 bg-linear-to-br from-foreground to-foreground/70 bg-clip-text text-4xl font-bold text-transparent tabular-nums"
        >
          {page.mode.isEditing ? (
            <Text field={element.fields.Title} />
          ) : parsed.isNumeric ? (
            `${parsed.prefix}${countUp.count}${parsed.suffix}`
          ) : (
            parsed.originalValue
          )}
        </div>

        {/* Subtitle */}
        <div className="relative z-10 mb-2 text-sm text-muted-foreground">
          <Text field={element.fields.Subtitle} />
        </div>

        {/* Tag/Badge */}
        {element.fields.Tag?.value && (
          <Badge variant="secondary" className="text-xs">
            <Text field={element.fields.Tag} />
          </Badge>
        )}
      </CardContent>
    </Card>
  );
}

export function Tiles({ fields, page }: StatsProps) {
  // Return null if no elements
  if (!fields?.Elements || fields.Elements.length === 0) {
    return null;
  }

  return (
    <section className="border-b border-border bg-linear-to-br from-muted/30 to-muted/10 py-16">
      <div className="px-4 md:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold">
            <Text field={fields.Title} />
          </h2>
          <p className="text-muted-foreground">
            <Text field={fields.Subtitle} />
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {fields.Elements.map((element, index) => (
            <StatCard key={index} element={element} index={index} page={page} />
          ))}
        </div>
      </div>
    </section>
  );
}
