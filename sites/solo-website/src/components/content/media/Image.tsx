import React, { JSX } from "react";
import {
  Image as SdkImage,
  type ImageField,
} from "@sitecore-content-sdk/nextjs";
import { ComponentProps } from "lib/component-props";
import { cn, isDesignView } from "lib/utils";

export interface ImageProps extends ComponentProps {
  fields: {
    Image: ImageField;
  };
}

function DesignViewFallback({ styles }: { styles?: string }) {
  return (
    <div
      className={cn(
        "relative w-full basis-full aspect-video overflow-hidden rounded-2xl border bg-linear-to-br from-muted/50 to-muted",
        styles
      )}
    >
      <div className="absolute inset-0 grid place-items-center">
        <div className="rounded-full border bg-background/70 px-4 py-2 text-sm text-muted-foreground backdrop-blur">
          Image (design preview)
        </div>
      </div>
    </div>
  );
}

export function Default({
  fields,
  params,
  page,
}: ImageProps): JSX.Element | null {
  if (isDesignView(page)) {
    return <DesignViewFallback styles={params?.styles} />;
  }

  const image = fields?.Image;
  const hasImage = Boolean(image?.value);

  if (!hasImage && !page?.mode?.isEditing) {
    return null;
  }

  return (
    <div
      className={cn(
        "relative w-full basis-full aspect-video overflow-hidden rounded-2xl border bg-muted",
        params?.styles
      )}
    >
      {hasImage ? (
        <SdkImage field={image} fill={"true"} className="object-fill" />
      ) : (
        <div className="absolute inset-0 grid place-items-center text-sm text-muted-foreground">
          Select an image
        </div>
      )}
    </div>
  );
}
