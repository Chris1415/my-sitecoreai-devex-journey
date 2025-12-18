import { ComponentProps } from "lib/component-props";
import { NewsData, Tags } from "./NewsDetails";
import client from "lib/sitecore-client";
import { Default as NewsCard } from "../Teaser/NewsCard";

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

export default async function Default({
  page,
  rendering,
  params,
}: ComponentProps) {
  const { Title, Tags } = page.layout.sitecore.route
    ?.fields as unknown as NewsData;

  if (page?.layout?.sitecore?.context?.itemPath?.includes("Partial-Designs")) {
    return <div>Related News not found</div>;
  }

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
    Title.value,
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
