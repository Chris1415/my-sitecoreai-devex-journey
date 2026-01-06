"use client";

import { MarketplaceProvider } from "@/components/providers/marketplace";

export default function FullScreenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MarketplaceProvider>{children}</MarketplaceProvider>;
}

