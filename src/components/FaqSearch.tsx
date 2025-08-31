"use client";

import { useState, useMemo, useCallback } from "react";
import Fuse from "fuse.js";
import { Search, X } from "lucide-react";
import type { FaqItem } from "@/types/faq";
import { FaqAccordion } from "./FaqAccordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FaqSearchProps {
  faqs: FaqItem[];
  className?: string;
}

export function FaqSearch({ faqs, className }: FaqSearchProps) {
  const [query, setQuery] = useState("");

  // Configure Fuse.js for fuzzy search
  const fuse = useMemo(
    () =>
      new Fuse(faqs, {
        keys: [
          { name: "question", weight: 0.7 },
          { name: "answer", weight: 0.3 },
        ],
        threshold: 0.3,
        includeScore: true,
        includeMatches: true,
        minMatchCharLength: 2,
      }),
    [faqs],
  );

  // Get search results
  const searchResults = useMemo(() => {
    if (!query.trim()) {
      return faqs;
    }

    const results = fuse.search(query);
    return results.map((result) => result.item);
  }, [query, fuse, faqs]);

  const handleSearchChange = useCallback((value: string) => {
    setQuery(value);
  }, []);

  const clearSearch = useCallback(() => {
    setQuery("");
  }, []);

  const hasResults = searchResults.length > 0;
  const hasQuery = query.trim().length > 0;

  return (
    <div className={cn("space-y-6", className)}>
      {/* Search Input */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="search"
            placeholder="Търсене във въпросите..."
            value={query}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="h-12 pr-10 pl-10 text-base"
            aria-label="Търсене във въпросите"
          />
          {hasQuery && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="absolute top-1/2 right-1 h-8 w-8 -translate-y-1/2 p-0 hover:bg-gray-100"
              aria-label="Изчисти търсенето"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Search Results Info */}
      {hasQuery && (
        <div
          className="text-sm text-gray-600"
          aria-live="polite"
          aria-atomic="true"
        >
          {hasResults ? (
            <span>
              Намерени са <strong>{searchResults.length}</strong> въпроса за
              &ldquo;{query}&rdquo;
            </span>
          ) : (
            <span>Няма намерени въпроси за &ldquo;{query}&rdquo;</span>
          )}
        </div>
      )}

      {/* FAQ Accordion */}
      <FaqAccordion faqs={searchResults} />
    </div>
  );
}
