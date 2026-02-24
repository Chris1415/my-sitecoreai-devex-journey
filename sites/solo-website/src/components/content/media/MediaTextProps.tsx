import type { RichTextField, TextField } from "@sitecore-content-sdk/nextjs";
import type { ComponentProps } from "lib/component-props";

export interface MediaTextProps extends ComponentProps {
  fields: {
    Title: TextField;
    Text: RichTextField | null;
  };
  params: ComponentProps["params"] & {
    DynamicPlaceholderId?: string;
  };
}

