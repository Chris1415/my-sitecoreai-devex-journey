import { RichTextField, TextField } from "@sitecore-content-sdk/nextjs";
import { ComponentProps } from "lib/component-props";

export interface TextProps extends ComponentProps {
  fields: {
    Title: TextField;
    Text: RichTextField | null;
  };
}
