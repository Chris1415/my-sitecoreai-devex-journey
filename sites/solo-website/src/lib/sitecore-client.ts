import { LayoutService } from "@sitecore-content-sdk/nextjs";
import {
  createGraphQLClientFactory,
  SitecoreClient,
} from "@sitecore-content-sdk/nextjs/client";
import scConfig from "sitecore.config";
import { extractLayoutItemIdsArray } from "src/lib/layout-utils";

/** Extracts site, routePath, and language from GraphQL layout request body. */
function extractLayoutParamsFromBody(
  body: BodyInit | null | undefined
): { site: string | null; routePath: string | null; language: string | null } {
  const empty = { site: null, routePath: null, language: null };
  if (body == null) return empty;
  try {
    const parsed = typeof body === "string" ? JSON.parse(body) : body;
    const query = parsed?.query ?? (typeof parsed === "string" ? parsed : null);
    if (!query) return empty;
    const q = String(query);
    return {
      site: q.match(/site:\s*"([^"]*)"/)?.[1] ?? null,
      routePath: q.match(/routePath:\s*"([^"]*)"/)?.[1] ?? null,
      language: q.match(/language:\s*"([^"]*)"/)?.[1] ?? null,
    };
  } catch {
    return empty;
  }
}

class MyLayoutService extends LayoutService {
  /**
   * Gets a GraphQL client that can make requests to the API.
   * First fetch (no-cache) extracts layout item IDs from the response.
   * Second fetch (force-cache) caches with tags: ['layout', ...extractedIds]
   * so revalidateTag(id) from webhooks invalidates the correct cache.
   */
  protected getGraphQLClient() {
    return this.serviceConfig.clientFactory({
      debugger: this.serviceConfig.debugger,
      retries: this.serviceConfig.retries?.count,
      retryStrategy: this.serviceConfig.retries?.retryStrategy,
      fetch: async (url, options) => {
        const firstResponse = await fetch(url, {
          ...options,
        });

        let tags = [] as string[];
        try {
          const cloned = firstResponse.clone();
          const data = await cloned.json();
          const ids = extractLayoutItemIdsArray(data);
          if (ids.length > 0) {
            tags = [...ids];
          }
        } catch {
          // Fallback to layout-only tag if parse fails
        }

        const { site, routePath, language } =
          extractLayoutParamsFromBody(options?.body);
        const ctx = {
          site: site ?? "(unknown)",
          routePath: routePath ?? "(unknown)",
          language: language ?? "(unknown)",
        };
        console.log(
          `[sitecore-client] Layout cache tags [site=${ctx.site} routePath=${ctx.routePath} language=${ctx.language}]:`,
          tags
        );

        return fetch(url, {
          ...options,
          cache: "force-cache" as RequestCache,
          next: { tags, revalidate: 600 },
        });
      },
    });
  }
}

const client = new SitecoreClient({
  ...scConfig,
  custom: {
    layoutService: new MyLayoutService({
      clientFactory: createGraphQLClientFactory({
        api: scConfig.api,
        retries: scConfig.retries.count,
        retryStrategy: scConfig.retries.retryStrategy,
      }),
    }),
  },
});

export default client;
