import Link from "next/link";
import Image from "next/image";
import { Badge } from "../../../ui/badge";
import { Card, CardContent, CardFooter } from "../../../ui/card";
import { formatDate, getTopArticle } from "../../../../lib/data";
import { Clock } from "lucide-react";
import { NewsCardProps } from "./NewsCardProps";

export function Default({ rendering, params, page }: NewsCardProps) {
  const article = getTopArticle();

  // If no top article is found, return null
  if (!article) {
    return <></>;
  }

  return (
      <div className={`${params.styles} px-2 py-2`}>
        <Card
          className={`h-full overflow-hidden transition-all hover:shadow-lg `}
        >
          <Link href={`/articles/${article.slug}`} className={`group block`}>
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src={article.heroImage || "/placeholder.svg"}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <CardContent className="p-6">
              <div className="mb-3 flex flex-wrap gap-2">
                {article.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <h3 className="mb-2 text-balance text-xl font-bold tracking-tight group-hover:text-primary">
                {article.title}
              </h3>

              <p className="line-clamp-2 text-sm text-muted-foreground">
                {article.excerpt}
              </p>
            </CardContent>

            <CardFooter className="px-6 pb-6 pt-0">
              <div className="flex w-full items-center justify-between text-xs text-muted-foreground">
                <span>{article.author}</span>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <time dateTime={article.date}>
                    {formatDate(article.date)}
                  </time>
                </div>
              </div>
            </CardFooter>
          </Link>
        </Card>
      </div>
  );
}
