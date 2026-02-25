import React, { JSX } from "react";
import {
  AppPlaceholder,
  Link,
  LinkField,
  RichText,
  Text,
} from "@sitecore-content-sdk/nextjs";
import { ArrowRight, Sparkles, ExternalLink } from "lucide-react";
import { Button } from "components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card";
import { Separator } from "components/ui/separator";
import { cn, isDesignView } from "lib/utils";
import componentMap from "src/component-map";
import type { MediaTextProps } from "./MediaTextProps";
import { ReadMore } from "./helper/ReadMore";

function DesignViewFallback({ styles }: { styles?: string }) {
  return (
    <section className={cn("my-3", styles)}>
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <div className="rounded-2xl border bg-linear-to-br from-muted/30 to-background p-5 sm:p-6 md:p-10">
          <div className="grid gap-6 md:gap-8 lg:grid-cols-12 lg:items-start">
            <div className="order-1 lg:order-1 lg:col-span-5">
              <h2 className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">
                Media Text
              </h2>
              <p className="mt-3 text-pretty text-muted-foreground">
                Design view preview. This component renders a title and rich
                text, and exposes a nested placeholder on the right for dropping
                other components (images, cards, sliders, etc.).
              </p>
              <Separator className="my-6" />
              <div className="h-3 w-2/3 rounded bg-muted" />
              <div className="mt-2 h-3 w-5/6 rounded bg-muted" />
              <div className="mt-2 h-3 w-1/2 rounded bg-muted" />
            </div>
            <div className="order-2 lg:order-2 lg:col-span-7">
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
          </div>
        </div>
      </div>
    </section>
  );
}

function linkHasValue(
  f:
    | { value?: { text?: string }; jsonValue?: { value?: { text?: string } } }
    | null
    | undefined,
): boolean {
  if (!f) return false;
  const text = f.value?.text ?? f.jsonValue?.value?.text;
  return Boolean(text && String(text).trim().length > 0);
}

export function Default({
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

  const phKey = `media-text-${params?.DynamicPlaceholderId}`;

  const isEditing = Boolean(page?.mode?.isEditing);
  const ds = fields.data?.datasource;
  const primaryCta = (ds?.PrimaryCta ?? fields.PrimaryCta) as
    | LinkField
    | null
    | undefined;
  const secondaryCta = (ds?.SecondaryCta ?? fields.SecondaryCta) as
    | LinkField
    | null
    | undefined;

  const tagField = fields.Tag ?? ds?.Tag;
  const hasTag =
    (isEditing || (tagField && "value" in tagField && tagField.value)) &&
    tagField;
  const hasPrimaryCta =
    primaryCta != null && (isEditing || linkHasValue(primaryCta));
  const hasSecondaryCta =
    secondaryCta != null && (isEditing || linkHasValue(secondaryCta));

  const ctaButtons = (
    <div className="flex shrink-0 flex-nowrap items-center gap-2 sm:gap-3">
      {hasPrimaryCta && (
        <Button
          size="sm"
          className="group/primary relative overflow-hidden rounded-full border-0 px-3 py-1 text-xs font-semibold shadow-md shadow-primary/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98]"
        >
          <span className="relative z-10 flex items-center gap-1.5">
            <Link field={primaryCta!} />
            <ExternalLink className="h-3 w-3 transition-transform duration-200 group-hover/primary:translate-x-0.5 group-hover/primary:-translate-y-0.5" />
          </span>
        </Button>
      )}
      {hasSecondaryCta && (
        <Button
          variant="outline"
          size="sm"
          className="group/secondary relative overflow-hidden rounded-full border px-3 py-1 text-xs font-medium transition-all duration-300 hover:border-primary/50 hover:bg-primary/5 hover:shadow-sm active:scale-[0.98]"
        >
          <span className="relative z-10 flex items-center gap-1.5">
            <Link field={fields.SecondaryCta!} />
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/secondary:translate-x-1" />
          </span>
        </Button>
      )}
    </div>
  );

  return (
    <div
      className={cn("relative my-6 overflow-hidden", params?.styles)}
    >
      <div
        className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/5 blur-3xl"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-4 md:px-8 lg:px-12">
        <div className="rounded-2xl border bg-linear-to-br from-muted/25 to-background p-5 sm:p-6 md:p-10 shadow-sm">
          {hasTag && (
            <div className="mb-5 sm:mb-6">
              <span
                className={cn(
                  "inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest animate-fade-in-up",
                  "border border-primary/30 bg-linear-to-r from-primary/10 via-primary/20 to-primary/10",
                  "text-primary shadow-sm ring-2 ring-primary/5",
                  "transition-all duration-300 hover:scale-[1.02] hover:border-primary/50 hover:shadow-md hover:shadow-primary/20 hover:ring-primary/10",
                )}
              >
                <Sparkles className="h-4 w-4 shrink-0 text-primary" />
                <Text field={tagField!} />
              </span>
            </div>
          )}
          <div className="grid gap-6 md:gap-8 lg:grid-cols-12 lg:items-stretch">
            <div className="order-1 lg:order-1 lg:col-span-5 lg:flex lg:min-h-0 lg:flex-col">
              <div className="flex flex-col gap-5 sm:gap-6">
                <h2 className="text-balance text-2xl font-bold tracking-tight md:text-3xl">
                  <Text field={fields.Title} />
                </h2>
                {fields.Text ? (
                  page?.mode?.isEditing ? (
                    <div className="prose prose-neutral mt-4 max-w-none dark:prose-invert prose-p:text-muted-foreground prose-a:text-primary">
                      <RichText field={fields.Text} />
                    </div>
                  ) : (
                    <ReadMore
                      className="lg:flex-1 lg:min-h-0"
                      actions={ctaButtons}
                    >
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
                 {page?.mode?.isEditing && (
                  <div className="pt-2">{ctaButtons}</div>
                )}
              </div>
            </div>

            <div className="order-2 lg:order-2 lg:col-span-7 lg:min-h-0">
              <div className="group relative w-full aspect-video overflow-hidden rounded-2xl border bg-linear-to-br from-muted/40 via-muted/30 to-muted/20 shadow-xl ring-1 ring-black/5 transition-all duration-500 hover:shadow-2xl hover:ring-primary/10 [&>*]:h-full [&>*]:w-full">
                <AppPlaceholder
                  name={phKey}
                  rendering={rendering}
                  page={page}
                  componentMap={componentMap}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
