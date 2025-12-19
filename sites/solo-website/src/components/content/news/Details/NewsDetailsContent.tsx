import { RichText } from "@sitecore-content-sdk/nextjs";
import { ComponentProps } from "lib/component-props";
import { NewsData } from "./NewsDetails";

export default async function Default({ page }: ComponentProps) {
  const routeFields = page.layout.sitecore.route?.fields as
    | NewsData
    | undefined;

  if (
    !routeFields ||
    page?.layout?.sitecore?.context?.itemPath?.includes("Partial-Designs")
  ) {
    return null;
  }

  const { Content } = routeFields;

  return (
    <div>
      {/* Article Body */}
      <div className="py-6 md:py-8">
        <div
          className="article-content prose prose-lg dark:prose-invert max-w-none px-4 md:px-8 lg:px-12"
          suppressHydrationWarning={true}
        >
          <RichText
            field={Content}
            className="text-xl"
            suppressHydrationWarning={true}
          />
        </div>
      </div>
    </div>
  );
}
