"use client";

import type React from "react";

import Image from "next/image";
import { useState } from "react";
import { useTheme } from "next-themes";

const brands = [
  {
    name: "Sitecore",
    logo: "/images/brands/sitecore-logo.svg",
    description:
      "Leading digital experience platform for creating personalized customer experiences at scale.",
  },
  {
    name: "Vercel",
    logo: "/images/brands/vercel-logo.svg",
    description:
      "Frontend cloud platform providing the best developer experience with deployment and collaboration tools.",
  },
  {
    name: "Next.js",
    logo: "/images/brands/nextjs-logo.svg",
    description:
      "React framework enabling server-side rendering and static site generation for production-ready applications.",
  },
  {
    name: "Netlify",
    logo: "/images/brands/netlify-logo.svg",
    description:
      "Modern web development platform for building, deploying and scaling web applications with ease.",
  },
  {
    name: "Microsoft",
    logo: "/images/brands/microsoft-logo.svg",
    description:
      "Global technology company delivering cloud computing, AI, and enterprise software solutions worldwide.",
  },
];

function BrandTooltip({
  brand,
  children,
}: {
  brand: (typeof brands)[0];
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
            {brand.name}
          </div>
          <div className="text-xs text-muted-foreground">
            {brand.description}
          </div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-8 border-transparent border-t-card" />
        </div>
      )}
    </div>
  );
}

export function Slider() {
  const { resolvedTheme } = useTheme();

  return (
    <div className="bg-background py-16 md:py-20 overflow-hidden border-y">
      <div className="container mx-auto px-4 mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-center">
          Using Industry Leaders
        </h2>
      </div>
      <div className="relative">
        <div className="flex animate-scroll">
          {/* First set of logos */}
          {brands.map((brand, index) => (
            <div
              key={`first-${index}`}
              className="shrink-0 w-64 md:w-80 px-12 flex items-center justify-center"
            >
              <BrandTooltip brand={brand}>
                <Image
                  src={brand.logo || "/placeholder.svg"}
                  alt={`${brand.name} logo`}
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
          {brands.map((brand, index) => (
            <div
              key={`second-${index}`}
              className="shrink-0 w-64 md:w-80 px-12 flex items-center justify-center"
            >
              <BrandTooltip brand={brand}>
                <Image
                  src={brand.logo || "/placeholder.svg"}
                  alt={`${brand.name} logo`}
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
    </div>
  );
}
