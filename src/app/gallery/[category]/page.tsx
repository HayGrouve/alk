"use client";

import { GalleryBreadcrumb } from "@/components/Breadcrumb";
import { GalleryGrid } from "@/components/GalleryGrid";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import { notFound } from "next/navigation";
import { useParams } from "next/navigation";

// Map URL slugs to display names
const categoryMap: Record<string, string> = {
  kitchens: "Кухни",
  bedrooms: "Спални",
  "living-rooms": "Хол",
  offices: "Офиси",
  "children-rooms": "Детски стаи",
  wardrobes: "Гардероби",
};

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params.category as string;
  const categoryName = categoryMap[categorySlug];

  if (!categoryName) {
    notFound();
  }

  return (
    <ConvexClientProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-8">
            <GalleryBreadcrumb />
          </div>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {categoryName}
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              Разгледайте нашата колекция от {categoryName.toLowerCase()}
            </p>
          </div>

          {/* Gallery Grid with category filter */}
          <GalleryGrid initialCategory={categoryName} />
        </div>
      </div>
    </ConvexClientProvider>
  );
}
