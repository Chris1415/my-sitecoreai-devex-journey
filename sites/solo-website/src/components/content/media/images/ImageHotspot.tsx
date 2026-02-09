"use client";

import React, { JSX, useState } from "react";
import {
  Text,
  NextImage as ContentSdkImage,
  Field,
  ImageField,
} from "@sitecore-content-sdk/nextjs";
import { ComponentProps } from "lib/component-props";
import { Plus } from "lucide-react";

interface HotspotItem {
  id: string;
  x: number;
  y: number;
  tooltip: string;
  color: string;
}

/** Parsed Hotspots value: keys match field names (e.g. "Image", "MobileImage"). */
interface HotspotsByField {
  hotspotsByField?: Record<string, HotspotItem[]>;
}

interface Fields {
  Title: Field<string>;
  Image: ImageField;
  MobileImage?: ImageField;
  ImageAlt?: Field<string>;
  Hotspots?: Field<string>;
}

interface ImageOverlayFeatureParams {
  [key: string]: any; // eslint-disable-line
}

type ImageOverlayFeatureProps = ComponentProps & {
  fields: Fields;
  params?: ImageOverlayFeatureParams;
};

/**
 * Image Overlay Feature component for displaying images with interactive hotspots
 * @param {ImageOverlayFeatureProps} props - Component props from XM Cloud datasource
 * @returns {JSX.Element} The rendered image overlay feature component
 */
/** Y position threshold (0–100). When hotspot is at or below this %, tooltip is shown above. */
const TOOLTIP_ABOVE_THRESHOLD_Y = 70;

/** Validates and normalizes a CSS color string for safe use in inline styles */
function parseHotspotColor(value: string | undefined): string {
  if (!value || typeof value !== "string") return "#ffffff";
  const trimmed = value.trim();
  if (!trimmed) return "#ffffff";
  return trimmed;
}

export const Default = (props: ImageOverlayFeatureProps): JSX.Element => {
  const { fields, params } = props;
  const { styles, RenderingIdentifier: id } = params || {};
  const [activeHotspot, setActiveHotspot] = useState<{
    fieldKey: string;
    index: number;
  } | null>(null);

  const parsedHotspots: HotspotsByField = fields?.Hotspots?.value
    ? (JSON.parse(fields.Hotspots.value) as HotspotsByField)
    : {};

  const imageHotspots: HotspotItem[] =
    parsedHotspots?.hotspotsByField?.["Image"] ?? [];
  const mobileHotspots: HotspotItem[] =
    parsedHotspots?.hotspotsByField?.["MobileImage"] ?? [];

  if (!fields) {
    return (
      <section
        className={`relative component image-overlay-feature ${styles || ""}`}
        id={id}
      >
        <div className="max-w-[1840px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative aspect-16/10 md:aspect-16/7 overflow-hidden">
            <span className="is-empty-hint">Image Overlay Feature</span>
          </div>
        </div>
      </section>
    );
  }

  const imageAlt = fields.ImageAlt?.value || fields.Title?.value || "Image";

  const renderHotspots = (
    hotspots: HotspotItem[],
    fieldKey: string
  ): JSX.Element[] =>
    hotspots.map((hotspot: HotspotItem, index: number) => {
      const x = hotspot?.x ?? 0;
      const y = hotspot?.y ?? 0;
      const label = hotspot?.tooltip ?? "";
      const color = parseHotspotColor(hotspot?.color);
      const showTooltipAbove = y >= TOOLTIP_ABOVE_THRESHOLD_Y;
      const isActive =
        activeHotspot?.fieldKey === fieldKey && activeHotspot?.index === index;

      return (
        <div
          key={hotspot?.id ?? `${fieldKey}-${index}`}
          className="absolute"
          style={{ left: `${x}%`, top: `${y}%` }}
        >
          <button
            type="button"
            className="w-9 h-9 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all transform -translate-x-1/2 -translate-y-1/2"
            style={{ backgroundColor: color }}
            onClick={() =>
              setActiveHotspot(
                isActive ? null : { fieldKey, index }
              )
            }
            aria-label={label}
          >
            <Plus
              className="w-4 h-4 opacity-90"
              style={{ color: "#ffffff" }}
            />
          </button>

          {isActive && label && (
            <div
              className={`absolute left-6 z-10 bg-white/95 backdrop-blur-sm rounded shadow-lg
                px-2 py-1.5 min-w-[100px] max-w-[140px]
                md:px-4 md:py-3 md:min-w-[220px] md:max-w-[280px]
                ${showTooltipAbove ? "bottom-full mb-2" : "top-2"}`}
            >
              <p className="text-xs text-[#1A1F2B] leading-snug md:text-sm md:leading-relaxed">
                {label}
              </p>
            </div>
          )}
        </div>
      );
    });

  return (
    <section
      className={`relative component image-overlay-feature ${styles || ""}`}
      id={id}
    >
      <div className="max-w-[1840px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative aspect-16/10 md:aspect-16/7 overflow-hidden">
          {/* Desktop: Image + Image hotspots (md and up) */}
          {fields.Image && (
            <div className="absolute inset-0 hidden md:block">
              <ContentSdkImage
                field={fields.Image}
                alt={imageAlt}
                className="object-cover"
                fill
              />
              {renderHotspots(imageHotspots, "Image")}
            </div>
          )}

          {/* Mobile: MobileImage (or Image fallback) + corresponding hotspots */}
          {(fields.MobileImage ?? fields.Image) && (
            <div className="absolute inset-0 block md:hidden">
              <ContentSdkImage
                field={fields.MobileImage ?? fields.Image}
                alt={imageAlt}
                className="object-cover"
                fill
              />
              {renderHotspots(
                fields.MobileImage ? mobileHotspots : imageHotspots,
                fields.MobileImage ? "MobileImage" : "Image"
              )}
            </div>
          )}

          {/* Title overlay - lower left (on top of both layers) */}
          {fields.Title && (
            <div className="absolute left-0 bottom-0 p-6 md:p-10 lg:p-16 xl:p-20 z-1">
              <Text
                tag="h2"
                field={fields.Title}
                className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal text-white leading-tight [text-shadow:2px_2px_4px_rgba(0,0,0,0.8),0_0_8px_rgba(0,0,0,0.5)]"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
