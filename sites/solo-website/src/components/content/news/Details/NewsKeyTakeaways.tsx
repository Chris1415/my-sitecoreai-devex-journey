import { Card, CardContent } from "components/ui/card";
import { NewsData } from "./NewsDetails";
import { ComponentProps } from "lib/component-props";
import { isDesignView } from "lib/utils";
import { Text } from "@sitecore-content-sdk/nextjs";

/**
 * Static fallback component for design view
 * Displays a preview of the Key Takeaways component structure
 */
function DesignViewFallback() {
  const sampleTakeaways = [
    "This is a preview of the key takeaways component structure.",
    "In design view, you can see how the numbered list will appear.",
    "Each takeaway is displayed with a numbered badge and content.",
    "The component uses a card layout with gradient background.",
    "This helps content authors visualize the component layout.",
  ];

  return (
    <div className="basis-full">
      <div className="mt-16 px-4 md:px-8 lg:px-12">
        <Card className="bg-linear-to-br from-primary/5 to-background">
          <CardContent className="p-8">
            <h3 className="mb-6 text-2xl font-bold">Key Takeaways</h3>
            <ul className="space-y-3">
              {sampleTakeaways.map((takeaway, index) => (
                <li key={index} className="flex gap-3">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {index + 1}
                  </span>
                  <div className="text-muted-foreground">{takeaway}</div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function Default({ page }: ComponentProps) {
  const routeFields = page.layout.sitecore.route?.fields as
    | NewsData
    | undefined;

  if (isDesignView(page)) {
    return <DesignViewFallback />;
  }

  if (!routeFields) {
    return null;
  }

  const {
    KeyTakeaway1,
    KeyTakeaway2,
    KeyTakeaway3,
    KeyTakeaway4,
    KeyTakeaway5,
  } = routeFields;

  const keyTakeaways = [
    KeyTakeaway1,
    KeyTakeaway2,
    KeyTakeaway3,
    KeyTakeaway4,
    KeyTakeaway5,
  ];

  return (
    <div className="basis-full">
      {keyTakeaways && keyTakeaways.length > 0 && (
        <div className="mt-16 px-4 md:px-8 lg:px-12">
          <Card className="bg-linear-to-br from-primary/5 to-background">
            <CardContent className="p-8">
              <h3 className="mb-6 text-2xl font-bold">Key Takeaways</h3>
              <ul className="space-y-3">
                {keyTakeaways.map((takeaway, index) => {
                  if (!takeaway?.value && !page.mode.isEditing) {
                    return null;
                  }
                  return (
                    <li key={index} className="flex gap-3">
                      <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        {index + 1}
                      </span>
                      <div className="text-muted-foreground">
                        <Text field={takeaway} />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
