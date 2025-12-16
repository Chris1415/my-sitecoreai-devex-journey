import {
  TextField,
  Text,
  ImageField,
  Field,
} from "@sitecore-content-sdk/nextjs";
import { AIGeneratedBadge } from "components/ui/ai-generated-badge";
import { Card, CardContent } from "components/ui/card";
import { ComponentProps } from "lib/component-props";
import client from "lib/sitecore-client";
import Image from "next/image";

export interface ImageListProps extends ComponentProps {
  id: string;
  fields: {
    Title: TextField;
    Subtitle: TextField;
  };
}

interface ImagesResponse {
  item: {
    children: {
      results: {
        image: {
          jsonValue: ImageField;
        };
        generated: Field<boolean>;
        caption: Field<string>;
      }[];
    };
  };
}

const query = `
  query GertImages($language:String! $path:String!){
  item(language:$language path:$path){
    children{
      results{
        image:field(name:"Image"){
          jsonValue
        }
        generated: field(name:"Generated"){
          value
        }
        caption: field(name:"Caption"){
          value
        }
      }
    }
  }
}
`;

export default async function Default({ id, fields, page }: ImageListProps) {
  const imagesResponse = await client.getData<ImagesResponse>(query, {
    language: page.locale,
    path: id,
  });
  const { Title, Subtitle } = fields;
  return (
    <>
      {/* Visual Insights Gallery */}
      <section className="mt-16 border-t border-border bg-linear-to-br from-muted/20 to-muted/5 py-16">
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
            {imagesResponse?.item?.children?.results?.map((img, index) => (
              <Card
                key={index}
                className="group cursor-pointer overflow-hidden transition-all hover:shadow-xl"
              >
                <CardContent className="p-0">
                  <div className="relative aspect-video bg-muted">
                    <Image
                      src={img.image.jsonValue.value?.src || "/placeholder.svg"}
                      alt={img.caption.value || "Image"}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {img.generated.value && <AIGeneratedBadge />}
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <div className="bg-background p-4">
                    <p className="text-sm font-medium">
                      <Text field={img.caption} />
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
