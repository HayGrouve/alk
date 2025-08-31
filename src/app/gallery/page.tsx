import { type Metadata } from "next";
import { GalleryBreadcrumb } from "@/components/Breadcrumb";
import { GalleryGrid } from "@/components/GalleryGrid";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";

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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-8">
            <GalleryBreadcrumb />
          </div>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Галерия
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              Разгледайте нашата колекция от ръчно изработени мебели
            </p>
          </div>

          {/* Gallery Grid */}
          <GalleryGrid />
        </div>
      </div>
    </ConvexClientProvider>
  );
}
