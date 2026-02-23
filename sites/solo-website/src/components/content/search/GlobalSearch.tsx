"use client";

import { useState, useEffect, useRef } from "react";
import { Search, FileText, ShoppingBag, User, HelpCircle } from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "components/ui/dialog";
import { Input } from "components/ui/input";
import { Badge } from "components/ui/badge";
import { Skeleton } from "components/ui/skeleton";
import { Product } from "lib/data";
import { ComponentRendering, Page } from "@sitecore-content-sdk/nextjs";
import { useSearch } from "@sitecore-content-sdk/nextjs/search";
import type { SearchArticle, SearchFaq, SearchPerson } from "./models";
import { INDEX } from "./consts";
import { useEvent } from "./useEvent";

/** Extra delay (ms) before hiding loading skeletons – for debugging. Set to 0 to disable. */
const DEBUG_LOADING_DELAY_MS = 800;

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  page: Page;
  rendering: ComponentRendering;
}

export function Default({
  open,
  onOpenChange,
  page,
  rendering,
}: SearchDialogProps) {
  void page; // required by SearchDialogProps; reserved for future use (e.g. editing mode)
  const [query, setQuery] = useState("");
  const [products] = useState<Product[]>([]);

  /* Search Stuff */
  const pageSize = 10;
  /* const { searchIndex } = useSearchField(searchConfiguration);*/
  const [pageNumber] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchEnabled, setSearchEnabled] = useState<boolean>(false);
  const {
    results: articleResults,
    isLoading: articlesLoading,
    isSuccess: articlesSuccess,
    isError: articlesError,
  } = useSearch<SearchArticle>({
    searchIndexId: INDEX.ARTICLES,
    page: pageNumber,
    pageSize,
    enabled: searchEnabled,
    query: searchQuery,
  });

  const {
    results: faqResults,
    isLoading: faqLoading,
    isSuccess: faqSuccess,
    isError: faqError,
  } = useSearch<SearchFaq>({
    searchIndexId: INDEX.FAQ,
    page: pageNumber,
    pageSize,
    enabled: searchEnabled,
    query: searchQuery,
  });

  const {
    results: persons,
    isLoading: personsLoading,
    isSuccess: personsSuccess,
    isError: personsError,
  } = useSearch<SearchPerson>({
    searchIndexId: INDEX.PERSON,
    page: pageNumber,
    pageSize,
    enabled: searchEnabled,
    query: searchQuery,
  });

  const sendEvent = useEvent({ query: searchQuery, uid: rendering.uid });

  const viewedEventSentRef = useRef(false);

  /** Reset "viewed" sent flag when the search query changes (new search). */
  useEffect(() => {
    viewedEventSentRef.current = false;
  }, [searchQuery]);

  /** Fire "viewed" once when all three searches have settled (success or error). */
  const articlesSettled = articlesSuccess || articlesError;
  const faqSettled = faqSuccess || faqError;
  const personsSettled = personsSuccess || personsError;
  const allSettled =
    searchEnabled && articlesSettled && faqSettled && personsSettled;

  useEffect(() => {
    if (allSettled && !viewedEventSentRef.current) {
      viewedEventSentRef.current = true;
      sendEvent("viewed");

    }
  }, [allSettled, sendEvent]);

  const hasLoading = articlesLoading || faqLoading || personsLoading;
  const [debugDelayPending, setDebugDelayPending] = useState(false);
  const debugDelayRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /** Keep loading state visible for DEBUG_LOADING_DELAY_MS after search finishes (for debugging). */
  useEffect(() => {
    if (hasLoading) {
      if (debugDelayRef.current) {
        clearTimeout(debugDelayRef.current);
        debugDelayRef.current = null;
      }
      setDebugDelayPending(false);
      return;
    }
    if (DEBUG_LOADING_DELAY_MS <= 0) return;
    setDebugDelayPending(true);
    debugDelayRef.current = setTimeout(() => {
      debugDelayRef.current = null;
      setDebugDelayPending(false);
    }, DEBUG_LOADING_DELAY_MS);
    return () => {
      if (debugDelayRef.current) clearTimeout(debugDelayRef.current);
    };
  }, [hasLoading]);

  const showLoadingState = hasLoading || debugDelayPending;
  const SKELETON_ROWS = 4;

  /** Run search after user stops typing (debounce) */
  const searchDebounceMs = 700;
  useEffect(() => {
    const q = query.trim();
    const timeoutId = window.setTimeout(() => {
      setSearchEnabled(!!q);
      setSearchQuery(q || "");
    }, searchDebounceMs);
    return () => window.clearTimeout(timeoutId);
  }, [query]);

  /* Search Stuff End */

  useEffect(() => {
    /*setProducts(getAllProducts());*/
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()),
  );

  const hasResults =
    articleResults.length > 0 ||
    faqResults.length > 0 ||
    persons.length > 0 ||
    filteredProducts.length > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search articles, events, products, authors, and FAQs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
            autoFocus
          />
        </div>

        {!query && (
          <p className="mt-4 text-center text-sm text-muted-foreground py-8">
            Enter something to see results and start search.
          </p>
        )}

        {query && (
          <div className="mt-4 space-y-4">
            {showLoadingState && (
              <>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Skeleton className="h-4 w-4 rounded" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div className="space-y-2">
                    {Array.from({ length: SKELETON_ROWS }).map((_, i) => (
                      <div
                        key={i}
                        className="block p-3 rounded-lg border border-border"
                      >
                        <Skeleton className="h-4 w-full max-w-[85%] mb-2" />
                        <Skeleton className="h-3 w-full mb-1" />
                        <Skeleton className="h-3 w-[85%]" />
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Skeleton className="h-4 w-4 rounded" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                  <div className="space-y-2">
                    {Array.from({ length: SKELETON_ROWS }).map((_, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-lg bg-primary/5 border border-primary/20"
                      >
                        <Skeleton className="h-4 w-full max-w-[90%] mb-2" />
                        <Skeleton className="h-3 w-full mb-2" />
                        <Skeleton className="h-3 w-20 mt-2" />
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Skeleton className="h-4 w-4 rounded" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <div className="space-y-2">
                    {Array.from({ length: SKELETON_ROWS }).map((_, i) => (
                      <div
                        key={i}
                        className="block p-3 rounded-lg border border-border"
                      >
                        <Skeleton className="h-4 w-32 mb-2" />
                        <Skeleton className="h-3 w-full" />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {!hasResults && !showLoadingState && (
              <p className="text-center text-sm text-muted-foreground py-8">
                No results found for &quot;{query}&quot;
              </p>
            )}

            {!showLoadingState && articleResults.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Articles ({articleResults.length})
                </h3>
                <div className="space-y-2">
                  {articleResults.slice(0, 5).map((article) => (
                    <a
                      key={article.Id ?? article.sc_item_id}
                      href={article.ExternalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        sendEvent("clicked");
                        onOpenChange(false);
                      }}
                      className="block p-3 rounded-lg hover:bg-accent transition-colors"
                    >
                      <p className="font-medium text-sm">{article.Title}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {article.Excerpt}
                      </p>
                      {article.Subtitle && (
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                          {article.Subtitle}
                        </p>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {!showLoadingState && faqResults.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <HelpCircle className="h-4 w-4" />
                  FAQ Answers ({faqResults.length})
                </h3>
                <div className="space-y-2">
                  {faqResults.slice(0, 5).map((faq) => (
                    <div
                      key={faq.sc_item_id ?? faq.Question}
                      className="p-3 rounded-lg bg-primary/5 border border-primary/20"
                    >
                      <p className="font-medium text-sm mb-1">{faq.Question}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {faq.Answer}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <Link
                          href="/faq"
                          onClick={() => {
                            sendEvent("clicked");
                            onOpenChange(false);
                          }}
                          className="text-xs text-primary hover:underline ml-auto"
                        >
                          View all FAQs →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {filteredProducts.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4" />
                  Products ({filteredProducts.length})
                  <Badge variant="secondary" className="text-xs font-normal">
                    Dummy
                  </Badge>
                </h3>
                <div className="space-y-2">
                  {filteredProducts.slice(0, 5).map((product) => (
                    <Link
                      key={product.slug}
                      href={`/products/${product.slug}`}
                      onClick={() => {
                        sendEvent("clicked");
                        onOpenChange(false);
                      }}
                      className="block p-3 rounded-lg hover:bg-accent transition-colors"
                    >
                      <p className="font-medium text-sm">{product.name}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {product.category} • ${product.price}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {!showLoadingState && persons.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Persons ({persons.length})
                </h3>
                <div className="space-y-2">
                  {persons.slice(0, 5).map((person) => (
                    <div
                      key={
                        person.sc_item_id ??
                        `${person.FirstName}-${person.LastName}`
                      }
                      className="block p-3 rounded-lg hover:bg-accent transition-colors"
                    >
                      <p className="font-medium text-sm">
                        {[person.FirstName, person.LastName]
                          .filter(Boolean)
                          .join(" ")}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {person.AboutMe}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
