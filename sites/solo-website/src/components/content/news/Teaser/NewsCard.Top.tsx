import Link from "next/link";
import Image from "next/image";
import { Badge } from "components/ui/badge";
import { Card, CardContent } from "components/ui/card";
import { ArrowRight, TrendingUp } from "lucide-react";
import { formatDate } from "lib/data";
import { getTopArticle } from "lib/data";
import { NewsCardProps } from "./NewsCardProps";

export function Top({ params }: NewsCardProps) {
  const article = getTopArticle();

  // If no top article is found, return null
  if (!article) {
    return <></>;
  }

  return (
    <section className={`py-6 md:py-8 ${params.styles}`}>
      <div className="px-2">
        <div className="mb-6 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold tracking-tight">Top News</h2>
        </div>

        <Link href={`/articles/${article.slug}`} className="group block">
          <Card className="overflow-hidden border-2 border-primary/20 transition-all hover:border-primary/40 hover:shadow-lg">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="relative aspect-[16/9] overflow-hidden md:aspect-auto">
                <Image
                  src={article.heroImage || "/placeholder.svg"}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <Badge className="absolute left-4 top-4 bg-primary">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  Top
                </Badge>
              </div>

              <CardContent className="flex flex-col justify-center p-6 md:p-8">
                <div className="mb-3 flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <h3 className="mb-2 text-balance text-2xl font-bold tracking-tight group-hover:text-primary md:text-3xl">
                  {article.title}
                </h3>

                <p className="mb-4 text-balance text-lg text-muted-foreground">
                  {article.subtitle}
                </p>

                <p className="mb-4 line-clamp-2 text-muted-foreground">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    <span>{article.author}</span>
                    <span className="mx-2">•</span>
                    <time dateTime={article.date}>
                      {formatDate(article.date)}
                    </time>
                  </div>

                  <ArrowRight className="h-5 w-5 text-primary transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </div>
          </Card>
        </Link>
      </div>
    </section>
  );
}
