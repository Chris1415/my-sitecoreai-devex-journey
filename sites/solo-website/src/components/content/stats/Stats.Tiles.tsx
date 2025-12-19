"use client";

import { useEffect, useRef, useState } from "react";
import { TrendingUp, LucideIcon } from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";
import {
  Page,
  RichTextField,
  Text,
  TextField,
} from "@sitecore-content-sdk/nextjs";
import { ComponentProps } from "lib/component-props";
import { getLucideIcon } from "lib/iconUtils";
import { Badge } from "components/ui/badge";
import { Divider } from "../text/Text.Divider";

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
  Icon: { jsonValue: TextField };
  Title: { jsonValue: TextField };
  Subtitle: { jsonValue: TextField };
  Tag: { jsonValue: TextField };
}

export interface StatsProps extends ComponentProps {
  fields: {
    data: {
      datasource: {
        Title: {
          jsonValue: TextField;
        };
        Subtitle: {
          jsonValue: TextField;
        };
        children: {
          results: StatElement[];
        };
      };
    };
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
  const titleValue = String(element.Title?.jsonValue?.value || "");
  const parsed = parseStatValue(titleValue);

  const countUp = useCountUp(parsed.isNumeric ? parsed.number : 0);
  const [IconComponent, setIconComponent] = useState<LucideIcon | null>(null);
  const iconValue = String(element.Icon?.jsonValue.value || "");

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
        {page.mode.isEditing && <Text field={element.Icon.jsonValue} />}

        {/* Value with count-up animation for numbers */}
        <div
          ref={parsed.isNumeric ? countUp.ref : undefined}
          className="relative z-10 mb-2 bg-linear-to-br from-foreground to-foreground/70 bg-clip-text text-4xl font-bold text-transparent tabular-nums md:text-xl lg:text-2xl xm:text-3xl xl:text-4xl"
        >
          {page.mode.isEditing ? (
            <Text field={element?.Title?.jsonValue} />
          ) : parsed.isNumeric ? (
            `${parsed.prefix}${countUp.count}${parsed.suffix}`
          ) : (
            parsed.originalValue
          )}
        </div>

        {/* Subtitle */}
        <div className="relative z-10 mb-2 text-sm text-muted-foreground">
          <Text field={element?.Subtitle?.jsonValue} />
        </div>

        {/* Tag/Badge */}
        {element.Tag?.jsonValue.value && (
          <Badge variant="secondary" className="text-xs">
            <Text field={element.Tag.jsonValue} />
          </Badge>
        )}
      </CardContent>
    </Card>
  );
}

export function Tiles({ fields, page, params }: StatsProps) {
  const datasource = fields?.data?.datasource;

  // Return early if no datasource
  if (!datasource) {
    if (page?.mode?.isEditing) {
      return <div>Please configure Stats datasource</div>;
    }
    return null;
  }

  const { Title, Subtitle, children } = datasource;
  const Elements = children?.results;

  // Return null if no elements
  if (!Elements || Elements.length === 0) {
    return <div>No Stat Elements</div>;
  }

  return (
    <div className={`border-b border-border py-8 ${params?.styles}`}>
      <div className="px-4 md:px-8 lg:px-12">
        <Divider
          fields={{
            Title: Title.jsonValue,
            Text: Subtitle.jsonValue as RichTextField,
          }}
        />

        {/* Stats Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Elements.map((element, index) => (
            <StatCard key={index} element={element} index={index} page={page} />
          ))}
        </div>
      </div>
    </div>
  );
}
