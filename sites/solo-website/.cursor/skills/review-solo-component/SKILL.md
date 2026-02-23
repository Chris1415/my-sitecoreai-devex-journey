---
name: review-solo-component
description: Reviews a sites/solo-website component for correctness and consistency with local patterns (ComponentProps, fields-on-props, params.styles, and isDesignView fallback). Use when reviewing PRs or refactoring components.
---

## Review solo-website component

### Checklist
- **Props/fields**
  - Extends `ComponentProps` from `lib/component-props`
  - Fields shape matches data strategy: **datasource item** (fields direct) vs **Integrated GraphQL** (`fields.data.datasource`)
- **Styling**
  - Preserves `params.styles` contract
- **Design mode**
  - If used in Page/Partial designs, has `isDesignView(page)` + static fallback
- **Field safety**
  - **IGQL components**: guard `fields?.data?.datasource` before use; use `?? []` for list results
  - No unsafe nested destructuring
  - Optional chaining for `page.layout.sitecore...` access
- **Imports**
  - No server-only Content SDK imports inside client components
- **Safety**
  - No edits to generated artifacts / secrets

### Output format
- Findings grouped as:
  - Critical (must fix)
  - Recommendation (should fix)
  - Optional (nice to have)
- Provide concrete patch suggestions
