import Link from "next/link";
import { Badge } from "components/ui/badge";
import { Card, CardContent } from "components/ui/card";
import { ArrowRight, TrendingUp } from "lucide-react";
import { formatDate } from "lib/data";
import { NewsCardProps } from "./NewsCardProps";
import {
  DateField,
  Image as SdkImage,
  Text,
} from "@sitecore-content-sdk/nextjs";

export function Top({ fields, params, page }: NewsCardProps) {
  const article = fields?.News?.fields;

  // If no top article is found, return null or placeholder in editing mode
  if (!article) {
    if (page?.mode?.isEditing) {
      return <div>Please choose a news item</div>;
    }
    return null;
  }

  return (
    <div className={`py-6 md:py-8 ${params.styles}`}>
      <div className="px-2">
        <div className="mb-6 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          {page.mode.isEditing && (
            <>
              (<Text field={fields.Icon} />)
            </>
          )}
          <h2 className="text-2xl font-bold tracking-tight">
            <Text field={fields.Title} />
          </h2>
        </div>

        <Link href={`/articles/${article.Id?.value}`} className="group block">
          <Card className="overflow-hidden border-2 border-primary/20 transition-all hover:border-primary/40 hover:shadow-lg">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="relative aspect-video overflow-hidden md:aspect-auto">
                <SdkImage
                  field={article.HeroImage}
                  fill={"true"}
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <Badge className="absolute left-4 top-4 bg-primary">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  Top
                </Badge>
              </div>

              <CardContent className="flex flex-col justify-center p-6 md:p-8">
                <div className="mb-3 flex flex-wrap gap-2">
                  {article.Tags.map((tag) => (
                    <Badge key={tag.fields.Title.value} variant="secondary">
                      <Text field={tag.fields.Title} />
                    </Badge>
                  ))}
                </div>

                <h3 className="mb-2 text-balance text-2xl font-bold tracking-tight group-hover:text-primary md:text-3xl">
                  <Text field={article.Title} />
                </h3>

                <p className="mb-4 text-balance text-lg text-muted-foreground">
                  <Text field={article.Excerpt} />
                </p>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    <span>
                      {article.Author.fields.FirstName.value}{" "}
                      {article.Author.fields.LastName.value}
                    </span>
                    <span className="mx-2">•</span>
                    <DateField
                      field={article.PublishDate}
                      render={(value) => value && formatDate(value.toString())}
                    />
                  </div>

                  <ArrowRight className="h-5 w-5 text-primary transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
}
