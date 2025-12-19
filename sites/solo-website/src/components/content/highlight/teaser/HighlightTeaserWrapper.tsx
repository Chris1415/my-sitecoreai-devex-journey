"use server";
import client from "lib/sitecore-client";
import { HighlightTeaserProps } from "./HighlightTeaser";
import { Default as HighlightTeaser } from "./HighlightTeaser";
import { Field } from "@sitecore-content-sdk/nextjs";

export interface ColorItem {
  item: {
    GradientBackground: { jsonValue: Field<string> };
    Background: { jsonValue: Field<string> };
  };
}

const getColorQuery = `query GetColor($datasource: String!) {
  item(path: $datasource, language: "en") {
    GradientBackground: field(name: "GradientBackground") {
      jsonValue
    }
    Background: field(name: "Background") {
      jsonValue
    }
  }
}
`;

export async function Default({
  params,
  fields,
  rendering,
  page,
}: HighlightTeaserProps) {
  const colorItem = params["Color"];

  const response = await client.getData<ColorItem>(getColorQuery, {
    datasource: colorItem,
  });

  
  return (
    <>
      <HighlightTeaser
        fields={fields}
        params={params}
        colorItem={response}
        rendering={rendering}
        page={page}
      />
    </>
  );
}
