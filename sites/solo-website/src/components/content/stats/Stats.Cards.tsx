"use client";

import { useEffect, useState } from "react";
import { TrendingUp, LucideIcon } from "lucide-react";
import { Card, CardContent } from "../../ui/card";
import { Page, Text, TextField } from "@sitecore-content-sdk/nextjs";
import { ComponentProps } from "lib/component-props";
import { getLucideIcon } from "lib/iconUtils";

interface StatElement {
  Icon: { jsonValue: TextField };
  Title: { jsonValue: TextField };
  Subtitle: { jsonValue: TextField };
  Tag: { jsonValue: TextField };
}

export interface StatsProps extends ComponentProps {
  fields: {
    data: {
      datasource: {
        Title: {
          jsonValue: TextField;
        };
        Subtitle: {
          jsonValue: TextField;
        };
        children: {
          results: StatElement[];
        };
      };
    };
  };
}

// Individual stat card component to use the hook properly
function StatCard({ element, page }: { element: StatElement; page: Page }) {
  const [IconComponent, setIconComponent] = useState<LucideIcon | null>(null);
  const iconValue = String(element.Icon?.jsonValue.value || "");

  useEffect(() => {
    const icon = getLucideIcon(iconValue);
    setIconComponent(() => icon);
  }, [iconValue]);

  const FallbackIcon = TrendingUp;
  const Icon = IconComponent || FallbackIcon;

  return (
    <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
      <CardContent className="flex flex-col items-center p-6 text-center">
        <div className="group/icon mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 transition-all duration-300 hover:bg-primary/20 hover:scale-110">
          <Icon className="h-6 w-6 text-primary transition-transform duration-300 group-hover/icon:scale-110" />
        </div>
        {page.mode.isEditing && (
          <>
            <p>
              <Text field={element.Icon.jsonValue} />
            </p>
          </>
        )}
        <h3 className="mb-2 font-semibold">
          <Text field={element.Title.jsonValue} />
        </h3>
        <p className="text-sm text-muted-foreground">
          <Text field={element.Subtitle.jsonValue} />
        </p>
      </CardContent>
    </Card>
  );
}

export function Cards({ fields, page, params }: StatsProps) {
  const datasource = fields?.data?.datasource;

  // Return early if no datasource
  if (!datasource) {
    if (page?.mode?.isEditing) {
      return <div>Please configure Stats datasource</div>;
    }
    return null;
  }

  const { children } = datasource;
  const Elements = children?.results;

  // Return null if no elements
  if (!Elements || Elements.length === 0) {
    return <div>No Stat Elements</div>;
  }

  return (
    <div
      className={`grid gap-6 md:grid-cols-2 lg:grid-cols-4 my-4 ${params.styles}`}
    >
      {Elements?.map((element, index) => {
        return <StatCard key={index} element={element} page={page} />;
      })}
    </div>
  );
}
