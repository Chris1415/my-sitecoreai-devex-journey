# Sitecore Content SDK – SitecoreAI Next.js Application

This repository contains a **Sitecore Content SDK** Next.js application for Sitecore SitecoreAI development. Built with the App Router, React Server Components, and SXA (Sitecore Experience Accelerator), it is designed to get developers up and running quickly with a front-end project integrated with Sitecore SitecoreAI.

[Sitecore Content SDK Documentation](https://doc.sitecore.com/xmc/en/developers/content-sdk/sitecore-content-sdk-for-xm-cloud.html) · [Deploying SitecoreAI](https://doc.sitecore.com/xmc/en/developers/xm-cloud/deploying-xm-cloud.html)

Here's a quick overview of the major folders and their purpose:

- **`/sites`**  
  Contains the front-end applications. Each subfolder is a working app:
  - **solo-website**: [README](sites/solo-website/README.md) – **Sitecore DevEx demo** with Content SDK, SXA, App Router, Design Library, **SitecoreAI integrated search**, dual themes (red/purple). Clean, best-practice patterns for SitecoreAI.

- **`/local-containers`**  
  Contains Docker-related files for local development (CM, Node.js, Traefik). See [local-containers/README.md](local-containers/README.md).

- **`/authoring`**  
  Sitecore content items for deployment. Includes:
  - **Templates**: Under `/items` – structure of content items used in the application
  - **Layouts**: Layout definitions (e.g. `layoutsProject/solo`)
  - **Renderings**: Component mappings (HeroBanner, MediaText, Tagcloud, Stats, FAQ, Highlights, Events, News, etc.)
  - **Modules**: SXA modules with `.module.json` (e.g. Project.solo) for deployment

- **`xmcloud.build.json`**  
  Primary configuration for building and deploying rendering hosts in SitecoreAI.

  Key sections:
  - **renderingHosts**: Defines one or more front-end apps to build. Each entry includes:
    - **path**: App location (e.g. `./sites/solo-website`)
    - **nodeVersion**: Node.js version for build (22.13.0)
    - **jssDeploymentSecret**: Deployment auth key for JSS
    - **enabled**: Whether the rendering host is active
    - **buildCommand / runCommand**: Custom scripts (e.g. `build`, `next:start`)
    - **type**: `sxa` for SXA-based apps
  - **postActions**: Warm-up, SCS modules, reindex, schema population
  - **authoringPath**: Path to Sitecore item definitions (default `./authoring`)

## GitHub Template

This repository can be used as a template. Click **Use this template** at the top to create your own.

### Prerequisites

- Access to a Sitecore SitecoreAI environment
- [Node.js LTS](https://nodejs.org/en/) (22.x recommended)

### Getting Started Guide

Follow the [Sitecore Documentation](https://doc.sitecore.com/xmc) to create an SitecoreAI project, provision an environment, deploy the application, and create your first component.

### Running solo-website Locally

> **Note:** See `sites/solo-website/README.md` for detailed setup. General steps:

1. Log into the Sitecore SitecoreAI Deploy Portal → Environment → **Developer Settings**
2. Turn on the **Preview** toggle
3. Copy the sample `.env` from the **Local Development** section
4. Create `.env.local` in `sites/solo-website` and paste the contents
5. Run:

   ```bash
   cd sites/solo-website
   npm install
   npm run dev
   ```

6. Open `http://localhost:3000` and verify Sitecore content in real time.

### Technology Stack (solo-website)

- **Next.js 15** – App Router, React Server Components
- **Sitecore Content SDK** (`@sitecore-content-sdk/nextjs`) – SitecoreAI integration
- **SitecoreAI integrated search** – Global search across articles, FAQs, personas via Content SDK Search
- **TypeScript** – Strict typing
- **Tailwind CSS 4** & **Shadcn/ui** – Styling and UI
- **next-intl** – Internationalization
- **Vercel Analytics** (optional)

### Environment Variables

Required for `sites/solo-website` (see `.env.remote.example`):

- `SITECORE_EDITING_SECRET` – Editor endpoint security
- `NEXT_PUBLIC_DEFAULT_SITE_NAME` – Site name
- `SITECORE_EDGE_CONTEXT_ID` / `NEXT_PUBLIC_SITECORE_EDGE_CONTEXT_ID` – Edge context
- `SITECORE_AUTH_CLIENT_ID` / `SITECORE_AUTH_CLIENT_SECRET` – Design Library (optional)

## Development Workflow

This repository uses a **DMZ git workflow** so the `main` branch stays clean and deployable.

### Overview

- **`main` branch**: Always clean and deployable (no direct commits)
- **`dmz` branch**: Integration branch where PRs are merged and validated
- **Feature branches**: Created from `main`, PRs target `dmz`

### Requirements

1. Create feature branches from the latest `main`
2. Open PRs to `dmz` (not `main`)
3. Use **Squash and merge** only
4. Rebase onto latest `main` before creating a PR
5. PR validation runs automatically (lint, build, test, type-check)
6. After merge to `dmz`, CI validates; `main` is updated via merge commits (e.g. every 1–2 weeks)

### For Contributors

**[DMZ Workflow Guide](.github/DMZ-WORKFLOW.md)** – Instructions, common issues, and practices.

### For Maintainers

**[DMZ Quick Reference](.github/DMZ-QUICK-REFERENCE.md)** – Quick reference for the DMZ workflow and validation.

## AI-Assisted Development

This repository includes AI guidance for consistent code quality and Sitecore SitecoreAI practices:

- **Claude Code Guide** (`CLAUDE.md`) – Architecture, coding standards, and Sitecore patterns
- **Cursor AI Rules** (`.cursor/rules/`) – Context and patterns for Cursor AI
- **Windsurf IDE Rules** (`.windsurfrules`) – Standards and folder structure for Windsurf
- **GitHub Copilot Instructions** (`copilot-instructions.md`) – Component and development patterns
- **LLM Guidance** (`LLMs.txt`) – Architecture principles and safety rules

These apply whether you use Claude Code, Cursor AI, Windsurf IDE, GitHub Copilot, or other AI assistants. See [CONTRIBUTING.md](CONTRIBUTING.md#ai-assisted-development) for usage details.

---

## Author

<table>
  <tr>
    <td align="center">
      <img src="docs/author-logo.png" alt="Christian Hahn" width="80" height="80" />
    </td>
    <td>
      <strong>Christian Hahn</strong><br />
      <em>Sitecore Content SDK · SitecoreAI · Next.js</em>
    </td>
  </tr>
</table>

