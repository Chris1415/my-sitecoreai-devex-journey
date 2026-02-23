## Solo Website Skills (Cursor)

Skills are repeatable workflows for `sites/solo-website`. They complement (but do not replace) rules in `sites/solo-website/.cursor/rules/`.

### Skill index
- `create-solo-component`
  - Use when creating a new component under `sites/solo-website/src/components/**`
- `review-solo-component`
  - Use when asked to review/refactor a component while keeping solo-website conventions
- `add-design-view-fallback`
  - Use when a component must render predictably in Page/Partial design contexts
- `choose-solo-field-shape`
  - Use when unsure whether to use `fields` directly vs `fields.data.datasource` (solo-website vs examples pattern)

### Where they live
- `sites/solo-website/.cursor/skills/<skill-name>/SKILL.md`
