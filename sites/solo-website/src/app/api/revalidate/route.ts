import { revalidateTag } from 'next/cache';
import type { NextRequest } from 'next/server';

/**
 * Request body shape from Sitecore webhooks / Content Operations.
 * The identifier format can be "{ID}", "{ID}-media", or "{ID}-layout".
 */
interface RevalidateUpdate {
  identifier: string;
  entity_definition: string;
  operation: string;
  entity_culture: string;
}

interface RevalidateBody {
  invocation_id?: string;
  updates?: RevalidateUpdate[];
  continues?: boolean;
  /** Optional: manual tags to revalidate (e.g. ["page-solo-website-en-home"]) */
  tags?: string[];
}

/**
 * Extracts the base Sitecore item ID from an identifier.
 * Handles formats: "{ID}", "{ID}-media", "{ID}-layout"
 *
 * @param identifier - Full identifier (e.g. "71B0BA0716214254AEE4429B1A970C8B-media")
 * @returns Base ID without suffix (e.g. "71B0BA0716214254AEE4429B1A970C8B")
 */
function extractContentId(identifier: string): string {
  if (!identifier || typeof identifier !== 'string') return '';
  const trimmed = identifier.trim();
  // Strip -media or -layout suffix
  return trimmed.replace(/-(?:media|layout)$/i, '');
}

const LOG_PREFIX = '[revalidate]';

export async function POST(request: NextRequest) {
  try {
    const secret = process.env.REVALIDATION_SECRET;
    const hasAuth = Boolean(secret);
    const hasHeader = request.headers.has('x-header');

    console.log(`${LOG_PREFIX} POST received | auth configured: ${hasAuth} | x-header present: ${hasHeader}`);

    // Optional: verify revalidation secret via x-header
    if (secret) {
      const headerSecret = request.headers.get('x-header');

      if (headerSecret !== secret) {
        console.warn(`${LOG_PREFIX} Auth failed | x-header mismatch or missing`);
        return Response.json(
          { error: 'Unauthorized', message: 'Invalid or missing x-header' },
          { status: 401 }
        );
      }
      console.log(`${LOG_PREFIX} Auth OK`);
    }

    let body: RevalidateBody;
    try {
      body = await request.json();
    } catch (e) {
      console.warn(`${LOG_PREFIX} Invalid JSON body:`, e);
      return Response.json(
        { error: 'Bad Request', message: 'Invalid JSON body' },
        { status: 400 }
      );
    }

    const updates = body?.updates ?? [];
    const manualTags = Array.isArray(body?.tags) ? body.tags : [];

    const contentIds = new Set<string>(manualTags);
    for (const u of updates) {
      const id = extractContentId(u?.identifier ?? '');
      if (id) contentIds.add(id);
    }

    if (contentIds.size === 0) {
      console.warn(`${LOG_PREFIX} Bad request | no tags to revalidate`);
      return Response.json(
        { error: 'Bad Request', message: 'Provide "updates" (webhook) or "tags" (manual)' },
        { status: 400 }
      );
    }

    const tags = Array.from(contentIds);
    console.log(
      `${LOG_PREFIX} Processing | invocation_id: ${body.invocation_id ?? '(none)'} | updates: ${updates.length} | unique tags: ${tags.length} | tags: [${tags.join(', ')}]`
    );

    for (const tag of tags) {
      revalidateTag(tag, "max");
      console.log(`${LOG_PREFIX} Revalidated tag: "${tag}"`);
    }

    const response = {
      revalidated: true,
      invocation_id: body.invocation_id ?? null,
      tags,
      count: contentIds.size,
      continues: body.continues ?? false,
      now: Date.now(),
    };
    console.log(`${LOG_PREFIX} Success | revalidated ${tags.length} tag(s)`);
    return Response.json(response);
  } catch (error) {
    console.error(`${LOG_PREFIX} Error:`, error);
    return Response.json(
      {
        error: 'Internal Server Error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
