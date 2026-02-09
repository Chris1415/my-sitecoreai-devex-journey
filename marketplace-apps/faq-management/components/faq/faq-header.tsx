"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Download, HelpCircle, Globe } from "lucide-react";
import { ImportDialog } from "@/components/import-dialog";
import { useSites } from "@/hooks/use-sites";

export interface SiteInfo {
  name: string;
}

interface FAQHeaderProps {
  onExport: () => void;
  onImport: (file: File) => void;
  onNewGroup: () => void;
  canExport: boolean;
}

export function FAQHeader({
  onExport,
  onImport,
  onNewGroup,
  canExport,
}: FAQHeaderProps) {
  const {
    sites,
    selectedSite,
    setSelectedSite,
    loading: sitesLoading,
  } = useSites();

  return (
    <header className="sticky top-0 z-10 border-b border-border/60 bg-background/95 backdrop-blur-xl supports-backdrop-filter:bg-background/80 shadow-sm">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12 rounded-xl bg-linear-to-br from-blue-100 via-blue-50 to-background flex items-center justify-center shadow-md border border-blue-200 group-hover:scale-110 transition-transform">
            <HelpCircle className="w-6 h-6 text-blue-500 animate-pulse" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight bg-linear-to-r from-foreground to-foreground/70 bg-clip-text">
              FAQ Management
            </h1>
            <p className="text-sm text-muted-foreground font-medium">
              Organize and manage your knowledge base
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {sitesLoading ? (
            <Skeleton className="w-[160px] h-10 rounded-md" />
          ) : (
            <Select value={selectedSite} onValueChange={setSelectedSite}>
              <SelectTrigger className="w-[180px] shadow-sm border-border/60">
                <Globe className="w-4 h-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Select site" />
              </SelectTrigger>
              <SelectContent>
                {sites.map((site) => (
                  <SelectItem key={site.name} value={site.name}>
                    {site.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <Button
            onClick={onExport}
            variant="outline"
            size="default"
            className="shadow-sm hover:shadow-md transition-all duration-200 bg-linear-to-r from-background to-muted/30 hover:from-muted/50 hover:to-muted/40 border-border/60"
            disabled={!canExport}
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <ImportDialog onImport={onImport} />
          <Button
            onClick={onNewGroup}
            size="default"
            className="bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-md hover:shadow-lg transition-all duration-200"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Group
          </Button>
        </div>
      </div>
    </header>
  );
}
