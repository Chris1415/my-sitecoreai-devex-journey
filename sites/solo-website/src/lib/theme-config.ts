// Theme configuration based on environment variable
export type ThemeVariant = "red" | "purple";

export function getThemeVariant(): ThemeVariant {
  // Use NEXT_PUBLIC_ prefix so it's available in the browser
  const themeEnv = process.env.NEXT_PUBLIC_THEME_VARIANT?.toLowerCase();
  return themeEnv === "purple" ? "purple" : "red";
}

export const themeColors = {
  red: {
    light: {
      primary: "oklch(0.58 0.21 25)", // Red/coral from SOLO logo
      destructive: "oklch(0.58 0.21 25)",
      chart1: "oklch(0.58 0.21 25)",
      chart2: "oklch(0.6 0.118 184.704)", // Teal
      chart3: "oklch(0.398 0.07 227.392)", // Blue
      sidebarPrimary: "oklch(0.58 0.21 25)",
    },
    dark: {
      primary: "oklch(0.65 0.21 25)", // Lighter red for dark mode
      destructive: "oklch(0.65 0.21 25)",
      chart1: "oklch(0.65 0.21 25)",
      chart2: "oklch(0.696 0.17 162.48)", // Teal
      chart3: "oklch(0.769 0.188 70.08)", // Yellow
      sidebarPrimary: "oklch(0.488 0.243 264.376)",
    },
  },
  purple: {
    light: {
      primary: "oklch(0.54 0.22 280)", // Purple from logo
      destructive: "oklch(0.58 0.21 25)", // Keep red for destructive actions
      chart1: "oklch(0.54 0.22 280)", // Purple
      chart2: "oklch(0.65 0.15 200)", // Turquoise
      chart3: "oklch(0.6 0.118 184.704)", // Teal
      sidebarPrimary: "oklch(0.54 0.22 280)", // Purple
    },
    dark: {
      primary: "oklch(0.62 0.22 280)", // Lighter purple for dark mode
      destructive: "oklch(0.65 0.21 25)", // Keep red for destructive actions
      chart1: "oklch(0.62 0.22 280)", // Purple
      chart2: "oklch(0.7 0.15 200)", // Lighter turquoise
      chart3: "oklch(0.696 0.17 162.48)", // Teal
      sidebarPrimary: "oklch(0.62 0.22 280)", // Purple
    },
  },
};

export const themeMetaColors = {
  red: {
    light: "#EB1F1F",
    dark: "#F03E3E",
  },
  purple: {
    light: "#6B4FE0",
    dark: "#8B6FFF",
  },
};
