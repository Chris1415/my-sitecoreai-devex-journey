import { ThemeProvider } from "next-themes";
import "./globals.css";
import { suppressResizeObserverErrors } from "lib/utils";
import { getThemeVariant, themeMetaColors } from "lib/theme-config";
import { Viewport } from "next/types";
import { getThemeFonts } from "lib/fonts";

const themeVariant = getThemeVariant();
const metaColors = themeMetaColors[themeVariant];
const fonts = getThemeFonts(themeVariant);

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
    </html>
  );
}
