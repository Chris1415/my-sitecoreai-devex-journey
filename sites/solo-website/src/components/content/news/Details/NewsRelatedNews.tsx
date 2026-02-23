import { ComponentProps } from "lib/component-props";
import { NewsData, Tags } from "./NewsDetails";
import client from "lib/sitecore-client";
import { isDesignView } from "lib/utils";
import { Default as NewsCard } from "../Teaser/NewsCard";
import { Badge } from "../../../ui/badge";
import { Card, CardContent, CardFooter } from "../../../ui/card";
import { Clock } from "lucide-react";

interface AllArticlesResponse {
  allArticles: {
    children: {
      results: NewsData[];
    };
  };
}

// Get related articles by matching tags and excluding current article
function getRelatedArticlesByTags(
  allArticles: NewsData[],
  currentTitle: string | number | undefined,
  currentTags: Tags[] | undefined,
  limit: number = 3
): NewsData[] {
  // Extract current article's tag titles for comparison
  const currentTagTitles =
    currentTags?.map((tag) =>
      tag.fields?.Title?.value?.toString().toLowerCase()
    ) || [];

  return allArticles
    .filter((article) => {
      // Exclude current article by title
      if (article.Title?.value === currentTitle) {
        return false;
      }

      // Get this article's tag titles
      const articleTagTitles =
        article.Tags?.jsonValue?.map((tag) =>
          tag.fields?.Title?.value?.toString().toLowerCase()
        ) || [];

      // Check if any tags match
      return articleTagTitles.some((tagTitle) =>
        currentTagTitles.includes(tagTitle)
      );
    })
    .slice(0, limit);
}

const query = `
    query GetArticles($language: String!, $path: String!) {
    allArticles:item(language: $language, path: $path) {
        children {
            results {
                Tags:field(name:"Tags"){
                    jsonValue
                }
                Title:field(name:"Title"){
                    value
                }
                Excerpt:field(name:"Excerpt"){
                    value
                }
                Author:field(name:"Author"){
                    value
                }
                PublishDate:field(name:"PublishDate"){
                    jsonValue
                }
                HeroImage:field(name:"HeroImage"){
                    jsonValue
                }
                ReadTime:field(name:"ReadTime"){
                    value
                }
                Id: field(name:"Id"){
                    value
                }            
            }
        }
    }
}`;

/**
 * Static fallback component for design view
 * Displays a preview of the Related News component structure with placeholder cards
 */
function DesignViewFallback({ params }: { params: ComponentProps["params"] }) {
  const placeholderArticles = [
    {
      title: "Sample Related Article Title",
      excerpt: "This is a preview of how related articles will appear in the component.",
      tags: ["Technology", "News"],
      author: "Jane Smith",
      date: "February 20, 2026",
    },
    {
      title: "Another Related Article Example",
      excerpt: "Content authors can see the layout structure and styling in design view.",
      tags: ["Innovation"],
      author: "John Doe",
      date: "February 18, 2026",
    },
    {
      title: "Third Related Article Preview",
      excerpt: "The component displays up to three related articles based on tags.",
      tags: ["Technology", "Updates"],
      author: "Jane Smith",
      date: "February 15, 2026",
    },
  ];

  return (
    <div>
      {/* Related Articles */}
      <div className="border-t border-border bg-muted/30 py-12 md:py-16">
        <div className="px-4 md:px-8 lg:px-12">
          <h2 className="mb-8 text-2xl font-bold tracking-tight">
            Related Articles
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {placeholderArticles.map((article, index) => (
              <div key={index} className={`${params.styles} px-2 py-2`}>
                <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="group block">
                    <div className="relative aspect-video overflow-hidden bg-muted">
                      <div className="flex h-full items-center justify-center bg-gradient-to-br from-muted to-muted/50">
                        <div className="text-center space-y-2 p-4">
                          <div className="text-3xl">📰</div>
                          <p className="text-xs text-muted-foreground">
                            Article Image
                          </p>
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <div className="mb-3 flex flex-wrap gap-2">
                        {article.tags.map((tag, tagIndex) => (
                          <Badge
                            key={tagIndex}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <h3 className="mb-2 text-balance text-xl font-bold tracking-tight">
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
                          <span>{article.date}</span>
                        </div>
                      </div>
                    </CardFooter>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function Default({
  page,
  rendering,
  params,
}: ComponentProps) {
  const routeFields = page.layout.sitecore.route?.fields as
    | NewsData
    | undefined;

  if (isDesignView(page)) {
    return <DesignViewFallback params={params} />;
  }

  if (!routeFields) {
    return null;
  }

  const { Title, Tags } = routeFields;

  const articleResponse = await client.getData<{
    item: { path: string };
  }>(
    `query GetArticlePath($language: String!, $path: String!) {
  item(language: $language, path: $path) {
   path
  }
}`,
    { language: page.locale, path: page.layout.sitecore.route?.itemId || "" }
  );
  const allArticles = await client.getData<AllArticlesResponse>(query, {
    language: page.locale,
    path: articleResponse.item.path.split("/").slice(0, -1).join("/"),
  });

  const filteredArticles = getRelatedArticlesByTags(
    allArticles?.allArticles?.children?.results || [],
    Title?.value,
    Tags,
    3
  );

  return (
    <div>
      {/* Related Articles */}
      {filteredArticles.length > 0 && (
        <div className="border-t border-border bg-muted/30 py-12 md:py-16">
          <div className="px-4 md:px-8 lg:px-12">
            <h2 className="mb-8 text-2xl font-bold tracking-tight">
              Related Articles
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.map((relatedArticle) => (
                <NewsCard
                  key={relatedArticle?.Id?.value}
                  fields={{
                    Icon: { value: "" },
                    Title: { value: "" },
                    News: { fields: relatedArticle },
                  }}
                  page={page}
                  rendering={rendering}
                  params={params}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
