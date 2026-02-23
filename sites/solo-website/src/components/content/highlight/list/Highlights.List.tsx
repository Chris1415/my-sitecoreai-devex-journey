import { Text } from "@sitecore-content-sdk/nextjs";
import { Card, CardContent } from "components/ui/card";
import { HighlightTeaserProps } from "./Highlights";

export function List({ fields, page }: HighlightTeaserProps) {
  const datasource = fields?.data?.datasource;
  if (!datasource) {
    if (page?.mode?.isEditing) {
      return <div>Please configure Highlight List datasource</div>;
    }
    return null;
  }

  const Elements = datasource?.children?.results ?? [];

  return (
    <div className="py-8 md:py-12">
      <div className="mx-auto px-4 md:px-8 lg:px-12">
        <div className="mx-auto space-y-8">
          <h2 className="text-3xl font-bold tracking-tight">
            <Text field={datasource?.Title?.jsonValue} />
          </h2>
          <div className="space-y-6">
            {Elements.map((element, index) => (
              <Card key={element?.Title?.jsonValue?.value ?? `highlight-${index}`}>
                <CardContent className="p-6">
                  <h3 className="mb-2 text-xl font-semibold">
                    <Text field={element?.Title?.jsonValue} />
                  </h3>
                  <p className="text-muted-foreground">
                    <Text field={element?.Description?.jsonValue} />
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}