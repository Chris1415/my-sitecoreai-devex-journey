import { Card, CardContent } from "components/ui/card";
import { NewsData } from "./NewsDetails";
import { ComponentProps } from "lib/component-props";
import { Text } from "@sitecore-content-sdk/nextjs";

export function Default({ page }: ComponentProps) {
  const {
    KeyTakeaway1,
    KeyTakeaway2,
    KeyTakeaway3,
    KeyTakeaway4,
    KeyTakeaway5,
  } = page.layout.sitecore.route?.fields as unknown as NewsData;

  const keyTakeaways = [
    KeyTakeaway1,
    KeyTakeaway2,
    KeyTakeaway3,
    KeyTakeaway4,
    KeyTakeaway5,
  ];

  if (page?.layout?.sitecore?.context?.itemPath?.includes("Partial-Designs")) {
    return <div>Key Takeaways not found</div>;
  }

  return (
    <>
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
                      <span className="text-muted-foreground">
                        <Text field={takeaway} />
                      </span>
                    </li>
                  );
                })}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
