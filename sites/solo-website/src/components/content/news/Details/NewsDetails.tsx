import Link from "next/link";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Separator } from "../../../../components/ui/separator";
import { formatDate } from "../../../../lib/data";
import {
  ArrowLeft,
  Clock,
  Share2,
  Download,
  ExternalLink,
  Quote,
} from "lucide-react";
import {
  TextField,
  ImageField,
  Field,
  DateField,
  RichTextField,
  RichText,
} from "@sitecore-content-sdk/nextjs";
import { AIGeneratedBadge } from "components/ui/ai-generated-badge";
import { ComponentProps } from "lib/component-props";
import { NewsCard } from "../List/_card";
import { Text, Image as SdkImage } from "@sitecore-content-sdk/nextjs";
import { StatsProps, Tiles } from "components/content/stats/Stats.Tiles";
import Default, {
  ImageListProps,
} from "components/content/media/images/ImageList";
import client from "lib/sitecore-client";

export interface Tags {
  fields: {
    Title: TextField;
  };
}

export interface Author {
  fields: {
    FirstName: TextField;
    LastName: TextField;
    Image: ImageField;
    AboutMe: RichTextField;
  };
}

export interface NewsData {
  Title: TextField;
  Excerpt: TextField;
  Author: Author;
  PublishDate: Field<string>;
  Tags: Tags[] & { jsonValue: Tags[] };
  HeroImage: ImageField & { jsonValue: ImageField };
  ExternalUrl: TextField;
  ReadTime: Field<number>;
  Quote: TextField;
  Content: RichTextField;
  Stats: StatsProps;
  ImageList: ImageListProps;
  Id: Field<string>;
}

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
  currentTags: Tags[],
  limit: number = 3
): NewsData[] {
  // Extract current article's tag titles for comparison
  const currentTagTitles = currentTags.map((tag) =>
    tag.fields?.Title?.value?.toString().toLowerCase()
  );

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
                    value
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

export default async function ArticleDetailPage({
  page,
  rendering,
  params,
}: ComponentProps) {
  const {
    Title,
    Excerpt,
    Author,
    PublishDate,
    Tags,
    HeroImage,
    ExternalUrl,
    ReadTime,
    Quote: QuoteField,
    Content,
    Stats,
    ImageList,
  } = page.layout.sitecore.route?.fields as unknown as NewsData;

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
    <>
      {/* Back Button */}
      <section className="border-b border-border py-4">
        <div className="px-4 md:px-8 lg:px-12">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/articles">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Articles
            </Link>
          </Button>
        </div>
      </section>

      {/* Article Header & Hero - Split Layout */}
      <article>
        <div className="border-b border-border">
          <div className="grid min-h-[60vh] grid-cols-1 lg:grid-cols-3">
            {/* Content Section - 1/3 width on left */}
            <div className="flex flex-col justify-center bg-background p-8 lg:border-r lg:p-12 border-border">
              <div className="mb-6 flex flex-wrap gap-2">
                {Tags.map((tag) => (
                  <Badge
                    key={tag.fields.Title.value}
                    variant="secondary"
                    className="px-3 py-1 text-sm"
                  >
                    <Text field={tag.fields.Title} />
                  </Badge>
                ))}
              </div>

              <h1 className="mb-6 text-balance text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                <Text field={Title} />
              </h1>

              {Excerpt && (
                <p className="mb-8 text-balance text-lg leading-relaxed text-muted-foreground">
                  <Text field={Excerpt} />
                </p>
              )}

              <div className="mt-auto space-y-6">
                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">
                      Author
                    </span>
                    <span className="font-medium">
                      {Author.fields.FirstName.value}{" "}
                      {Author.fields.LastName.value}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">
                      Published
                    </span>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <time
                        dateTime={PublishDate.value}
                        className="font-medium"
                      >
                        {PublishDate && (
                          <DateField
                            field={PublishDate}
                            render={(value) =>
                              value && formatDate(value.toString())
                            }
                          />
                        )}
                      </time>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">
                      Reading Time
                    </span>
                    <span className="font-medium">
                      <Text field={ReadTime} /> min read
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 gap-2 bg-transparent"
                    size="lg"
                  >
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                  <Button variant="outline" size="lg">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>

                {(ExternalUrl.value || page?.mode?.isEditing) && (
                  <>
                    <Separator />
                    <Button
                      asChild
                      variant="default"
                      className="w-full gap-2"
                      size="lg"
                    >
                      <a
                        href={(ExternalUrl.value as string) || ""}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Read Original Article
                      </a>
                    </Button>
                    {page?.mode?.isEditing && (
                      <div>
                        <Text field={ExternalUrl} />
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="relative min-h-[300px] bg-muted lg:col-span-2 lg:min-h-full">
              {HeroImage.value || page?.mode?.isEditing ? (
                <>
                  <SdkImage
                    field={HeroImage}
                    className="object-cover h-full w-full"
                    alt={HeroImage.value || "Hero Image"}
                    priority="true"
                  />

                  <AIGeneratedBadge />
                </>
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  No image available
                </div>
              )}
            </div>
          </div>
        </div>

        {Stats && (
          <Tiles
            fields={Stats.fields}
            page={page}
            rendering={rendering}
            params={params}
          />
        )}

        {/* Article Body */}
        <div className="py-12 md:py-16">
          <div className="article-content prose prose-lg dark:prose-invert max-w-none px-4 md:px-8 lg:px-12">
            <RichText field={Content} className="text-xl" />
          </div>

          {/* Pull Quote Section */}
          <section className="group/quote relative my-20 cursor-default overflow-hidden transition-all duration-500 hover:scale-[1.01]">
            {/* Background with gradient - Light & Dark mode */}
            <div className="absolute inset-0 bg-linear-to-br from-red-50 via-stone-100 to-amber-50/50 transition-all duration-500 group-hover/quote:from-red-100 group-hover/quote:via-stone-50 dark:from-red-950 dark:via-stone-900 dark:to-neutral-950 dark:group-hover/quote:from-red-900 dark:group-hover/quote:via-stone-800" />

            {/* Subtle pattern overlay */}
            <div
              className="absolute inset-0 opacity-[0.04] dark:opacity-[0.03]"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
                backgroundSize: "24px 24px",
              }}
            />

            {/* Decorative blurred orbs - Light & Dark mode */}
            <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-red-300/40 blur-3xl transition-all duration-700 group-hover/quote:bg-red-400/50 group-hover/quote:blur-2xl dark:bg-red-600/25 dark:group-hover/quote:bg-red-500/35" />
            <div className="absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-red-200/30 blur-3xl transition-all duration-700 group-hover/quote:bg-red-300/40 dark:bg-red-800/20 dark:group-hover/quote:bg-red-600/30" />
            <div className="absolute left-1/3 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-amber-300/20 blur-3xl transition-all duration-500 group-hover/quote:bg-amber-400/30 dark:bg-amber-500/10 dark:group-hover/quote:bg-amber-400/15" />

            <div className="relative px-4 py-8 md:px-8 md:py-10 lg:px-12 lg:py-12">
              <blockquote className="mx-auto max-w-4xl text-center">
                {/* Decorative quote icon */}
                <div className="mb-6 flex justify-center">
                  <div className="rounded-full border border-red-300/50 bg-red-100/80 p-4 backdrop-blur-sm transition-all duration-300 group-hover/quote:border-red-400/60 group-hover/quote:bg-red-200/80 group-hover/quote:shadow-lg group-hover/quote:shadow-red-300/30 dark:border-red-400/20 dark:bg-red-500/10 dark:group-hover/quote:border-red-400/40 dark:group-hover/quote:bg-red-500/20 dark:group-hover/quote:shadow-red-500/20">
                    <Quote className="h-8 w-8 text-red-600 transition-transform duration-300 group-hover/quote:scale-110 dark:text-red-400" />
                  </div>
                </div>

                {/* Quote text */}
                <p className="text-balance text-2xl font-medium italic leading-relaxed text-stone-800 transition-colors duration-300 group-hover/quote:text-stone-900 dark:text-white/90 dark:group-hover/quote:text-white md:text-3xl lg:text-4xl">
                  <Text as="span" field={QuoteField} />
                </p>

                {/* Decorative line */}
                <div className="mx-auto mt-8 h-px w-32 bg-linear-to-r from-transparent via-red-400/50 to-transparent transition-all duration-500 group-hover/quote:w-48 group-hover/quote:via-red-500/70 dark:via-red-500/50 dark:group-hover/quote:via-red-400/70" />
              </blockquote>
            </div>
          </section>

          {ImageList && (
            <Default
              id={ImageList.id}
              fields={ImageList.fields}
              page={page}
              rendering={rendering}
              params={params}
            />
          )}

          {/* {article.keyTakeaways && article.keyTakeaways.length > 0 && (
            <section className="mt-16 px-4 md:px-8 lg:px-12">
              <Card className="bg-linear-to-br from-primary/5 to-background">
                <CardContent className="p-8">
                  <h3 className="mb-6 text-2xl font-bold">Key Takeaways</h3>
                  <ul className="space-y-3">
                    {article.keyTakeaways.map((takeaway, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                          {index + 1}
                        </span>
                        <span className="text-muted-foreground">
                          {takeaway}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </section>
          )} */}

          {/* Author Bio */}
          <div className="mt-12 px-4 md:px-8 lg:px-12">
            <Separator className="mb-6" />
            <div className="mb-6">
              <h3 className="mb-2 text-2xl font-bold">
                About {Author.fields.FirstName.value}{" "}
                {Author.fields.LastName.value}
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                {Author.fields.AboutMe.value}
              </p>
              <div className="mt-4 flex gap-2">
                {Author && (
                  <Button variant="outline" size="sm" asChild>
                    <Link href="#">View Profile (Coming Soon)</Link>
                  </Button>
                )}
                <Button variant="ghost" size="sm">
                  Follow
                </Button>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {filteredArticles.length > 0 && (
        <section className="border-t border-border bg-muted/30 py-12 md:py-16">
          <div className="px-4 md:px-8 lg:px-12">
            <h2 className="mb-8 text-2xl font-bold tracking-tight">
              Related Articles
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.map((relatedArticle) => (
                <NewsCard key={relatedArticle.Id.value} news={relatedArticle} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
