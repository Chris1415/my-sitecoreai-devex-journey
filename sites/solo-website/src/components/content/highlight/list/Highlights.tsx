import { TextField, LinkField } from "@sitecore-content-sdk/nextjs";
import { Tiles } from "./Highlights.Tiles";
import { ComponentProps } from "lib/component-props";

export interface HightlightTeaserElement {
  Icon: { jsonValue: TextField };
  Title: { jsonValue: TextField };
  Description: { jsonValue: TextField };
  Cta: { jsonValue: LinkField };
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

export function Default(props: HighlightTeaserProps) {
  return <Tiles {...props} />;
}
