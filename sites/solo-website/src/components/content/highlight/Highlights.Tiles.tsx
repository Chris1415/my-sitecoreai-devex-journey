import { ArrowRight, Award, Code2, Lightbulb } from "lucide-react";
import { Card, CardContent } from "../../ui/card";
import { Button } from "../../ui/button";
import Link from "next/link";

export function Tiles() {
  const features = [
    {
      icon: Award,
      title: "Pre-Sales Engineer of the Year",
      description:
        "Awarded Sitecore's Pre-Sales Engineer of the Year for exceptional work in guiding clients through technical solutions and driving successful implementations.",
      color: "from-orange-500 to-red-500",
      hoverBorder: "hover:border-orange-500",
      href: "/about",
    },
    {
      icon: Lightbulb,
      title: "Expertise",
      description:
        "Deep knowledge in Sitecore XM Cloud, Next.js, and modern frontend architectures. Expertise enables tackling complex challenges with high-quality solutions.",
      color: "from-blue-500 to-cyan-500",
      hoverBorder: "hover:border-blue-500",
      href: "/articles",
    },
    {
      icon: Code2,
      title: "Experience & Impact",
      description:
        "Over 10 years of hands-on Sitecore development with 4 MVP titles and 100+ blog posts. Major technology expertise in .NET and Next.JS enables navigating challenges effectively and delivering reliable, high-performance solutions.",
      color: "from-purple-500 to-pink-500",
      hoverBorder: "hover:border-purple-500",
      href: "/articles",
    },
  ];

  return (
    <div className="relative overflow-hidden py-8 md:py-12">
      <div className="px-4 md:px-6">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Built on Excellence and Experience
          </h2>
          <p className="text-lg text-muted-foreground">
            Combining technical expertise with practical experience to deliver
            innovative Sitecore solutions
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`group relative overflow-hidden border-2 transition-all duration-300 ${feature.hoverBorder} hover:shadow-xl`}
            >
              <CardContent className="p-6">
                <div
                  className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-linear-to-br ${feature.color} shadow-lg`}
                >
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
                <p className="mb-4 text-muted-foreground">
                  {feature.description}
                </p>
                <Link href={feature.href}>
                  <Button
                    variant="ghost"
                    className="group/btn p-0 transition-all hover:bg-transparent"
                  >
                    Learn more
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </Link>
              </CardContent>
              {/* Animated gradient overlay on hover */}
              <div
                className={`absolute inset-0 bg-linear-to-br ${feature.color} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
              />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
