"use client";

import { cn } from "lib/utils";
import { Plus } from "lucide-react";

export interface HotspotItem {
  id: string;
  x: number;
  y: number;
  tooltip: string;
  color: string;
}

export type MarkerSize = "sm" | "md" | "lg";
export type MarkerStyle =
  | "cross"
  | "circle"
  | "dot"
  | "ring"
  | "plus"
  | "square"
  | "square-outline";

export interface HotspotsPayload {
  marker?: { style?: string; size?: string };
  hotspotsByField?: Record<string, HotspotItem[]>;
}

/** Y threshold: tooltip shows above marker when y >= this */
const TOOLTIP_ABOVE_THRESHOLD_Y = 70;
/** X threshold: tooltip aligns left when x <= this */
const TOOLTIP_ALIGN_LEFT_THRESHOLD_X = 25;
/** X threshold: tooltip aligns right when x >= this */
const TOOLTIP_ALIGN_RIGHT_THRESHOLD_X = 75;
export const DEFAULT_HOTSPOT_COLOR = "#6e3fff";

const MARKER_SIZE_CLASSES: Record<MarkerSize, { box: string; icon: string; dot: string }> = {
  sm: { box: "w-6 h-6", icon: "w-3 h-3", dot: "w-3 h-3" },
  md: { box: "w-9 h-9", icon: "w-4 h-4", dot: "w-5 h-5" },
  lg: { box: "w-12 h-12", icon: "w-5 h-5", dot: "w-7 h-7" },
};

const VALID_STYLES: MarkerStyle[] = [
  "cross",
  "circle",
  "dot",
  "ring",
  "plus",
  "square",
  "square-outline",
];
const VALID_SIZES: MarkerSize[] = ["sm", "md", "lg"];

function parseHotspotColor(value: string | undefined): string {
  if (!value || typeof value !== "string") return DEFAULT_HOTSPOT_COLOR;
  const t = value.trim();
  return t || DEFAULT_HOTSPOT_COLOR;
}

export function normalizeMarkerStyle(style: string | undefined): MarkerStyle {
  const s = (style ?? "cross").trim().toLowerCase();
  return VALID_STYLES.includes(s as MarkerStyle) ? (s as MarkerStyle) : "cross";
}

export function normalizeMarkerSize(size: string | undefined): MarkerSize {
  const s = (size ?? "md").trim().toLowerCase();
  return VALID_SIZES.includes(s as MarkerSize) ? (s as MarkerSize) : "md";
}

const baseButtonClass = cn(
  "flex shrink-0 items-center justify-center shadow-lg",
  "transition-all duration-200 ease-out",
  "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background",
);
const selectedScaleClass = "scale-105";

function ariaLabel(tooltip: string, x: number, y: number): string {
  return tooltip ? `Hotspot: ${tooltip}` : `Hotspot at ${x}% from left, ${y}% from top`;
}

export interface HotspotPinProps {
  hotspot: HotspotItem;
  isActive: boolean;
  onClick: () => void;
  markerStyle: MarkerStyle;
  markerSize: MarkerSize;
}

/**
 * Renders a single hotspot pin: positioned marker button and optional tooltip.
 */
export function HotspotPin({
  hotspot,
  isActive,
  onClick,
  markerStyle,
  markerSize,
}: HotspotPinProps) {
  const x = hotspot?.x ?? 0;
  const y = hotspot?.y ?? 0;
  const label = hotspot?.tooltip ?? "";
  const sizeClasses = MARKER_SIZE_CLASSES[markerSize];
  const color = parseHotspotColor(hotspot?.color);
  const style = { backgroundColor: color, ...(isActive && { boxShadow: `0 0 0 2px ${color}` }) };
  const buttonAriaLabel = ariaLabel(label, x, y);
  const size = sizeClasses;
  const iconClsWhite = cn(size.icon, "pointer-events-none text-white");
  const iconClsColor = cn(size.icon, "pointer-events-none");

  const renderMarker = () => {
    const normalizedStyle = (markerStyle ?? "cross").trim().toLowerCase();

    const crossButton = (
      <button
        type="button"
        className={cn(
          baseButtonClass,
          size.box,
          "rounded-full",
          "hover:scale-110 hover:rotate-90 hover:brightness-110 active:scale-95",
          "duration-300",
          isActive && selectedScaleClass,
        )}
        style={style}
        aria-label={buttonAriaLabel}
        onClick={onClick}
      >
        <Plus className={iconClsWhite} />
      </button>
    );

    switch (normalizedStyle) {
      case "cross":
        return crossButton;
      case "circle":
        return (
          <button
            type="button"
            className={cn(
              baseButtonClass,
              size.box,
              "rounded-full",
              "hover:brightness-110 hover:saturate-125 hover:animate-hotspot-circle-spin-pulse active:scale-95",
              isActive && selectedScaleClass,
            )}
            style={style}
            aria-label={buttonAriaLabel}
            onClick={onClick}
          />
        );
      case "dot":
        return (
          <button
            type="button"
            className={cn(
              baseButtonClass,
              size.dot,
              "rounded-full",
              "hover:brightness-110 hover:animate-hotspot-dot-pulse active:scale-90",
              isActive && selectedScaleClass,
            )}
            style={style}
            aria-label={buttonAriaLabel}
            onClick={onClick}
          />
        );
      case "ring":
        return (
          <button
            type="button"
            className={cn(
              baseButtonClass,
              size.box,
              "rounded-full border-2 bg-white/90 dark:bg-black/20",
              "hover:scale-110 hover:animate-spin hover:opacity-100 active:scale-95",
              isActive && selectedScaleClass,
            )}
            style={{
              borderColor: color,
              ...(isActive && { boxShadow: `0 0 0 2px ${color}` }),
            }}
            aria-label={buttonAriaLabel}
            onClick={onClick}
          />
        );
      case "plus":
        return (
          <button
            type="button"
            className={cn(
              baseButtonClass,
              size.box,
              "rounded-full bg-transparent",
              "hover:scale-110 hover:rotate-90 hover:opacity-100 active:scale-95",
              isActive && selectedScaleClass,
            )}
            style={isActive ? { boxShadow: `0 0 0 2px ${color}` } : undefined}
            aria-label={buttonAriaLabel}
            onClick={onClick}
          >
            <span
              className="pointer-events-none"
              style={{
                filter:
                  "drop-shadow(0 0 1px rgba(0,0,0,0.8)) drop-shadow(0 0 2px rgba(255,255,255,0.5))",
              }}
            >
              <Plus className={iconClsColor} style={{ color }} strokeWidth={2.5} />
            </span>
          </button>
        );
      case "square":
        return (
          <button
            type="button"
            className={cn(
              baseButtonClass,
              size.box,
              "min-w-0 min-h-0 rounded-md",
              "hover:scale-110 hover:rotate-90 hover:brightness-110 active:scale-95",
              "duration-300",
              isActive && selectedScaleClass,
            )}
            style={style}
            aria-label={buttonAriaLabel}
            onClick={onClick}
          >
            <Plus className={iconClsWhite} />
          </button>
        );
      case "square-outline":
        return (
          <button
            type="button"
            className={cn(
              baseButtonClass,
              size.box,
              "min-w-0 min-h-0 rounded-md border-2 bg-transparent",
              "hover:scale-110 hover:rotate-90 hover:opacity-100 active:scale-95",
              "duration-300",
              isActive && selectedScaleClass,
            )}
            style={{
              borderColor: color,
              ...(isActive && { boxShadow: `0 0 0 2px ${color}` }),
            }}
            aria-label={buttonAriaLabel}
            onClick={onClick}
          >
            <Plus className={iconClsColor} style={{ color }} strokeWidth={2} />
          </button>
        );
      default:
        return crossButton;
    }
  };

  const tooltipClass = cn(
    "absolute bg-white/95 backdrop-blur-sm px-4 py-3 rounded shadow-lg min-w-[220px] max-w-[280px] z-10",
    y >= TOOLTIP_ABOVE_THRESHOLD_Y ? "bottom-full mb-1" : "top-full mt-1",
    x >= TOOLTIP_ALIGN_RIGHT_THRESHOLD_X && "right-0 left-auto translate-x-0",
    x <= TOOLTIP_ALIGN_LEFT_THRESHOLD_X && "left-0 right-auto translate-x-0",
    x > TOOLTIP_ALIGN_LEFT_THRESHOLD_X &&
      x < TOOLTIP_ALIGN_RIGHT_THRESHOLD_X &&
      "left-1/2 -translate-x-1/2",
  );

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      {renderMarker()}
      {isActive && label && (
        <div className={tooltipClass}>
          <p className="text-sm text-[#1A1F2B] leading-relaxed wrap-break-word">
            {label}
          </p>
        </div>
      )}
    </div>
  );
}
