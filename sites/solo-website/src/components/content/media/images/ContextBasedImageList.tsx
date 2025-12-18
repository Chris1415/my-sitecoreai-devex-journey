"use client";
import {
  TextField,
  Text,
  ImageField,
  Field,
  Image as SdkImage,
} from "@sitecore-content-sdk/nextjs";
import { AIGeneratedBadge } from "components/ui/ai-generated-badge";
import { Card, CardContent } from "components/ui/card";
import { ComponentProps } from "lib/component-props";
// import client from "lib/sitecore-client";
import Image from "next/image";

export interface ImageListProps extends ComponentProps {
  fields: {
    data: {
      contextItem: {
        imageList: {
          jsonValue: {
            fields: ImageList;
          };
        };
      };
    };
  };
}

interface ImageList {
  Title: TextField;
  Subtitle: TextField;
  Images: { fields: Image }[];
}

interface Image {
  Image: ImageField;
  Generated: Field<boolean>;
  Caption: Field<string>;
}

export function Default({ fields, page }: ImageListProps) {
  if (page?.layout?.sitecore?.context?.itemPath?.includes("Partial-Designs")) {
    return <div>Image List not found</div>;
  }

  const { Title, Subtitle, Images } =
    fields?.data?.contextItem?.imageList?.jsonValue?.fields;
  return (
    <div className="mt-16 border-t border-border bg-linear-to-br from-muted/20 to-muted/5 py-16">
      <div className="px-4 md:px-8 lg:px-12">
        <div className="mb-6">
          <h3 className="mb-2 text-2xl font-bold">
            <Text field={Title} />
          </h3>
          <p className="text-muted-foreground">
            <Text field={Subtitle} />
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Images?.map((img, index) => (
            <Card
              key={index}
              className="group cursor-pointer overflow-hidden transition-all hover:shadow-xl"
            >
              <CardContent className="p-0">
                <div className="relative aspect-video bg-muted">
                  <SdkImage
                    field={img.fields.Image}
                    fill={"true"}
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {img.fields.Generated && <AIGeneratedBadge />}
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <div className="bg-background p-4">
                  <p className="text-sm font-medium">
                    <Text field={img?.fields.Caption} />
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
