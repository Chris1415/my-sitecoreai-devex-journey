"use cache";

import "server-only";
import { unstable_cacheTag } from "next/cache";
import client from "src/lib/sitecore-client";
import { extractLayoutItemIdsArray } from "src/lib/layout-utils";

const CACHED_PAGE_LOG_PREFIX = "[sitecore-client:getCachedPage]";

/**
 * Cached page fetch with response-derived cache tags.
 *
 * Next.js 16 note:
 * - Replace `unstable_cacheTag` with `cacheTag` from `next/cache`.
 * - Keep the same tagging loop.
 *
 * @param path - Route path segments.
 * @param site - Site name.
 * @param locale - Locale code.
 * @returns Page data from Sitecore.
 */
export async function getCachedPage(path: string[], site: string, locale: string) {
  const page = await client.getPage(path, { site, locale });
  const tags = extractLayoutItemIdsArray(page?.layout);

  for (const tag of tags) {
    unstable_cacheTag(tag);
  }

  console.log(
    `${CACHED_PAGE_LOG_PREFIX} unstable tags added total=${tags.length} tags=[${tags.join(", ")}]`,
  );

  return page;
}
