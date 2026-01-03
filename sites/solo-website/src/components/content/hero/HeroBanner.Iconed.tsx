import { Text } from "@sitecore-content-sdk/nextjs";
import { HeroBannerProps } from "./HeroBannerProps";
import { HeroBannerIcon } from "./client/_HeroBanner.Iconed";

export function Iconed({ fields }: HeroBannerProps) {
  const { Title, Description, Icon } = fields;

  return (
    <div className="border-b bg-linear-to-r from-primary/5 via-primary/10 to-primary/5">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <HeroBannerIcon icon={Icon} />
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-balance md:text-5xl lg:text-6xl">
            <Text field={Title} />
          </h1>
          <p className="text-lg text-muted-foreground text-balance md:text-xl">
            <Text field={Description} />
          </p>
        </div>
      </div>
    </div>
  );
}
