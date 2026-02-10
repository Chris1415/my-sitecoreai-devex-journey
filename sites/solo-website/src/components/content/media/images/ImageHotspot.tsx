"use client";

import { useState } from "react";
import {
  Text,
  NextImage as ContentSdkImage,
  Field,
  ImageField,
} from "@sitecore-content-sdk/nextjs";
import { ComponentProps } from "lib/component-props";
import {
  type HotspotItem,
  type HotspotsPayload,
  normalizeMarkerStyle,
  normalizeMarkerSize,
  HotspotPin,
} from "./HotspotMarker";

interface Fields {
  Title: Field<string>;
  Image: ImageField;
  MobileImage?: ImageField;
  ImageAlt?: Field<string>;
  Hotspots?: Field<string>;
}

type ImageOverlayFeatureProps = ComponentProps & {
  fields: Fields;
  params?: { styles?: string; RenderingIdentifier?: string; [key: string]: unknown };
};

export function Default(props: ImageOverlayFeatureProps) {
  const { fields, params } = props;
  const { styles, RenderingIdentifier: id } = params || {};
  const [activeHotspot, setActiveHotspot] = useState<{
    fieldKey: string;
    index: number;
  } | null>(null);

  const parsed: HotspotsPayload = fields?.Hotspots?.value
    ? (JSON.parse(fields.Hotspots.value) as HotspotsPayload)
    : {};

  const markerStyle = normalizeMarkerStyle(parsed?.marker?.style);
  const markerSize = normalizeMarkerSize(parsed?.marker?.size);
  const imageHotspots: HotspotItem[] = parsed?.hotspotsByField?.["Image"] ?? [];
  const mobileHotspots: HotspotItem[] =
    parsed?.hotspotsByField?.["MobileImage"] ?? [];

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

  const renderHotspots = (hotspots: HotspotItem[], fieldKey: string) =>
    hotspots.map((hotspot, index) => {
      const isActive =
        activeHotspot?.fieldKey === fieldKey && activeHotspot?.index === index;
      return (
        <HotspotPin
          key={hotspot?.id ?? `${fieldKey}-${index}`}
          hotspot={hotspot}
          isActive={isActive}
          onClick={() =>
            setActiveHotspot(isActive ? null : { fieldKey, index })
          }
          markerStyle={markerStyle}
          markerSize={markerSize}
        />
      );
    });

  return (
    <section
      className={`relative component image-overlay-feature ${styles || ""}`}
      id={id}
    >
      <div className="max-w-[1840px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative aspect-16/10 md:aspect-16/7 overflow-hidden">
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
}
