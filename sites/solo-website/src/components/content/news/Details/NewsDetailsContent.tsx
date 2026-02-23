import { RichText } from "@sitecore-content-sdk/nextjs";
import { ComponentProps } from "lib/component-props";
import { isDesignView } from "lib/utils";
import { NewsData } from "./NewsDetails";

/**
 * Static fallback component for design view
 * Displays a preview of the News Details Content component structure
 */
function DesignViewFallback() {
  return (
    <div>
      {/* Article Body */}
      <div className="py-6 md:py-8">
        <div
          className="article-content prose prose-lg dark:prose-invert max-w-none px-4 md:px-8 lg:px-12"
          suppressHydrationWarning={true}
        >
          <div className="space-y-4 text-xl">
            <p>
              This is a preview of the news article content component. In design view, you can see the layout structure and styling that will be applied to actual article content.
            </p>
            <p>
              The component uses prose styling for rich text content, ensuring proper typography and spacing for article readability. Content authors can preview how their formatted text will appear in the final article.
            </p>
            <p>
              The prose classes provide automatic styling for headings, paragraphs, lists, and other content elements, creating a polished reading experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function Default({ page }: ComponentProps) {
  const routeFields = page.layout.sitecore.route?.fields as
    | NewsData
    | undefined;

  if (isDesignView(page)) {
    return <DesignViewFallback />;
  }

  if (!routeFields) {
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
