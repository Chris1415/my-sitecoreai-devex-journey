import Link from "next/link";
import { Badge } from "../../../ui/badge";
import { Card, CardContent, CardFooter } from "../../../ui/card";
import { formatDate } from "../../../../lib/data";
import { Clock } from "lucide-react";
import { NewsCardProps } from "./NewsCardProps";
import {
  DateField,
  Image as SdkImage,
  Text,
} from "@sitecore-content-sdk/nextjs";

export function Default({ fields, params }: NewsCardProps) {
  const article = fields.News.fields;
  const tags = article?.Tags?.jsonValue || article?.Tags;
  const publishDate = article?.PublishDate?.jsonValue || article?.PublishDate;
  const heroImage = article?.HeroImage?.jsonValue || article?.HeroImage;
  const showAuthor =
    article?.Author?.fields?.FirstName?.value &&
    article?.Author?.fields?.LastName?.value;

  // If no top article is found, return null
  if (!article) {
    return <></>;
  }

  return (
    <div className={`${params.styles} px-2 py-2`}>
      <Card
        className={`h-full overflow-hidden transition-all hover:shadow-lg `}
      >
        <Link href={`/articles/${article?.Id?.value}`} className={`group block`}>
          <div className="relative aspect-video overflow-hidden">
            <SdkImage
              field={heroImage}
              fill={"true"}
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <CardContent className="p-6">
            <div className="mb-3 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge
                  key={tag?.fields?.Title?.value}
                  variant="secondary"
                  className="text-xs"
                >
                  <Text field={tag.fields.Title} />
                </Badge>
              ))}
            </div>

            <h3 className="mb-2 text-balance text-xl font-bold tracking-tight group-hover:text-primary">
              <Text field={article.Title} />
            </h3>

            <p className="line-clamp-2 text-sm text-muted-foreground">
              <Text field={article.Excerpt} />
            </p>
          </CardContent>

          <CardFooter className="px-6 pb-6 pt-0">
            <div className="flex w-full items-center justify-between text-xs text-muted-foreground">
              {showAuthor && (
                <span>
                  {article.Author.fields.FirstName.value}{" "}
                  {article.Author.fields.LastName.value}
                </span>
              )}
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <DateField
                  field={publishDate}
                  render={(value) => value && formatDate(value.toString())}
                />
              </div>
            </div>
          </CardFooter>
        </Link>
      </Card>
    </div>
  );
}
