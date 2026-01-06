"use client";

import { useState, useEffect, useCallback } from "react";
import { useMarketplaceClient, useAppContext } from "@/components/providers/marketplace";
import { fetchSites } from "@/services/site-service";
import { Agent } from "@sitecore-marketplace-sdk/xmc";

export interface UseSitesReturn {
  sites: Agent.SiteBasicModel[];
  selectedSite: string;
  setSelectedSite: (site: string) => void;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useSites(): UseSitesReturn {
  const client = useMarketplaceClient();
  const appContext = useAppContext();

  const [sites, setSites] = useState<Agent.SiteBasicModel[]>([]);
  const [selectedSite, setSelectedSite] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadSites = useCallback(async () => {
    setLoading(true);
    setError(null);

    const result = await fetchSites(client, appContext);

    if (result.error) {
      setError(result.error);
    } else {
      setSites(result.sites);
      // Auto-select first site if none selected
      if (!selectedSite && result.sites.length > 0) {
        setSelectedSite(result.sites[0].name);
      }
    }

    setLoading(false);
  }, [client, appContext, selectedSite]);

  useEffect(() => {
    // Avoid directly invoking setState in the effect body to prevent cascading renders.
    // Instead, schedule the async state updates in a microtask.
    // This ensures effect execution order and avoids React warnings.
    Promise.resolve().then(loadSites);
    // If you prefer maximum explicitness, you can also use:
    // setTimeout(loadSites, 0);
  }, [loadSites]);

  return {
    sites,
    selectedSite,
    setSelectedSite,
    loading,
    error,
    refetch: loadSites,
  };
}

