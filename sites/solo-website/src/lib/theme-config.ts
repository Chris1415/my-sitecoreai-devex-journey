// Theme configuration based on environment variable
export type ThemeVariant = "red" | "purple"

export function getThemeVariant(): ThemeVariant {
  // Use NEXT_PUBLIC_ prefix so it's available in the browser
  const themeEnv = process.env.NEXT_PUBLIC_THEME_VARIANT?.toLowerCase()
  return themeEnv === "purple" ? "purple" : "red"
}

export const themeConfig = {
  red: {
    name: "Solo Red - Sharp & Modern",
    fonts: {
      sans: "Space Grotesk", // Geometric, technical font
      display: "Space Grotesk",
      mono: "JetBrains Mono",
    },
    fontImports: ["Space+Grotesk:wght@400;500;600;700", "JetBrains+Mono:wght@400;500;600"],
    radius: {
      base: "0.25rem", // 4px - very sharp corners
      card: "0.5rem", // 8px
      button: "0.25rem", // 4px - sharp buttons
    },
    typography: {
      headingScale: "tight",
      bodyLeading: "1.5", // Tighter line height
      headingWeight: "700", // Bold headings
      letterSpacing: "-0.02em", // Tighter letter spacing
      textTransform: "uppercase", // Uppercase for accents
    },
    spacing: {
      section: "3rem", // Compact 48px
      component: "1.5rem", // Compact 24px
      card: "1rem", // 16px
    },
    effects: {
      shadow: "none", // No shadows, flat design
      border: "1px", // Thin, precise borders
      transition: "100ms", // Very fast, snappy
      hover: "scale-105", // Pronounced hover effects
    },
    visual: {
      style: "geometric", // Sharp, angular aesthetic
      density: "compact", // More content visible
    },
  },
  purple: {
    name: "Solo Purple - Soft & Friendly",
    fonts: {
      sans: "Poppins", // Friendly, rounded font
      display: "Poppins",
      mono: "Source Code Pro",
    },
    fontImports: ["Poppins:wght@400;500;600;700;800", "Source+Code+Pro:wght@400;500;600"],
    radius: {
      base: "1.5rem", // 24px - very rounded
      card: "2rem", // 32px - pillow-like cards
      button: "2rem", // 32px - pill-shaped buttons
    },
    typography: {
      headingScale: "relaxed",
      bodyLeading: "1.8", // More spacious line height
      headingWeight: "600", // Medium weight headings
      letterSpacing: "0.01em", // Slightly wider
      textTransform: "none", // Natural case
    },
    spacing: {
      section: "6rem", // Generous 96px
      component: "3rem", // Generous 48px
      card: "2rem", // 32px
    },
    effects: {
      shadow: "xl", // Large, soft shadows
      border: "2px", // Thicker, softer borders
      transition: "300ms", // Smooth, gentle
      hover: "translate-y-[-4px]", // Lift on hover
    },
    visual: {
      style: "organic", // Soft, rounded aesthetic
      density: "spacious", // More breathing room
    },
  },
}

export const themeColors = {
  red: {
    light: {
      primary: "oklch(0.58 0.21 25)", // Red/coral from SOLO logo
      primaryHover: "oklch(0.52 0.21 25)", // Darker red on hover
      destructive: "oklch(0.58 0.21 25)",
      chart1: "oklch(0.58 0.21 25)",
      chart2: "oklch(0.6 0.118 184.704)", // Teal
      chart3: "oklch(0.398 0.07 227.392)", // Blue
      sidebarPrimary: "oklch(0.58 0.21 25)",
      background: "oklch(1 0 0)", // Pure white
      muted: "oklch(0.96 0 0)", // Light gray
      border: "oklch(0.88 0 0)", // Darker borders for definition
    },
    dark: {
      primary: "oklch(0.65 0.21 25)",
      primaryHover: "oklch(0.70 0.21 25)",
      destructive: "oklch(0.65 0.21 25)",
      chart1: "oklch(0.65 0.21 25)",
      chart2: "oklch(0.696 0.17 162.48)",
      chart3: "oklch(0.769 0.188 70.08)",
      sidebarPrimary: "oklch(0.488 0.243 264.376)",
      background: "oklch(0.12 0 0)", // Almost black
      muted: "oklch(0.22 0 0)",
      border: "oklch(0.30 0 0)",
    },
  },
  purple: {
    light: {
      primary: "oklch(0.54 0.22 280)", // Purple from logo
      primaryHover: "oklch(0.60 0.22 280)", // Lighter purple on hover
      destructive: "oklch(0.58 0.21 25)",
      chart1: "oklch(0.54 0.22 280)",
      chart2: "oklch(0.65 0.15 200)", // Turquoise
      chart3: "oklch(0.6 0.118 184.704)",
      sidebarPrimary: "oklch(0.54 0.22 280)",
      background: "oklch(0.98 0.01 280)", // Slight purple tint
      muted: "oklch(0.94 0.02 280)", // Purple-tinted gray
      border: "oklch(0.85 0.02 280)", // Softer borders
    },
    dark: {
      primary: "oklch(0.62 0.22 280)",
      primaryHover: "oklch(0.68 0.22 280)",
      destructive: "oklch(0.65 0.21 25)",
      chart1: "oklch(0.62 0.22 280)",
      chart2: "oklch(0.7 0.15 200)",
      chart3: "oklch(0.696 0.17 162.48)",
      sidebarPrimary: "oklch(0.62 0.22 280)",
      background: "oklch(0.15 0.03 280)",
      muted: "oklch(0.25 0.03 280)",
      border: "oklch(0.32 0.03 280)",
    },
  },
}

export const themeMetaColors = {
  red: {
    light: "#EB1F1F",
    dark: "#F03E3E",
  },
  purple: {
    light: "#6B4FE0",
    dark: "#8B6FFF",
  },
}
