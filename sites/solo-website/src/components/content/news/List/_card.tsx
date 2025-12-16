import Link from "next/link";
import Image from "next/image";
import { Badge } from "../../../ui/badge";
import { Card, CardContent, CardFooter } from "../../../ui/card";
import { Clock, Calendar } from "lucide-react";
import {
  Field,
  ImageField,
  Image as SdkImage,
} from "@sitecore-content-sdk/nextjs";
import { NewsData, Tags } from "../Details/NewsDetails";

// Format Sitecore condensed ISO date "20250820T150000Z" to readable format
function formatSitecoreDate(dateStr: string | number): string {
  if (!dateStr) return "";

  const str = String(dateStr);

  // Convert "20250820T150000Z" → "2025-08-20T15:00:00Z"
  const isoDate = str.replace(
    /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z$/,
    "$1-$2-$3T$4:$5:$6Z"
  );

  const date = new Date(isoDate);

  // Check for invalid date
  if (isNaN(date.getTime())) return String(dateStr);

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

interface NewsProps {
  news: NewsData;
}

export function NewsCard({ news }: NewsProps) {
  const tags = news?.Tags?.jsonValue || news?.Tags;
  const heroImage = news?.HeroImage.jsonValue || news?.HeroImage;
  return (
    <Link href={`/articles/${news.Id.value}`} className="group block">
      <Card className="h-full overflow-hidden transition-all hover:shadow-lg">
        <div className="relative aspect-video overflow-hidden">
          <SdkImage
            field={heroImage}
            fill
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
                {tag.fields.Title.value}
              </Badge>
            ))}
          </div>

          <h3 className="mb-2 text-balance text-xl font-bold tracking-tight group-hover:text-primary">
            {news.Title.value}
          </h3>

          <p className="line-clamp-2 text-sm text-muted-foreground">
            {news.Excerpt.value}
          </p>
        </CardContent>

        <CardFooter className="px-6 pb-6 pt-0">
          <div className="flex w-full items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{formatSitecoreDate(news.PublishDate.value)}</span>
            </div>
            {news.ReadTime?.value && (
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{news.ReadTime.value} min read</span>
              </div>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
