import React, { JSX } from "react";
import { Text, type TextField } from "@sitecore-content-sdk/nextjs";
import { ComponentProps } from "lib/component-props";
import { cn, isDesignView } from "lib/utils";

export interface YoutubeProps extends ComponentProps {
  fields: {
    VideoUrl: TextField;
  };
}

function getYouTubeVideoId(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  // Accept raw video id as a convenience
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;

  try {
    const url = new URL(trimmed);
    const host = url.hostname.replace(/^www\./, "");

    // youtu.be/<id>
    if (host === "youtu.be") {
      const id = url.pathname.split("/").filter(Boolean)[0];
      return id && id.length >= 11 ? id : null;
    }

    // youtube.com/watch?v=<id>
    if (host === "youtube.com" || host === "m.youtube.com") {
      const v = url.searchParams.get("v");
      if (v) return v;

      // /embed/<id>, /shorts/<id>
      const parts = url.pathname.split("/").filter(Boolean);
      const marker = parts[0];
      if ((marker === "embed" || marker === "shorts") && parts[1]) {
        return parts[1];
      }
    }

    return null;
  } catch {
    return null;
  }
}

function DesignViewFallback({ styles }: { styles?: string }) {
  return (
    <div
      className={cn(
        "relative aspect-video overflow-hidden rounded-2xl border bg-linear-to-br from-muted/50 to-muted",
        styles
      )}
    >
      <div className="absolute inset-0 grid place-items-center">
        <div className="rounded-full border bg-background/70 px-4 py-2 text-sm text-muted-foreground backdrop-blur">
          YouTube (design preview)
        </div>
      </div>
    </div>
  );
}

export function Default({
  fields,
  params,
  page,
}: YoutubeProps): JSX.Element | null {
  if (isDesignView(page)) {
    return <DesignViewFallback styles={params?.styles} />;
  }

  const urlValue = (fields?.VideoUrl?.value as string | undefined) ?? "";
  const videoId = getYouTubeVideoId(urlValue);

  if (!videoId && !page?.mode?.isEditing) {
    return null;
  }

  const embedSrc = videoId
    ? `https://www.youtube-nocookie.com/embed/${videoId}`
    : "";

  return (
    <div
      className={cn(
        "relative aspect-video overflow-hidden rounded-2xl border bg-muted",
        params?.styles
      )}
    >
      {videoId ? (
        <iframe
          className={cn(
            "absolute inset-0 h-full w-full",
            page?.mode?.isEditing && "pointer-events-none"
          )}
          src={embedSrc}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center px-6 text-center text-sm text-muted-foreground">
          Paste a YouTube URL (or video id) into{" "}
          <span className="font-mono">VideoUrl</span>
        </div>
      )}

      {page?.mode?.isEditing && (
        <div className="absolute inset-x-0 bottom-0 border-t bg-background/70 px-4 py-3 text-sm backdrop-blur">
          <div className="text-xs font-medium text-muted-foreground">
            VideoUrl
          </div>
          <div className="break-all">
            <Text field={fields.VideoUrl} />
          </div>
          {!videoId && urlValue.trim() && (
            <div className="mt-1 text-xs text-destructive">
              That doesn’t look like a supported YouTube URL.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

