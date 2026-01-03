import { TextField, LinkField } from "@sitecore-content-sdk/nextjs";
import { ComponentProps } from "lib/component-props";

export interface HeroBannerProps extends ComponentProps {
  fields: {
    Subtitle: TextField;
    Title: TextField;
    Description: TextField;
    PrimaryCta: LinkField;
    Icon: TextField;
    SecondaryCta: LinkField;
  };
}
