import { type Metadata } from "next";
import { GalleryBreadcrumb } from "@/components/Breadcrumb";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
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

export const metadata: Metadata = {
  title: "Галерия | a-el-key мебели",
  description:
    "Разгледайте нашата галерия от ръчно изработени мебели. Кухни, спални, гардероби и индивидуални проекти в различни стилове.",
  keywords:
    "галерия мебели, кухни, спални, гардероби, мебели по поръчка, София",
  openGraph: {
    title: "Галерия | a-el-key мебели",
    description:
      "Разгледайте нашата галерия от ръчно изработени мебели. Кухни, спални, гардероби и индивидуални проекти в различни стилове.",
    images: [
      {
        url: "https://a-el-key.bg/gallery-og.jpg",
        width: 1200,
        height: 630,
        alt: "Галерия от ръчно изработени мебели - a-el-key",
      },
    ],
  },
  alternates: {
    canonical: "https://a-el-key.bg/gallery",
  },
};

export default function GalleryPage() {
  return (
    <ConvexClientProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-8">
            <GalleryBreadcrumb />
          </div>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Галерия</h1>
            <p className="mt-2 text-lg text-gray-600">
              Разгледайте нашата колекция от ръчно изработени мебели
            </p>
          </div>

          {/* Gallery Grid */}
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
            <GalleryGrid />
          </Suspense>
        </div>
      </div>
    </ConvexClientProvider>
  );
}
