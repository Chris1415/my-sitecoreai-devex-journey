import type {
  LinkField,
  RichTextField,
  TextField,
} from "@sitecore-content-sdk/nextjs";
import type { ComponentProps } from "lib/component-props";

export interface MediaTextProps extends ComponentProps {
  fields: {
    Title: TextField;
    Text: RichTextField | null;
    Tag?: TextField | null;
    PrimaryCta?: LinkField | null;
    SecondaryCta?: LinkField | null;
    data?: {
      datasource?: {
        Tag?: TextField | null;
        PrimaryCta?: LinkField | null;
        SecondaryCta?: LinkField | null;
      };
    };
  };
  params: ComponentProps["params"] & {
    DynamicPlaceholderId?: string;
  };
}

