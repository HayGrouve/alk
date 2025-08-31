"use client";

import { useState, useCallback, useMemo, useRef } from "react";
import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Doc } from "../../convex/_generated/dataModel";
import { useInView } from "react-intersection-observer";
import { useVirtualizer } from "@tanstack/react-virtual";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Search, Filter, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface GalleryGridProps {
  initialCategory?: string;
}

type ImageDoc = Doc<"images">;

export function GalleryGrid({ initialCategory }: GalleryGridProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    initialCategory ?? "",
  );
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [cursor, setCursor] = useState<string | null>(null);
  const [allImages, setAllImages] = useState<ImageDoc[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // Get categories for filter dropdown
  const categories = useQuery(api.images.getCategories) ?? [];

  // Get paginated images
  const paginatedData = useQuery(api.images.getImagesPaginated, {
    limit: 20,
    cursor: cursor ?? undefined,
    category: selectedCategory || undefined,
    searchTerm: searchTerm || undefined,
  });

  // Update images when new data arrives
  useMemo(() => {
    if (paginatedData) {
      if (cursor === null) {
        // First load or reset
        setAllImages(paginatedData.images);
      } else {
        // Append new images
        setAllImages((prev) => [...prev, ...paginatedData.images]);
      }
      setHasMore(paginatedData.hasMore);
      setLoading(false);
    }
  }, [paginatedData, cursor]);

  // Reset pagination when filters change
  const handleFilterChange = useCallback(
    (newCategory: string, newSearchTerm: string) => {
      setSelectedCategory(newCategory);
      setSearchTerm(newSearchTerm);
      setCursor(null);
      setAllImages([]);
      setHasMore(true);
    },
    [],
  );

  // Load more images
  const loadMore = useCallback(() => {
    if (paginatedData?.nextCursor && !loading) {
      setLoading(true);
      setCursor(paginatedData.nextCursor);
    }
  }, [paginatedData?.nextCursor, loading]);

  // Intersection observer for infinite scroll
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0,
    rootMargin: "100px",
  });

  // Load more when intersection observer triggers
  useMemo(() => {
    if (inView && hasMore && !loading) {
      loadMore();
    }
  }, [inView, hasMore, loading, loadMore]);

  // Virtual scrolling setup
  const parentRef = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: allImages.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 300,
    overscan: 5,
  });

  // Prepare lightbox slides
  const lightboxSlides = useMemo(() => {
    return allImages.map((image) => ({
      src: image.url,
      alt: image.name,
      title: image.description ?? image.name,
    }));
  }, [allImages]);

  // Handle image click
  const handleImageClick = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // Clear filters
  const clearFilters = () => {
    handleFilterChange("", "");
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 gap-2">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Търсене в галерията..."
              value={searchTerm}
              onChange={(e) =>
                handleFilterChange(selectedCategory, e.target.value)
              }
              className="pl-10"
            />
          </div>
          <Select
            value={selectedCategory || "all"}
            onValueChange={(value) =>
              handleFilterChange(value === "all" ? "" : value, searchTerm)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Всички категории" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Всички категории</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {(selectedCategory || searchTerm) && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearFilters}
            className="flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            Изчисти филтри
          </Button>
        )}
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600 dark:text-gray-400">
        {allImages.length > 0 && (
          <span>
            Показани {allImages.length}{" "}
            {allImages.length === 1 ? "снимка" : "снимки"}
            {selectedCategory && ` в категория "${selectedCategory}"`}
            {searchTerm && ` за "${searchTerm}"`}
          </span>
        )}
      </div>

      {/* Gallery Grid */}
      {allImages.length > 0 ? (
        <div
          ref={parentRef}
          className="h-[600px] overflow-auto rounded-lg border dark:border-gray-700"
        >
          <div
            style={{
              height: `${virtualizer.getTotalSize()}px`,
              width: "100%",
              position: "relative",
            }}
          >
            {virtualizer.getVirtualItems().map((virtualItem) => {
              const image = allImages[virtualItem.index];
              if (!image) return null;

              return (
                <div
                  key={virtualItem.key}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: `${virtualItem.size}px`,
                    transform: `translateY(${virtualItem.start}px)`,
                  }}
                >
                  <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    <div
                      className="group relative cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-all duration-200 hover:shadow-lg dark:bg-gray-800"
                      onClick={() => handleImageClick(virtualItem.index)}
                    >
                      <div className="aspect-square overflow-hidden">
                        <Image
                          src={image.url}
                          alt={image.name}
                          width={300}
                          height={300}
                          className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                          {image.name}
                        </h3>
                        {image.description && (
                          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            {image.description}
                          </p>
                        )}
                        {image.category && (
                          <span className="mt-2 inline-block rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            {image.category}
                          </span>
                        )}
                        {image.year && (
                          <span className="mt-2 ml-2 inline-block rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                            {image.year}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Filter className="h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">
            Няма намерени снимки
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {searchTerm || selectedCategory
              ? "Опитайте с други критерии за търсене."
              : "Галерията е празна."}
          </p>
        </div>
      )}

      {/* Loading indicator */}
      {loading && (
        <div className="flex justify-center py-4">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
        </div>
      )}

      {/* Load more trigger */}
      {hasMore && !loading && <div ref={loadMoreRef} className="h-4" />}

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={lightboxSlides}
        carousel={{
          finite: true,
        }}
        render={{
          buttonPrev: allImages.length > 1 ? undefined : () => null,
          buttonNext: allImages.length > 1 ? undefined : () => null,
        }}
      />
    </div>
  );
}
