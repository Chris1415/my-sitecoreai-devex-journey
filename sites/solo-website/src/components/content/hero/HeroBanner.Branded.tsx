import { Button } from "components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Text, Link, TextField, LinkField } from "@sitecore-content-sdk/nextjs";
import { ComponentProps } from "lib/component-props";

interface HeroBannerBrandedProps extends ComponentProps {
  fields: {
    Subtitle: TextField;
    Title: TextField;
    Description: TextField;
    PrimaryCta: LinkField;
    SecondaryCta: LinkField;
  };
}

export function Branded({ fields, page }: HeroBannerBrandedProps) {
  return (
    <div className="relative overflow-hidden bg-linear-to-br from-primary via-primary/90 to-primary/80 py-16 text-primary-foreground md:py-24">
      {/* Animated background elements */}
      {!page?.mode?.isEditing && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-20 -top-20 h-64 w-64 animate-float rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -right-20 -bottom-20 h-64 w-64 animate-float-delay-1 rounded-full bg-white/10 blur-3xl" />
        </div>
      )}

      <div className="relative px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            <div>
              <Text field={fields.Subtitle} />
            </div>
          </div>

          <Text
            field={fields.Title}
            tag="h2"
            className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
          />

          <Text
            field={fields.Description}
            tag="div"
            className="mb-8 text-lg text-primary-foreground/90 md:text-xl"
          />

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              variant="secondary"
              className="group min-w-[200px] text-lg shadow-xl transition-all hover:scale-105"
            >
              <Link field={fields.PrimaryCta} />
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="min-w-[200px] border-2 border-white/30 bg-white/10 text-lg text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              <Link field={fields.SecondaryCta} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
