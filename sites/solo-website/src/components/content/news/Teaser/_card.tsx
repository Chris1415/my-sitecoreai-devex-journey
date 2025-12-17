import Link from "next/link";
import { Badge } from "../../../ui/badge";
import { Card, CardContent, CardFooter } from "../../../ui/card";
import { Clock, Calendar } from "lucide-react";
import {
  Text,
  Image as SdkImage,
  Page,
  DateField,
} from "@sitecore-content-sdk/nextjs";
import { NewsData } from "../Details/NewsDetails";
import { formatDate } from "lib/data";

interface NewsProps {
  news: NewsData;
  page: Page;
}

export function NewsCard({ news, page }: NewsProps) {
  const tags = news?.Tags?.jsonValue || news?.Tags;
  const heroImage = news?.HeroImage.jsonValue || news?.HeroImage;
  return (
    <Link href={`/articles/${news.Id.value}`} className="group block">
      <Card className="h-full overflow-hidden transition-all hover:shadow-lg">
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
                key={tag.fields.Title.value}
                variant="secondary"
                className="text-xs"
              >
                <Text field={tag.fields.Title} />
              </Badge>
            ))}
          </div>

          <h3 className="mb-2 text-balance text-xl font-bold tracking-tight group-hover:text-primary">
            <Text field={news.Title} />
          </h3>

          <p className="line-clamp-2 text-sm text-muted-foreground">
            <Text field={news.Excerpt} />
          </p>
        </CardContent>

        <CardFooter className="px-6 pb-6 pt-0">
          <div className="flex w-full items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <DateField
                field={news.PublishDate}
                render={(value) => value && formatDate(value.toString())}
              />
            </div>
            {(news.ReadTime?.value || page.mode.isEditing) && (
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>
                  <Text field={news.ReadTime} /> min read
                </span>
              </div>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
