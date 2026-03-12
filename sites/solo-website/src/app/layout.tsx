import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { suppressResizeObserverErrors } from "lib/utils";
import { getThemeVariant, themeMetaColors } from "lib/theme-config";
import { Viewport } from "next/types";
import { getThemeFonts } from "lib/fonts";
import { Analytics } from "@vercel/analytics/next";

const themeVariant = getThemeVariant();
const metaColors = themeMetaColors[themeVariant];
const fonts = getThemeFonts(themeVariant);

/**
 * Root metadata for the Solo Website – Sitecore DevEx demo.
 * This is a Developer Experience showcase built with Sitecore Content SDK, SitecoreAI,
 * and Next.js, following all Sitecore best practices and cleaned-up patterns.
 */
export const metadata: Metadata = {
  title: {
    default:
      "Solo Website | Sitecore DevEx Demo – SitecoreAI & Content SDK Best Practices",
    template: "%s | Solo Website",
  },
  description:
    "A Sitecore Developer Experience (DevEx) demo showcasing best practices for Sitecore SitecoreAI, Content SDK, and Next.js. Built with App Router, SXA, and Design Library. Clean, production-ready patterns for component development, personalization, and headless CMS integration.",
  keywords: [
    "Sitecore",
    "SitecoreAI",
    "Content SDK",
    "Next.js",
    "DevEx",
    "Developer Experience",
    "SXA",
    "Headless CMS",
    "Sitecore MVP",
    "Christian Hahn",
  ],
  authors: [{ name: "Christian Hahn", url: "https://hahn-solo.training" }],
  creator: "Christian Hahn",
  openGraph: {
    type: "website",
    locale: "en_US",
    title:
      "Solo Website | Sitecore DevEx Demo – SitecoreAI & Content SDK Best Practices",
    description:
      "A Sitecore Developer Experience demo showcasing best practices. Clean, production-ready patterns for SitecoreAI, Content SDK, and Next.js.",
    siteName: "Solo Website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Solo Website | Sitecore DevEx Demo",
    description:
      "Sitecore SitecoreAI & Content SDK best practices demo. DevEx showcase by Christian Hahn.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: metaColors.light },
    { media: "(prefers-color-scheme: dark)", color: metaColors.dark },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (typeof window !== "undefined") {
    suppressResizeObserverErrors();
  }

  return (
    <html
      lang="en"
      className={`${fonts.sans.variable} ${fonts.mono.variable}`}
      data-theme={themeVariant}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
      <Analytics />
    </html>
  );
}
