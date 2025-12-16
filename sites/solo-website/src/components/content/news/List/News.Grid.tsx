import { getLatestArticles } from "lib/data";
import { Newspaper } from "lucide-react";
import { NewsCard } from "./_card";
import { ComponentProps } from "lib/component-props";
import { Field, Text } from "@sitecore-content-sdk/nextjs";
import { NewsData } from "../Details/NewsDetails";

export interface NewsListProps extends ComponentProps {
  fields: {
    Title: Field<string>;
    Icon: Field<string>;
    News: {
      fields: NewsData;
    }[];
  };
}

export function NewsGrid({ fields }: NewsListProps) {
  const { Title, Icon, News } = fields;
  const articles = getLatestArticles(3);
  return (
    <section className="py-6 md:py-8">
      <div className="px-2">
        <div className="mb-8 flex items-center gap-2">
          <Newspaper className="h-5 w-5 text-primary" />
          <Text field={Icon} />
          <h2 className="text-2xl font-bold tracking-tight">
            <Text field={Title} />
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {News.map((article) => (
            <NewsCard key={article.fields.Id.value} news={article.fields} />
          ))}
        </div>
      </div>
    </section>
  );
}
