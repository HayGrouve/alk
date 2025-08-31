"use client";

import { useState, useCallback, useMemo, Suspense } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Doc } from "../../convex/_generated/dataModel";
import { useInView } from "react-intersection-observer";
import "yet-another-react-lightbox/styles.css";

// Lazy load the lightbox component
const Lightbox = dynamic(() => import("yet-another-react-lightbox"), {
  ssr: false,
  loading: () => <div className="hidden" />,
});
import { Search, Filter, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { getImageDisplayTitle } from "@/lib/title-generator";
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

  // No more virtual scrolling - using responsive grid instead

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
              aria-label="Търсене в галерията"
              aria-describedby="search-help"
            />
            <div id="search-help" className="sr-only">
              Търсете по име или описание на мебелите
            </div>
          </div>
          <Select
            value={selectedCategory || "all"}
            onValueChange={(value) =>
              handleFilterChange(value === "all" ? "" : value, searchTerm)
            }
          >
            <SelectTrigger
              className="w-[180px]"
              aria-label="Филтриране по категория"
            >
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
            aria-label="Изчисти всички филтри"
          >
            <X className="h-4 w-4" aria-hidden="true" />
            Изчисти филтри
          </Button>
        )}
      </div>

      {/* Results Count */}
      <div
        className="text-sm text-gray-600"
        aria-live="polite"
        aria-atomic="true"
      >
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
        <div className="space-y-6">
          {/* Responsive Grid Layout */}
          <div
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
            role="grid"
            aria-label="Галерия с изображения"
          >
            {allImages.map((image, index) => (
              <div
                key={image._id}
                className="group relative cursor-pointer overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                onClick={() => handleImageClick(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleImageClick(index);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`Отвори ${getImageDisplayTitle(image, index)} в галерията`}
              >
                {/* Image Container */}
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={image.url}
                    alt={image.name}
                    width={400}
                    height={400}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, (max-width: 1536px) 25vw, 20vw"
                    quality={85}
                    loading="lazy"
                  />

                  {/* Overlay with year */}
                  {image.year && (
                    <div className="absolute top-4 right-4 rounded-full bg-white/90 px-3 py-1 backdrop-blur-sm">
                      <span className="text-sm font-semibold text-[#003C70]">
                        {image.year}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="mb-2 text-lg font-bold text-[#003C70] transition-colors duration-300 group-hover:text-[#0056b3]">
                    {getImageDisplayTitle(image, index)}
                  </h3>

                  {image.description && (
                    <p className="mb-4 line-clamp-3 text-sm text-gray-600">
                      {image.description}
                    </p>
                  )}

                  {/* Category and Materials */}
                  <div className="space-y-2">
                    {image.category && (
                      <span className="inline-block rounded-full bg-[#003C70]/10 px-3 py-1 text-xs font-medium text-[#003C70]">
                        {image.category}
                      </span>
                    )}

                    {image.materials && image.materials.length > 0 && (
                      <div className="text-xs text-gray-500">
                        <span className="font-medium">Материали:</span>{" "}
                        {image.materials.slice(0, 2).join(", ")}
                        {image.materials.length > 2 &&
                          ` +${image.materials.length - 2} още`}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Filter className="h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            Няма намерени снимки
          </h3>
          <p className="mt-2 text-gray-600">
            {searchTerm || selectedCategory
              ? "Опитайте с други критерии за търсене."
              : "Галерията е празна."}
          </p>
        </div>
      )}

      {/* Loading indicator */}
      {loading && (
        <div
          className="flex justify-center py-4"
          role="status"
          aria-label="Зареждане на изображения"
        >
          <div
            className="h-6 w-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"
            aria-hidden="true"
          />
          <span className="sr-only">Зареждане на изображения...</span>
        </div>
      )}

      {/* Load more trigger */}
      {hasMore && !loading && <div ref={loadMoreRef} className="h-4" />}

      {/* Lightbox */}
      <Suspense fallback={<div className="hidden" />}>
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
      </Suspense>
    </div>
  );
}
