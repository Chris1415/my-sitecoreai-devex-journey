import { ComponentProps } from "lib/component-props";
import { NewsData } from "../Details/NewsDetails";
import { Field } from "@sitecore-content-sdk/nextjs";

export interface NewsCardProps extends ComponentProps {
  fields: {
    Title: Field<string>;
    Icon: Field<string>;
    News: {
      fields: NewsData;
    };
  };
}
