import React, { JSX } from "react";
import { AppPlaceholder, RichText, Text } from "@sitecore-content-sdk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card";
import { Separator } from "components/ui/separator";
import { cn, isDesignView } from "lib/utils";
import componentMap from "src/component-map";
import { ReadMore } from "./ReadMore";

import type { MediaTextProps } from "./MediaTextProps";

function DesignViewFallback({ styles }: { styles?: string }) {
  return (
    <section className={cn("my-12", styles)}>
      <div className="px-4 md:px-8 lg:px-12">
        <div className="rounded-2xl border bg-linear-to-br from-muted/30 to-background p-5 sm:p-6 md:p-10">
          <div className="grid gap-6 md:gap-8 lg:grid-cols-12 lg:items-start">
            <div className="order-1 lg:order-1 lg:col-span-7">
              <Card className="border-dashed">
                <CardHeader>
                  <CardTitle>Nested placeholder</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg bg-muted/40 p-4 text-sm text-muted-foreground">
                    Drop components into this placeholder when authoring.
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="order-2 lg:order-2 lg:col-span-5">
              <h2 className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">
                Media Text (Media Left)
              </h2>
              <p className="mt-3 text-pretty text-muted-foreground">
                Design view preview. This variant renders the nested placeholder
                on the left and the title/text on the right.
              </p>
              <Separator className="my-6" />
              <div className="h-3 w-2/3 rounded bg-muted" />
              <div className="mt-2 h-3 w-5/6 rounded bg-muted" />
              <div className="mt-2 h-3 w-1/2 rounded bg-muted" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function MediaLeft({
  fields,
  params,
  rendering,
  page,
}: MediaTextProps): JSX.Element | null {
  if (isDesignView(page)) {
    return <DesignViewFallback styles={params?.styles} />;
  }

  if (!fields) {
    if (page?.mode?.isEditing) {
      return (
        <div className={cn("mx-auto my-10 max-w-3xl px-4", params?.styles)}>
          Please configure Media Text datasource fields.
        </div>
      );
    }
    return null;
  }

  const dynamicId =
    params?.DynamicPlaceholderId ||
    params?.RenderingIdentifier ||
    rendering?.uid ||
    "0";
  const phKey = `media-text-${dynamicId}`;

  return (
    <section className={cn("mt-3", params?.styles)}>
      <div className="px-4 md:px-8 lg:px-12">
        <div className="rounded-2xl border bg-linear-to-br from-muted/25 to-background p-5 sm:p-6 md:p-10 shadow-sm">
          <div className="grid gap-6 md:gap-8 lg:grid-cols-12 lg:items-stretch">
            <div className="order-1 lg:order-1 lg:col-span-7 lg:min-h-0">
              <div className="relative w-full aspect-video overflow-hidden rounded-2xl border bg-muted *:h-full *:w-full">
                <AppPlaceholder
                  name={phKey}
                  rendering={rendering}
                  page={page}
                  componentMap={componentMap}
                />
                {page?.mode?.isEditing && (
                  <div className="absolute inset-x-0 bottom-0 border-t bg-background/70 px-4 py-3 text-xs text-muted-foreground backdrop-blur">
                    Placeholder key:{" "}
                    <span className="font-mono">{phKey}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="order-2 lg:order-2 lg:col-span-5 lg:flex lg:min-h-0 lg:flex-col">
              <h2 className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">
                <Text field={fields.Title} />
              </h2>

              {fields.Text ? (
                page?.mode?.isEditing ? (
                  <div className="prose prose-neutral mt-4 max-w-none dark:prose-invert prose-p:text-muted-foreground prose-a:text-primary">
                    <RichText field={fields.Text} />
                  </div>
                ) : (
                  <ReadMore className="lg:flex-1 lg:min-h-0">
                    <RichText field={fields.Text} />
                  </ReadMore>
                )
              ) : (
                page?.mode?.isEditing && (
                  <p className="mt-4 text-sm text-muted-foreground">
                    Add text content to this component.
                  </p>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
