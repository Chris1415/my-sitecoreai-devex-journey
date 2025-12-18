import Link from "next/link";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Separator } from "../../../../components/ui/separator";
import { formatDate } from "../../../../lib/data";
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

export default async function ArticleDetailPage({ page }: ComponentProps) {
  const {
    Title,
    Excerpt,
    Author,
    PublishDate,
    Tags,
    HeroImage,
    ExternalUrl,
    ReadTime,
  } = page.layout.sitecore.route?.fields as unknown as NewsData;

  if (page?.layout?.sitecore?.context?.itemPath?.includes("Partial-Designs")) {
    return <div>News Intro not found</div>;
  }

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
          <div className="grid min-h-[60vh] grid-cols-1 lg:grid-cols-3">
            {/* Content Section - 1/3 width on left */}
            <div className="flex flex-col justify-center bg-background p-8 lg:border-r lg:p-12 border-border">
              <div className="mb-6 flex flex-wrap gap-2">
                {Tags.map((tag) => {
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
      </div>
    </>
  );
}
