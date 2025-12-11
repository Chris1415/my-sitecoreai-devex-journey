import { getLatestArticles } from "lib/data";
import { Newspaper } from "lucide-react";
import { NewsCard } from "./_card";

export function NewsGrid() {
  const articles = getLatestArticles(3);
  return (
    <section className="py-6 md:py-8">
      <div className="px-2">
        <div className="mb-8 flex items-center gap-2">
          <Newspaper className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold tracking-tight">Latest News</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
