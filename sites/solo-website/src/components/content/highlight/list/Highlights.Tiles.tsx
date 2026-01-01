import { Default } from "../teaser/HighlightTeaser";
import { HighlightTeaserProps } from "./Highlights";

export function Tiles({
  fields,
  page,
  rendering,
  params,
}: HighlightTeaserProps) {
  const datasource = fields?.data?.datasource;
  const Elements = datasource?.children?.results;

  // Return early if no datasource
  if (!datasource) {
    if (page?.mode?.isEditing) {
      return <div>Please configure HighlightTeaser datasource</div>;
    }
    return null;
  }

  return (
    <div className="relative overflow-hidden py-8 md:py-12">
      <div className="px-4 md:px-6">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Built on Excellence and Experience
          </h2>
          <p className="text-lg text-muted-foreground">
            Combining technical expertise with practical experience to deliver
            innovative Sitecore solutions
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {Elements.map((feature, index: number) => (
            <Default
              fields={{
                Cta: feature.Cta.jsonValue,
                Description: feature.Description.jsonValue,
                Icon: feature.Icon.jsonValue,
                Title: feature.Title.jsonValue,
              }}
              colorItem={undefined}
              key={index}
              page={page}
              rendering={rendering}
              params={params}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
