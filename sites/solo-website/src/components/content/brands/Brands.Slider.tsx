"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { ComponentProps } from "lib/component-props";
import {
  Field,
  ImageField,
  TextField,
  Text,
  Image as SdkImage,
} from "@sitecore-content-sdk/nextjs";
import { Divider } from "../text/Text.Divider";

function BrandTooltip({
  brand,
  children,
}: {
  brand: Brand;
  children: React.ReactNode;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {isHovered && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-4 py-3 bg-card border border-border rounded-lg shadow-lg z-50 w-64 pointer-events-none">
          <div className="text-sm font-semibold text-foreground mb-1">
            <Text field={brand.Name.jsonValue} />
          </div>
          <div className="text-xs text-muted-foreground">
            <Text field={brand.Description.jsonValue} />
          </div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-8 border-transparent border-t-card" />
        </div>
      )}
    </div>
  );
}

export interface BrandsProps extends ComponentProps {
  id: string;
  fields: {
    data: {
      datasource: {
        Title: {
          jsonValue: TextField;
        };
        children: {
          results: Brand[];
        };
      };
    };
  };
}

interface Brand {
  Logo: {
    jsonValue: ImageField;
  };
  Name: {
    jsonValue: Field<string>;
  };
  Description: {
    jsonValue: Field<string>;
  };
}

export function Slider({ fields, page }: BrandsProps) {
  const { Title, children } = fields?.data?.datasource;
  const Elements = children?.results;

  return (
    <div className="bg-background py-8 md:py-10 overflow-hidden border-y">
      <Divider fields={{ Title: Title.jsonValue, Text: null }} />

      {page?.mode?.isEditing ? (
        <BrandsEditing Elements={Elements} />
      ) : (
        <BrandsLive Elements={Elements} />
      )}
    </div>
  );
}

function BrandsEditing({ Elements }: { Elements: Brand[] }) {
  const { resolvedTheme } = useTheme();
  return (
    <>
      <div className="grid grid-cols-3">
        {Elements.map((brand, index) => (
          <div key={`first-${index}`} className="p-2">
            <SdkImage
              field={brand.Logo.jsonValue}
              width={240}
              height={120}
              className={`h-20 md:h-24 w-auto object-contain opacity-80 hover:opacity-100 transition-all cursor-pointer ${
                resolvedTheme === "light" ? "invert" : ""
              }`}
            />
            <Text field={brand.Name.jsonValue} />
            <Text field={brand.Description.jsonValue} />
          </div>
        ))}
      </div>
    </>
  );
}

function BrandsLive({ Elements }: { Elements: Brand[] }) {
  const { resolvedTheme } = useTheme();
  return (
    <>
      <div className="relative">
        <div className="flex animate-scroll">
          {/* First set of logos */}
          {Elements.map((brand, index) => (
            <div
              key={`first-${index}`}
              className="shrink-0 w-64 md:w-80 px-12 flex items-center justify-center"
            >
              <BrandTooltip brand={brand}>
                <SdkImage
                  field={brand.Logo.jsonValue}
                  width={240}
                  height={120}
                  className={`h-20 md:h-24 w-auto object-contain opacity-80 hover:opacity-100 transition-all cursor-pointer ${
                    resolvedTheme === "light" ? "invert" : ""
                  }`}
                />
              </BrandTooltip>
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {Elements.map((brand, index) => (
            <div
              key={`second-${index}`}
              className="shrink-0 w-64 md:w-80 px-12 flex items-center justify-center"
            >
              <BrandTooltip brand={brand}>
                <SdkImage
                  field={brand.Logo.jsonValue}
                  width={240}
                  height={120}
                  className={`h-20 md:h-24 w-auto object-contain opacity-80 hover:opacity-100 transition-all cursor-pointer ${
                    resolvedTheme === "light" ? "invert" : ""
                  }`}
                />
              </BrandTooltip>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
