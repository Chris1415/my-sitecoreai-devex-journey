import { Text, TextField, LinkField } from "@sitecore-content-sdk/nextjs";
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

export function Minimal({ fields }: HeroBannerBrandedProps) {
  return (
    <div className="border-b border-border bg-linear-to-br from-primary/5 via-background to-background py-8 md:py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-balance text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
          <Text field={fields.Title} />
        </h1>
        <p className="text-pretty text-xl text-muted-foreground md:text-2xl">
          <Text field={fields.Subtitle} />

        </p>
      </div>
    </div>
  );
}
