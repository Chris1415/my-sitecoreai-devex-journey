import { ArrowRight } from "lucide-react";
import { Button } from "components/ui/button";
import { Text, Link } from "@sitecore-content-sdk/nextjs";
import { HeroBannerProps } from "./HeroBannerProps";

export function Default({ fields, page }: HeroBannerProps) {
  return (
    <div className="relative overflow-hidden bg-linear-to-b from-background to-muted/30 py-10 md:py-14">
      <div className="px-4 md:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl text-center">
          {(page?.mode?.isEditing || fields.Subtitle?.value) && (
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-4 py-1.5 text-sm backdrop-blur transition-all duration-300 hover:border-primary/30 hover:shadow-sm">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="font-medium">
                <Text field={fields.Subtitle} />
              </span>
            </div>
          )}

          {(page?.mode?.isEditing || fields.Title?.value) && (
            <Text
              field={fields.Title}
              tag="h1"
              className="mb-6 text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl [&_span]:text-primary"
            />
          )}

          {(page?.mode?.isEditing || fields.Description?.value) && (
            <Text
              field={fields.Description}
              tag="div"
              className="mx-auto mb-8 max-w-2xl text-balance text-lg text-muted-foreground md:text-xl"
            />
          )}

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            {(page?.mode?.isEditing || fields.PrimaryCta?.value?.text) && (
              <Button size="lg" className="group/cta w-full sm:w-auto">
                <Link field={fields.PrimaryCta} />
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover/cta:translate-x-1" />
              </Button>
            )}
            {(page?.mode?.isEditing || fields.SecondaryCta?.value?.text) && (
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto bg-transparent"
              >
                <Link field={fields.SecondaryCta} />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Decorative element */}
      {!page?.mode?.isEditing && (
        <div className="absolute -bottom-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
      )}
    </div>
  );
}
