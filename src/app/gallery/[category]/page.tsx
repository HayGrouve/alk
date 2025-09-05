"use client";

import { GalleryBreadcrumb } from "@/components/Breadcrumb";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import { notFound } from "next/navigation";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// Lazy load the heavy GalleryGrid component with virtualization
const GalleryGrid = dynamic(
  () =>
    import("@/components/GalleryGrid").then((mod) => ({
      default: mod.GalleryGrid,
    })),
  {
    loading: () => (
      <div className="space-y-6">
        {/* Search and filter skeleton */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="h-10 w-64 animate-pulse rounded bg-gray-200"></div>
          <div className="h-10 w-32 animate-pulse rounded bg-gray-200"></div>
        </div>

        {/* Grid skeleton */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square animate-pulse rounded-lg bg-gray-200"
            ></div>
          ))}
        </div>
      </div>
    ),
  },
);

// Map URL slugs to display names (using admin panel categories)
const categoryMapping: Record<string, string> = {
  кухни: "Кухни",
  спални: "Спални",
  хол: "Хол",
  антре: "Антре",
  гардероб: "Гардероб",
  "детски-стаи": "Детски стаи",
  тоалетки: "Тоалетки",
  други: "Други",
};

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params.category as string;
  const categoryName = categoryMapping[categorySlug];

  if (!categoryName) {
    notFound();
  }

  return (
    <ConvexClientProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-8">
            <GalleryBreadcrumb category={categoryName} />
          </div>

          {/* Gallery Grid with category filter */}
          <Suspense
            fallback={
              <div className="space-y-6">
                {/* Search and filter skeleton */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="h-10 w-64 animate-pulse rounded bg-gray-200"></div>
                  <div className="h-10 w-32 animate-pulse rounded bg-gray-200"></div>
                </div>

                {/* Grid skeleton */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className="aspect-square animate-pulse rounded-lg bg-gray-200"
                    ></div>
                  ))}
                </div>
              </div>
            }
          >
            <GalleryGrid initialCategory={categoryName} />
          </Suspense>
        </div>
      </div>
    </ConvexClientProvider>
  );
}
