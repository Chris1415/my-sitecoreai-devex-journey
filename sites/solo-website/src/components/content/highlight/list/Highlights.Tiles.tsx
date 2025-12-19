import { ComponentProps } from "lib/component-props";
import { Default } from "../teaser/HighlightTeaser";
import { LinkField, TextField } from "@sitecore-content-sdk/nextjs";

export interface HightlightTeaserElement {
  Icon: { jsonValue: TextField };
  Title: { jsonValue: TextField };
  Description: { jsonValue: TextField };
  Link: { jsonValue: LinkField };
}

export interface HighlightTeaserProps extends ComponentProps {
  fields: {
    data: {
      datasource: {
        Title: {
          jsonValue: TextField;
        };
        Subtitle: {
          jsonValue: TextField;
        };
        children: {
          results: HightlightTeaserElement[];
        };
      };
    };
  };
}

export function Tiles({ fields, page }: HighlightTeaserProps) {
  const datasource = fields?.data?.datasource;

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
          {/* {features.map((feature, index) => (
            <Default {...feature} key={index} />
          ))} */}
        </div>
      </div>
    </div>
  );
}
