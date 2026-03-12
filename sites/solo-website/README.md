# Solo Website

**Solo Website** is a Sitecore Developer Experience (DevEx) demo that showcases modern best practices for SitecoreAI, Content SDK, and Next.js. From headless content delivery and page editing to **SitecoreAI integrated search**, it demonstrates clean, production-ready patterns that you can adapt for your own projects—whether you're learning the platform, evaluating approaches, or building your next Sitecore implementation.

[![Sitecore Content SDK](https://img.shields.io/badge/Sitecore-Content%20SDK-0ea5e9)](https://doc.sitecore.com/xmc/en/developers/content-sdk/sitecore-content-sdk-for-xm-cloud.html) [![Next.js 15](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/) [![SitecoreAI](https://img.shields.io/badge/XM%20Cloud-Ready-d97706)](https://doc.sitecore.com/xmc)

## What You'll Find

- **SXA integration** – HeroBanner, MediaText, Tagcloud, Stats, FAQ, Highlights, Events, News, and more
- **SitecoreAI integrated search** – Global search across articles, FAQs, and personas powered by Sitecore Content SDK Search and SitecoreAI indexes
- **Design Library** – Page and partial designs with live preview
- **Dual themes** – Red (sharp & modern) or Purple (soft & friendly) via `NEXT_PUBLIC_THEME_VARIANT`
- **Internationalization** – Ready for multi-locale with next-intl

## Tech Stack

| Layer | Technologies |
|-------|--------------|
| Framework | Next.js 15, App Router, React Server Components |
| Sitecore | Content SDK, SitecoreAI, SXA |
| Search | SitecoreAI integrated search (Content SDK `useSearch`) |
| Styling | Tailwind CSS 4, Shadcn/ui |
| i18n | next-intl |
| Analytics | Vercel Analytics (optional) |

## Quick Start

1. **Copy environment template**
   ```bash
   cp .env.remote.example .env.local
   ```

2. **Add your SitecoreAI values**  
   Deploy Portal → your Environment → **Developer Settings** → Local Development → copy `.env` contents into `.env.local`

3. **Install and run**
   ```bash
   npm install
   npm run dev
   ```

4. **Open** [http://localhost:3000](http://localhost:3000)

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `SITECORE_EDGE_CONTEXT_ID` | Edge context (server-side) |
| `NEXT_PUBLIC_SITECORE_EDGE_CONTEXT_ID` | Edge context (client-side) |
| `NEXT_PUBLIC_DEFAULT_SITE_NAME` | Site name |
| `SITECORE_EDITING_SECRET` | Secures editor endpoint |
| `SITECORE_AUTH_CLIENT_ID` / `SITECORE_AUTH_CLIENT_SECRET` | Design Library (optional) |
| `NEXT_PUBLIC_THEME_VARIANT` | `red` (default) or `purple` |

## Project Structure

```
src/
  app/                    # App Router ([site]/[locale]/[[...path]])
  components/
    content/              # Content components (Hero, MediaText, News, Events, etc.)
    global/               # Header, footer, navigation
    content-sdk/          # Sitecore Styles, placeholders
    ui/                   # Shadcn/ui primitives
  lib/                    # Sitecore client, theme config, utils
  i18n/                   # next-intl routing and config
  data/                   # Sample data (articles, events, products, FAQs)
  component-map.ts        # Sitecore component mapping
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server + Sitecore tools (generate-map, build, watch) |
| `npm run build` | Full production build |
| `npm run start` | Run production server |
| `npm run lint` | ESLint |
| `npm run type-check` | TypeScript check |

## Learn More

- [Sitecore Content SDK Documentation](https://doc.sitecore.com/xmc/en/developers/content-sdk/sitecore-content-sdk-for-xm-cloud.html)
- [Deploying to SitecoreAI](https://doc.sitecore.com/xmc/en/developers/xm-cloud/deploying-xm-cloud.html)
