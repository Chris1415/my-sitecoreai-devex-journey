"use client";

import { useEffect, useState } from "react";

/**
 * Returns true when the viewport matches the given media query.
 * SSR-safe: returns false on server and during first client paint.
 * @param query - CSS media query (e.g. "(min-width: 768px)")
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, [query]);

  return matches;
}
