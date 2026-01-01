"use client";
import { LinkField, TextField, Text, Link } from "@sitecore-content-sdk/nextjs";
import { Button } from "components/ui/button";
import { Card, CardContent } from "components/ui/card";
import { ComponentProps } from "lib/component-props";
import { getLucideIcon } from "lib/iconUtils";
import { ArrowRight, Lightbulb, LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { ColorItem } from "./HighlightTeaserWrapper";

export interface WrappedHighlightTeaserProps extends HighlightTeaserProps {
  colorItem: ColorItem | undefined;
}

export interface HighlightTeaserProps extends ComponentProps {
  fields: {
    Title: TextField;
    Description: TextField;
    Icon: TextField;
    Cta: LinkField;
  };
}

export function Default({
  fields,
  params,
  colorItem,
}: WrappedHighlightTeaserProps) {
  const { Title, Description, Icon, Cta } = fields;
  const [IconComponent, setIconComponent] = useState<LucideIcon | null>(null);
  const FallbackIcon = Lightbulb;
  const UsedIcon = IconComponent || FallbackIcon;
  const iconValue = String(Icon?.value || "");

  useEffect(() => {
    const newIcon = getLucideIcon(iconValue);
    setIconComponent(() => newIcon);
  }, [iconValue]);

  return (
    <div className={`${params.styles} flex my-6`}>
      <div className="w-full px-2 h-full flex">
        <Card
          className={`relative group border-2 transition-all duration-300 hover:border-${colorItem?.item.Background.jsonValue.value} hover:shadow-xl w-full h-full`}
        >
          <CardContent className="p-6 flex-1">
            <div
              className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-linear-to-br ${colorItem?.item.GradientBackground.jsonValue.value} shadow-lg`}
            >
              <UsedIcon className="h-6 w-6 text-white" />
            </div>
            <h3 className="mb-2 text-xl font-bold">
              <Text field={Title} />
            </h3>
            <div className="mb-4 text-muted-foreground">
              <Text field={Description} />
            </div>

            <Link field={Cta}>
              <Button
                variant="ghost"
                className="group/btn p-0 transition-all hover:bg-transparent "
              >
                Learn more
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </Link>
          </CardContent>
          {/* Animated gradient overlay on hover */}
          <div
            className={`absolute inset-0 bg-linear-to-br ${colorItem?.item.GradientBackground.jsonValue.value} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
          />
        </Card>
      </div>
    </div>
  );
}
