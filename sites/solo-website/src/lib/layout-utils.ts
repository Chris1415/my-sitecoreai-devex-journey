/**
 * Extracts all Sitecore item IDs from a layout model.
 * Traverses the layout recursively, collecting:
 * - itemId fields
 * - datasource / dataSource fields (GUID, {GUID}, or object with itemId)
 * - Supports nested structure: data.layout.item.rendered.sitecore.route
 */

const DATASOURCE_KEYS = ['datasource', 'dataSource'] as const;

/** Extract and normalize GUID from string (handles {GUID} and plain GUID). */
function extractGuid(value: string): string | null {
  if (!value || typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  const unbraced = trimmed.replace(/^\{|\}$/g, '');
  const normalized = unbraced.replace(/-/g, '');
  if (/^[a-fA-F0-9]{32}$/.test(normalized)) {
    return normalized.toUpperCase();
  }
  return null;
}

function addId(ids: Set<string>, value: unknown): void {
  if (typeof value !== 'string') return;
  const guid = extractGuid(value);
  if (guid) ids.add(guid);
}

function traverse(obj: unknown, ids: Set<string>, seen: WeakSet<object>): void {
  if (obj === null || obj === undefined) return;

  if (typeof obj !== 'object') return;

  // Avoid cycles
  if (seen.has(obj as object)) return;
  seen.add(obj as object);

  const o = obj as Record<string, unknown>;

  // Collect itemId only
  if ('itemId' in o) addId(ids, o.itemId);

  // Collect datasource (string or object with itemId)
  for (const key of DATASOURCE_KEYS) {
    const ds = o[key];
    if (typeof ds === 'string') {
      addId(ids, ds);
    } else if (ds && typeof ds === 'object' && !Array.isArray(ds)) {
      const d = ds as Record<string, unknown>;
      if ('itemId' in d) addId(ids, d.itemId);
    }
  }

  // Recurse into children
  for (const [key, value] of Object.entries(o)) {
    if (value === null || value === undefined) continue;
    if (Array.isArray(value)) {
      for (const item of value) traverse(item, ids, seen);
    } else if (typeof value === 'object') {
      traverse(value, ids, seen);
    }
  }
}

/**
 * Extracts all unique Sitecore item IDs from a layout model.
 * Traverses placeholders, renderings, fields, and nested structures.
 *
 * @param layout - Layout data (LayoutServiceData or any nested structure)
 * @returns Set of item IDs (uppercase, no hyphens)
 */
export function extractLayoutItemIds(layout: unknown): Set<string> {
  const ids = new Set<string>();
  const seen = new WeakSet<object>();
  traverse(layout, ids, seen);
  return ids;
}

/**
 * Same as extractLayoutItemIds but returns an array.
 */
export function extractLayoutItemIdsArray(layout: unknown): string[] {
  return Array.from(extractLayoutItemIds(layout));
}
