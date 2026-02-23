---
name: create-solo-component
description: Creates a new Sitecore Content SDK component using the established sites/solo-website patterns (ComponentProps + fields-on-props + params.styles + optional isDesignView fallback). Use when adding components under sites/solo-website/src/components.
---

## Create solo-website component

### Use when
- Creating a new component under `sites/solo-website/src/components/**`.

### Required inputs
- **Component name** (PascalCase) and target path
- **Fields** (e.g. `Title: TextField`, `Image: ImageField`, `Cta: LinkField`)
- Whether a **design view fallback** is required

### Steps (match solo-website conventions)
1. Locate a sibling component with similar complexity under `sites/solo-website/src/components/**`.
2. **Choose fields shape** (see `choose-solo-field-shape` skill):
   - **Datasource item** (no IGQL): `fields: { Title: TextField; Quote: TextField; }` – fields directly on props.
   - **Integrated GraphQL** (IGQL): `fields: { data: { datasource: { ... } } }` – GraphQL result shape.
3. Define props: `interface XProps extends ComponentProps { fields: { ... } }`
4. Implement: `export default function Default({ fields, page, params }: XProps) { ... }`
5. Preserve styling contract: wrap with `className={\`\${params.styles}\`}` (or the equivalent used in that folder)
6. **Render fields safely**:
   - **Datasource item**: optional chaining for route-derived overrides.
   - **IGQL**: guard `fields?.data?.datasource` before use; use `children?.results ?? []` for lists.
   - Content SDK field components when appropriate (`Text`, `RichText`, `Image`)
7. (Optional) Add design-view fallback:
   - import `isDesignView` from `lib/utils`
   - add `if (isDesignView(page)) return <DesignViewFallback params={params} />;`
   - `DesignViewFallback` should be static and preview-like

### Output format
- List files created/changed
- Provide final code for each file
