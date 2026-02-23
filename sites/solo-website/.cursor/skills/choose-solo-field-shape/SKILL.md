---
name: choose-solo-field-shape
description: Resolves whether to use fields directly vs fields.data.datasource based on the component's data retrieval strategy (datasource item vs Integrated GraphQL). Use when creating or modifying components.
---

## Choose fields shape (data retrieval strategy)

The shape of `fields` depends on **how the Sitecore rendering gets its data**, not on the app path.

### 1. Datasource item (no Integrated GraphQL)

- **When**: The rendering has **no Component GraphQL Query** attached. Layout Service returns the datasource item's template fields directly.
- **Shape**: Fields are passed directly on props.
- **Example**: Quote component – `fields.Quote`, `fields.Title`.

```typescript
interface QuoteProps extends ComponentProps {
  fields: {
    Quote: TextField;
  };
}
// Access: const { Quote } = fields;
```

### 2. Integrated GraphQL (IGQL)

- **When**: The rendering has a **Component GraphQL Query** attached. The Layout Service runs that query and its result **replaces** the default datasource output.
- **Shape**: GraphQL response shape – `fields.data.datasource` (plus any query-defined children, etc.).
- **Example**: Tagcloud, Highlights, Stats – `fields.data.datasource.Title`, `fields.data.datasource.children.results`.

```typescript
interface TagcloudProps extends ComponentProps {
  fields: {
    data: {
      datasource: {
        Title: { jsonValue: TextField };
        children: { results: TagElement[] };
      };
    };
  };
}
// Access: const datasource = fields?.data?.datasource;
//         const Elements = datasource?.children?.results ?? [];
```

### How to decide

1. **Check the rendering in Sitecore**: Does it have a "Component GraphQL Query"?
   - **No** → Datasource item shape (fields direct).
   - **Yes** → Integrated GraphQL shape (`fields.data.datasource`).
2. **Match sibling components**: Same rendering / same folder usually share the same strategy.
3. **Do not mix** strategies within one component.

### IGQL components – safe access (required)

For `fields.data.datasource` components, always guard before use:

```typescript
const datasource = fields?.data?.datasource;
if (!datasource) {
  if (page?.mode?.isEditing) return <div>Please configure {componentName} datasource</div>;
  return null;
}
const Elements = datasource?.children?.results ?? [];
// Safe: Elements.map(...)
```

### Output format

- State which strategy applies (datasource item vs IGQL) and why.
- Provide the correct props interface and safe access pattern.
