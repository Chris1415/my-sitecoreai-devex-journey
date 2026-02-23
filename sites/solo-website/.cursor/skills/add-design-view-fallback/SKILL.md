---
name: add-design-view-fallback
description: Adds a design-view fallback for Page/Partial designs using the sites/solo-website isDesignView(page) convention and params.styles wrapper. Use when a component must render predictably in design contexts.
---

## Add design view fallback (solo-website)

### Steps
1. Import:
   - `import { isDesignView } from "lib/utils";`
2. Create a static fallback:
   - `function DesignViewFallback({ params }: { params: ComponentProps["params"] }) { ... }`
3. Short-circuit early:
   - `if (isDesignView(page)) return <DesignViewFallback params={params} />;`
4. Ensure wrapper styling remains consistent:
   - use `params.styles` on the fallback wrapper too

### Output format
- Provide the updated component code (full file or focused diff)
