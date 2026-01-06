import type { ClientSDK, ApplicationContext } from "@sitecore-marketplace-sdk/client";
import { Agent } from "@sitecore-marketplace-sdk/xmc";


/**
 * Fetches available sites from Sitecore using the Marketplace SDK
 */
export async function fetchSites(
  client: ClientSDK,
  appContext: ApplicationContext
): Promise<{ sites: Agent.SiteBasicModel[]; error: string | null }> {
  const previewContextId = appContext?.resourceAccess?.[0]?.context?.preview ?? "";

  if (!previewContextId) {
    return {
      sites: [],
      error: "No preview context ID available",
    };
  }

  try {
    const response = await client.query("xmc.agent.sitesGetSitesList", {
      params: {
        query: {
          sitecoreContextId: previewContextId,
        },
      },
    });

    const sites = response?.data?.data?.sites ?? [];
    
    return {
      sites,
      error: null,
    };
  } catch (err) {
    console.error("Error fetching sites:", err);
    return {
      sites: [],
      error: err instanceof Error ? err.message : "Failed to fetch sites",
    };
  }
}
