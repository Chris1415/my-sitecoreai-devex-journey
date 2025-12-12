import Image from "next/image";
import Link from "next/link";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Separator } from "../../../../components/ui/separator";
import {
  getArticleBySlug,
  getRelatedArticles,
  formatDate,
  getAuthorBySlug,
} from "../../../../lib/data";
import {
  ArrowLeft,
  Clock,
  Share2,
  Download,
  ExternalLink,
  Activity,
  Award,
  Brain,
  Globe,
  Layers,
  Lightbulb,
  Rocket,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import {
  TextField,
  ImageField,
  Field,
  DateField,
} from "@sitecore-content-sdk/nextjs";
import { AIGeneratedBadge } from "components/ui/ai-generated-badge";
import { ComponentProps } from "lib/component-props";
import { NewsCard } from "../List/_card";
import { Card, CardContent } from "components/ui/card";
import {
  Text,
  Link as SdkLink,
  Image as SdkImage,
} from "@sitecore-content-sdk/nextjs";

interface Tags {
  fields: {
    Title: TextField;
  };
}

interface Author {
  fields: {
    FirstName: TextField;
    LastName: TextField;
    Image: ImageField;
  };
}

interface NewsData {
  Title: TextField;
  Excerpt: TextField;
  Author: Author;
  PublishDate: Field<string>;
  Tags: Tags[];
  HeroImage: ImageField;
  ExternalUrl: TextField;
  ReadTime: Field<number>;
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

  const article = getArticleBySlug(page.layout.sitecore.route?.name || "");

  if (!article) {
    return <div>Article not found</div>;
  }

  const relatedArticles = getRelatedArticles(article.slug, article.tags, 3);
  const authorSlug = article.author
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  const author = getAuthorBySlug(authorSlug);

  const articleContent: Record<
    string,
    {
      pullQuote: string;
      stats?: Array<{
        label: string;
        value: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        icon: any;
        trend?: string;
      }>;
      galleryImages: Array<{ src: string; caption: string }>;
      keyTakeaways?: string[];
      technicalDetails?: { title: string; content: string };
      resources?: Array<{ title: string; url: string; type: string }>;
    }
  > = {
    "introducing-sitecore-ai": {
      pullQuote:
        "Sitecore AI brings brand-aware content generation, experimentation, and translation workflows into one cohesive experience.",
      stats: [
        {
          label: "AI Capabilities",
          value: "3 Core",
          icon: Brain,
          trend: "+100%",
        },
        { label: "Languages", value: "50+", icon: Globe, trend: "Growing" },
        { label: "Time Saved", value: "60%", icon: Rocket, trend: "+45%" },
        { label: "Accuracy", value: "95%", icon: Target, trend: "Improved" },
      ],
      galleryImages: [
        {
          src: "/images/image.png",
          caption: "AI Content Generator",
        },
        {
          src: "/images/image.png",
          caption: "Built-in Experimentation",
        },
        {
          src: "/images/image.png",
          caption: "Multilingual Support",
        },
      ],
      keyTakeaways: [
        "AI-powered content generation reduces creation time by 60%",
        "Built-in A/B testing capabilities for continuous optimization",
        "Support for 50+ languages with brand-consistent translations",
        "Seamless workflow integration with existing content processes",
      ],
      technicalDetails: {
        title: "Implementation Guide",
        content:
          "Sitecore AI integrates directly into the XM Cloud authoring environment through a series of API endpoints and UI components. The system leverages large language models fine-tuned on brand-specific content to ensure consistency across all generated materials.",
      },
      resources: [
        { title: "Official Documentation", url: "#", type: "Docs" },
        { title: "API Reference", url: "#", type: "Technical" },
        { title: "Video Tutorial", url: "#", type: "Video" },
      ],
    },
    "geo-optimizing-content-for-genai": {
      pullQuote:
        "As large language models become the primary way users discover information, optimizing for AI comprehension is as critical as traditional SEO.",
      stats: [
        { label: "AI Visibility", value: "+85%", icon: TrendingUp },
        { label: "Search Quality", value: "3x Better", icon: Award },
        { label: "Content Reach", value: "2.5x", icon: Users },
        { label: "Engagement", value: "+120%", icon: Activity },
      ],
      galleryImages: [
        {
          src: "/images/image.png",
          caption: "Semantic Structure",
        },
        {
          src: "/images/image.png",
          caption: "Rich Metadata",
        },
        {
          src: "/images/image.png",
          caption: "AI Comprehension",
        },
      ],
    },
    "content-sdk-whats-new": {
      pullQuote:
        "The new SDK reduces boilerplate code by 40% through improved type generation and smarter defaults.",
      stats: [
        { label: "Code Reduction", value: "-40%", icon: Zap },
        { label: "Performance", value: "+50%", icon: Activity },
        { label: "Developer Time", value: "-35%", icon: Clock },
        { label: "Type Safety", value: "100%", icon: Target },
      ],
      galleryImages: [
        {
          src: "/images/image.png",
          caption: "Multisite Setup",
        },
        {
          src: "/images/image.png",
          caption: "Type Generation",
        },
        {
          src: "/images/image.png",
          caption: "Performance Gains",
        },
      ],
    },
    "sitecore-unveils-sitecoreai-platform": {
      pullQuote:
        "SitecoreAI represents a fundamental shift in how brands approach digital experiences—from reactive to proactive, from manual to autonomous.",
      stats: [
        { label: "AI Agents", value: "20+", icon: Brain },
        { label: "Workflows", value: "Unlimited", icon: Layers },
        { label: "Automation", value: "80%", icon: Rocket },
        { label: "Efficiency", value: "+150%", icon: Zap },
      ],
      galleryImages: [
        {
          src: "/images/image.png",
          caption: "Agentic Studio",
        },
        {
          src: "/images/image.png",
          caption: "Campaign Intelligence",
        },
        {
          src: "/images/image.png",
          caption: "Smart Migration",
        },
      ],
    },
    "sitecore-ai-powered-enhancements": {
      pullQuote:
        "Rather than replacing human marketers, these AI copilots act as force multipliers, handling routine tasks while freeing creative teams to focus on strategy.",
      stats: [
        { label: "New Features", value: "250+", icon: Sparkles },
        { label: "AI Copilots", value: "12", icon: Users },
        { label: "Productivity", value: "+70%", icon: TrendingUp },
        { label: "Satisfaction", value: "92%", icon: Award },
      ],
      galleryImages: [
        {
          src: "/images/image.png",
          caption: "Smart Copilots",
        },
        {
          src: "/images/image.png",
          caption: "Workflow Automation",
        },
        {
          src: "/images/image.png",
          caption: "Brand Compliance",
        },
      ],
    },
    "sitecore-ai-xm-cloud-upgrades": {
      pullQuote:
        "Modern personalization goes far beyond simple rule-based targeting—it's about creating truly individualized experiences at scale.",
      stats: [
        { label: "Personalization", value: "Real-time", icon: Zap },
        { label: "Scale", value: "Millions", icon: Globe },
        { label: "Accuracy", value: "95%", icon: Target },
        { label: "Response Time", value: "<50ms", icon: Activity },
      ],
      galleryImages: [
        {
          src: "/images/image.png",
          caption: "Dynamic Content",
        },
        {
          src: "/images/image.png",
          caption: "Natural Language",
        },
        { src: "/images/image.png", caption: "Global Scale" },
      ],
    },
    "sitecore-symposium-2025-highlights": {
      pullQuote:
        "Agentic systems will fundamentally transform how brands create, manage, and optimize digital experiences—not by replacing humans, but by amplifying their capabilities.",
      stats: [
        { label: "Attendees", value: "5,000+", icon: Users },
        { label: "Sessions", value: "100+", icon: Lightbulb },
        { label: "New Agents", value: "15", icon: Brain },
        { label: "Countries", value: "40+", icon: Globe },
      ],
      galleryImages: [
        {
          src: "/images/image.png",
          caption: "Developer Labs",
        },
        { src: "/images/image.png", caption: "SDK Launch" },
        { src: "/images/image.png", caption: "Live Demos" },
      ],
    },
  };

  const content = articleContent[article.slug] || {
    pullQuote: article.excerpt,
    stats: [
      { label: "Impact", value: "High", icon: TrendingUp },
      { label: "Adoption", value: "Growing", icon: Users },
      { label: "Innovation", value: "Leading", icon: Lightbulb },
      { label: "Quality", value: "Premium", icon: Award },
    ],
    galleryImages: [
      {
        src: "/images/image.png",
        caption: "Feature Overview",
      },
      {
        src: "/images/image.png",
        caption: "User Experience",
      },
      { src: "/images/image.png", caption: "Analytics" },
    ],
    keyTakeaways: [
      "Comprehensive overview of key features and capabilities",
      "Real-world implementation examples and use cases",
      "Best practices for optimal results",
      "Performance considerations and optimization tips",
    ],
  };

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
          <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[60vh]">
            {/* Content Section - 1/3 width on left */}
            <div className="flex flex-col justify-center p-8 lg:p-12 bg-background lg:border-r border-border">
              <div className="mb-6 flex flex-wrap gap-2">
                {Tags.map((tag) => (
                  <Badge
                    key={tag?.fields?.Title?.value}
                    variant="secondary"
                    className="text-sm py-1 px-3"
                  >
                    <Text field={tag?.fields?.Title} />
                  </Badge>
                ))}
              </div>

              <h1 className="mb-6 text-balance text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                <Text field={Title} />
              </h1>

              {article.subtitle && (
                <p className="mb-8 text-balance text-lg text-muted-foreground leading-relaxed">
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
                      {Author?.fields?.FirstName?.value}{" "}
                      {Author?.fields?.LastName?.value}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">
                      Published
                    </span>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <DateField
                        field={PublishDate}
                        className="font-medium"
                        render={(date) => (
                          <time
                            dateTime={date?.toISOString()}
                            className="font-medium"
                          >
                            {formatDate(date?.toISOString() || "")}
                          </time>
                        )}
                      />
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
                      <div className="mt-1">
                        <Text field={ExternalUrl} />
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="relative lg:col-span-2 min-h-[300px] lg:min-h-full bg-muted">
              {HeroImage.value?.src ? (
                <>
                  <SdkImage
                    field={HeroImage}
                    fill
                    className="w-full h-full object-cover"
                    priority
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

        {content.stats && (
          <section className="border-b border-border bg-linear-to-br from-muted/30 to-muted/10 py-16">
            <div className="px-4 md:px-8 lg:px-12">
              <div className="mb-12 text-center">
                <h2 className="mb-3 text-3xl font-bold">Key Highlights</h2>
                <p className="text-muted-foreground">
                  Quick insights and performance metrics
                </p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {content.stats.map((stat, index) => (
                  <Card
                    key={index}
                    className="relative overflow-hidden group hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="pt-6">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform" />
                      <stat.icon className="relative z-10 mb-4 h-10 w-10 text-primary" />
                      <div className="relative z-10 text-4xl font-bold mb-2 bg-linear-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                        {stat.value}
                      </div>
                      <div className="relative z-10 text-sm text-muted-foreground mb-2">
                        {stat.label}
                      </div>
                      {stat.trend && (
                        <Badge variant="secondary" className="text-xs">
                          {stat.trend}
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        <div className="py-12 md:py-16">
          <div
            className="article-content prose prose-lg max-w-none px-4 md:px-8 lg:px-12 dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: article.bodyHtml }}
          />

          <section className="mt-16 border-t border-border bg-gradient-to-br from-muted/20 to-muted/5 py-16">
            <div className="px-4 md:px-8 lg:px-12">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Visual Insights</h3>
                <p className="text-muted-foreground">
                  Explore key features and interfaces in detail
                </p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {content.galleryImages.map((img, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all"
                  >
                    <CardContent className="p-0">
                      <div className="relative aspect-video bg-muted">
                        <Image
                          src={img.src || "/placeholder.svg"}
                          alt={img.caption}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <AIGeneratedBadge />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="p-4 bg-background">
                        <p className="text-sm font-medium">{img.caption}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <div className="mt-12 px-4 md:px-8 lg:px-12">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">
                About {article.author}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {author?.bio ||
                  `A passionate advocate for digital transformation and AI-driven experiences, ${article.author} has been helping organizations leverage the Sitecore platform for over a decade. Follow for insights on modern content management and marketing automation.`}
              </p>
              <div className="mt-4 flex gap-2">
                {author && (
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/authors/${author.slug}`}>View Profile</Link>
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
      {relatedArticles.length > 0 && (
        <section className="border-t border-border bg-muted/30 py-12 md:py-16">
          <div className="px-4 md:px-8 lg:px-12">
            <h2 className="mb-8 text-2xl font-bold tracking-tight">
              Related Articles
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedArticles.map((relatedArticle) => (
                <NewsCard key={relatedArticle.id} article={relatedArticle} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
