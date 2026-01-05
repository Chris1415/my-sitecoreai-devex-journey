import { Space_Grotesk, JetBrains_Mono } from "next/font/google"
import { Poppins, Source_Code_Pro } from "next/font/google"

// Red theme fonts: Geometric, technical, modern
export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
})

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  weight: ["400", "500", "600"],
})

// Purple theme fonts: Friendly, rounded, approachable
export const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
})

export const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  weight: ["400", "500", "600"],
})

// Helper to get fonts based on theme
export function getThemeFonts(theme: "red" | "purple") {
  if (theme === "purple") {
    return {
      sans: poppins,
      mono: sourceCodePro,
    }
  }
  return {
    sans: spaceGrotesk,
    mono: jetbrainsMono,
  }
}
