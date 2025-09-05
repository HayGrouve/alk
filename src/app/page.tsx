import { Suspense } from "react";
import { type Metadata } from "next";
import { HeroCarousel } from "@/components/HeroCarousel";
import { pageMetadata } from "@/lib/seo-config";
import dynamic from "next/dynamic";

// Lazy load the FeaturedCreations component for better performance
const FeaturedCreationsWrapper = dynamic(
  () =>
    import("@/components/FeaturedCreationsWrapper").then((mod) => ({
      default: mod.FeaturedCreationsWrapper,
    })),
  {
    loading: () => (
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="mx-auto mb-4 h-8 w-64 animate-pulse rounded bg-gray-200"></div>
            <div className="mx-auto h-4 w-96 animate-pulse rounded bg-gray-200"></div>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-96 animate-pulse rounded-lg bg-gray-200"
              />
            ))}
          </div>
        </div>
      </div>
    ),
  },
);

export const metadata: Metadata = pageMetadata.home;

export default function HomePage() {
  return (
    <div className="w-full">
      {/* Hero Section with Animated Carousel */}
      <Suspense
        fallback={
          <div className="flex h-[600px] items-center justify-center bg-gradient-to-r from-[#003C70] to-[#5EB665]">
            <div className="text-xl text-white">Зареждане...</div>
          </div>
        }
      >
        <HeroCarousel />
      </Suspense>

      {/* Welcome Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-bold text-[#003C70]">
            Добре дошли в a-el-key мебели
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Превръщаме твоите идеи в реалност и създаваме функционални и красиви
            решения за вашия дом или офис.
          </p>
          <p className="mt-4 text-base text-gray-500">
            Майстор:{" "}
            <span className="font-semibold text-[#003C70]">
              Андрей Къкрински
            </span>
          </p>
        </div>
      </div>

      {/* Featured Creations Section */}
      <Suspense
        fallback={
          <div className="bg-gray-50 py-16">
            <div className="container mx-auto px-4">
              <div className="text-center">
                <div className="mx-auto mb-4 h-8 w-64 animate-pulse rounded bg-gray-200"></div>
                <div className="mx-auto h-4 w-96 animate-pulse rounded bg-gray-200"></div>
              </div>
            </div>
          </div>
        }
      >
        <FeaturedCreationsWrapper />
      </Suspense>
    </div>
  );
}
