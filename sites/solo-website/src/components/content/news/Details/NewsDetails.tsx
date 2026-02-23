import Link from "next/link";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Separator } from "../../../../components/ui/separator";
import { formatDate } from "../../../../lib/data";
import { isDesignView } from "../../../../lib/utils";
import { ArrowLeft, Clock, Share2, Download, ExternalLink } from "lucide-react";
import {
  TextField,
  ImageField,
  Field,
  DateField,
  RichTextField,
} from "@sitecore-content-sdk/nextjs";
import { AIGeneratedBadge } from "components/ui/ai-generated-badge";
import { ComponentProps } from "lib/component-props";
import { Text, Image as SdkImage } from "@sitecore-content-sdk/nextjs";
import { StatsProps } from "components/content/stats/Stats.Tiles";
import { Author } from "components/content/author/teaser/AuthorTeaser";

export interface Tags {
  fields: {
    Title: TextField;
  };
}

export interface NewsData {
  Title: TextField;
  Excerpt: TextField;
  Author: {
    fields: Author;
  };
  PublishDate: Field<string> & { jsonValue: Field<string> };
  Tags: Tags[] & { jsonValue: Tags[] };
  HeroImage: ImageField & { jsonValue: ImageField };
  ExternalUrl: TextField;
  ReadTime: Field<number>;
  Quote: TextField;
  Content: RichTextField;
  Stats: StatsProps;
  Id: Field<string>;
  KeyTakeaway1: TextField;
  KeyTakeaway2: TextField;
  KeyTakeaway3: TextField;
  KeyTakeaway4: TextField;
  KeyTakeaway5: TextField;
}

/**
 * Static fallback component for design view (Page-Designs and Partial-Designs)
 * Displays a preview of the News Details component structure
 */
function PartialDesignFallback() {
  return (
    <>
      {/* Back Button */}
      <div className="border-b border-border py-4">
        <div className="px-4 md:px-8 lg:px-12">
          <Button variant="ghost" size="sm" disabled>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Articles
          </Button>
        </div>
      </div>

      {/* Article Header & Hero - Split Layout */}
      <div>
        <div className="border-b border-border">
          <div className="grid min-h-[60vh] grid-cols-1 xl:grid-cols-3">
            {/* Content Section - 1/3 width on left */}
            <div className="flex flex-col justify-center bg-background p-8 lg:border-r lg:p-12 border-border">
              <div className="mb-6 flex flex-wrap gap-2">
                <Badge variant="secondary" className="px-3 py-1 text-sm">
                  Technology
                </Badge>
                <Badge variant="secondary" className="px-3 py-1 text-sm">
                  Innovation
                </Badge>
                <Badge variant="secondary" className="px-3 py-1 text-sm">
                  News
                </Badge>
              </div>

              <h1 className="mb-6 text-balance text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                Sample News Article Title
              </h1>

              <div className="mb-8 text-balance text-lg leading-relaxed text-muted-foreground">
                This is a preview of the news article detail page. In design view, 
                you can see the layout structure and styling that will be applied to actual content.
              </div>

              <div className="mt-auto space-y-6">
                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">
                      Author
                    </span>
                    <span className="font-medium">John Doe</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">
                      Published
                    </span>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">February 23, 2026</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">
                      Reading Time
                    </span>
                    <span className="font-medium">5 min read</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 gap-2 bg-transparent"
                    size="lg"
                    disabled
                  >
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                  <Button variant="outline" size="lg" disabled>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>

                <Separator />
                <Button
                  variant="default"
                  className="w-full gap-2"
                  size="lg"
                  disabled
                >
                  <ExternalLink className="h-4 w-4" />
                  Read Original Article
                </Button>
              </div>
            </div>

            {/* Hero Image Section - 2/3 width on right */}
            <div className="relative min-h-[300px] bg-muted lg:col-span-2 lg:min-h-full">
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-muted to-muted/50">
                <div className="text-center space-y-2 p-8">
                  <div className="text-4xl mb-4">📰</div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Hero Image Placeholder
                  </p>
                  <p className="text-xs text-muted-foreground/70">
                    Design Preview
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default async function ArticleDetailPage({ page }: ComponentProps) {
  const routeFields = page.layout.sitecore.route?.fields as
    | NewsData
    | undefined;

  // Render static fallback for design view (Partial-Designs or Page-Designs)
  if (isDesignView(page)) {
    return <PartialDesignFallback />;
  }

  console.error(JSON.stringify(page?.layout?.sitecore?.context?.itemPath, null, 2));

  if (!routeFields) {
    return null;
  }

  const {
    Title,
    Excerpt,
    Author,
    PublishDate,
    Tags,
    HeroImage,
    ExternalUrl,
    ReadTime,
  } = routeFields;

  return (
    <>
      {/* Back Button */}
      <div className="border-b border-border py-4">
        <div className="px-4 md:px-8 lg:px-12">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/articles">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Articles
            </Link>
          </Button>
        </div>
      </div>

      {/* Article Header & Hero - Split Layout */}
      <div>
        <div className="border-b border-border">
          <div className="grid min-h-[60vh] grid-cols-1 xl:grid-cols-3">
            {/* Content Section - 1/3 width on left */}
            <div className="flex flex-col justify-center bg-background p-8 lg:border-r lg:p-12 border-border">
              <div className="mb-6 flex flex-wrap gap-2">
                {Tags?.map((tag) => {
                  return (
                    <Badge
                      key={tag.fields.Title.value}
                      variant="secondary"
                      className="px-3 py-1 text-sm"
                    >
                      <Text field={tag.fields.Title} />
                    </Badge>
                  );
                })}
              </div>

              <h1 className="mb-6 text-balance text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                <Text field={Title} />
              </h1>

              {Excerpt && (
                <div className="mb-8 text-balance text-lg leading-relaxed text-muted-foreground">
                  <Text field={Excerpt} />
                </div>
              )}

              <div className="mt-auto space-y-6">
                <Separator />

                <div className="space-y-4">
                  {Author?.fields?.FirstName && Author?.fields?.LastName && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-muted-foreground">
                        Author
                      </span>
                      <span className="font-medium">
                        {Author.fields.FirstName.value}{" "}
                        {Author.fields.LastName.value}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">
                      Published
                    </span>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />

                      {PublishDate && page.mode.isEditing ? (
                        <DateField field={PublishDate} />
                      ) : (
                        <DateField
                          field={PublishDate}
                          render={(value) =>
                            value && formatDate(value.toString())
                          }
                        />
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">
                      Reading Time
                    </span>
                    <span className="font-medium">
                      <Text as="span" field={ReadTime} /> min read
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

                {(ExternalUrl?.value || page?.mode?.isEditing) && (
                  <>
                    <Separator />
                    <Button
                      asChild
                      variant="default"
                      className="w-full gap-2"
                      size="lg"
                    >
                      <a
                        href={(ExternalUrl?.value as string) || ""}
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
              {HeroImage?.value || page?.mode?.isEditing ? (
                <>
                  <SdkImage
                    field={HeroImage}
                    className="object-cover h-full w-full"
                    alt={HeroImage?.value || "Hero Image"}
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
      </div>
    </>
  );
}
