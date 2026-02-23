## Solo Website Agent Guide (sites/solo-website)

This guide defines the expected AI/agent behavior **specifically** for `sites/solo-website`.

### Decision-making priority (highest first)
1. `sites/solo-website/.cursor/rules/*.mdc`
2. Existing code patterns in `sites/solo-website/src/**`
3. Repo-wide guidance (`/.cursor/rules/*.mdc`, `CLAUDE.md`, `LLMs.txt`, `copilot-instructions.md`)
4. Other starters under `/examples` (reference only if solo-website has no pattern)

### Files to consider before making changes in solo-website
- `sites/solo-website/.cursor/rules/*.mdc`
- `sites/solo-website/src/lib/component-props/index.ts`
- `sites/solo-website/src/lib/utils.ts` (notably `isDesignView`)
- The closest sibling component(s) under `sites/solo-website/src/components/**`
- `sites/solo-website/package.json`, `sites/solo-website/tsconfig.json`, `sites/solo-website/next.config.ts` (when build/runtime behavior matters)

### Solo-website component conventions (observed pattern)
When editing/creating components under `sites/solo-website/src/components/**`:
- **Props**: extend `ComponentProps` from `lib/component-props`
- **Fields shape** depends on **data retrieval strategy** (see `choose-solo-field-shape` skill):
  - **Datasource item** (no IGQL): `fields.Title`, `fields.Quote` – fields directly on props
  - **Integrated GraphQL** (IGQL): `fields.data.datasource` – GraphQL result shape (e.g. Tagcloud, Highlights, Stats)
- **Styling**: preserve `params.styles` behavior (outer wrapper class)
- **Design mode**: if the component appears in Page/Partial designs, support:
  - `if (isDesignView(page)) return <DesignViewFallback params={params} />;`
  - where `DesignViewFallback` is static and does not require real content

### Common workflows

#### Create a new component
- Find the closest existing solo-website component and match:
  - props/fields typing
  - `params.styles` wrapper
  - design-view fallback pattern (if needed)
  - Content SDK field rendering components (`Text`, `RichText`, `Image`, etc.)

#### Modify an existing component
- Preserve public behavior (export shape, rendering output, `params.styles`)
- Keep design-view fallback working (if present)
- Avoid broad refactors unless explicitly requested

### Safety / guardrails
- Do not edit generated artifacts (`node_modules/`, `.next/`, lock files, `.env.local`)
- Never add secrets to source
- Prefer small, localized changes
- Call out pattern mismatches (e.g., `fields` vs `fields.data.datasource`) and follow **solo-website's** local convention
