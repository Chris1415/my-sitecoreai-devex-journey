import { RichTextField, TextField } from "@sitecore-content-sdk/nextjs";

export interface TextProps {
  fields: {
    Title: TextField;
    Text: RichTextField | null;
  };
}
