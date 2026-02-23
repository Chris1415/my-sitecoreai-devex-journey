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
  id: string;
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
          results: Image[];
        };
      };
    };
  };
}

interface Image {
  Image: {
    jsonValue: ImageField;
  };
  Generated: {
    jsonValue: Field<boolean>;
  };
  Caption: {
    jsonValue: Field<string>;
  };
}

export function Default({ fields }: ImageListProps) {
  const datasource = fields?.data?.datasource;

  if (!datasource) {
    return null;
  }

  const { Title, Subtitle, children } = datasource;
  return (
    <div className="mt-16 border-t border-border bg-linear-to-br from-muted/20 to-muted/5 py-16">
      <div className="px-4 md:px-8 lg:px-12">
        <div className="mb-6">
          <h3 className="mb-2 text-2xl font-bold">
            <Text field={Title.jsonValue} />
          </h3>
          <p className="text-muted-foreground">
            <Text field={Subtitle.jsonValue} />
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {children?.results?.map((img, index) => (
            <Card
              key={index}
              className="group cursor-pointer overflow-hidden transition-all hover:shadow-xl"
            >
              <CardContent className="p-0">
                <div className="relative aspect-video bg-muted">
                  <SdkImage
                    field={img.Image.jsonValue}
                    fill={"true"}
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {img.Generated?.jsonValue && <AIGeneratedBadge />}
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <div className="bg-background p-4">
                  <p className="text-sm font-medium">
                    <Text field={img?.Caption.jsonValue} />
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
