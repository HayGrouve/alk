import { type Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// Lazy load heavy components with animations
const HeroCarousel = dynamic(
  () =>
    import("@/components/HeroCarousel").then((mod) => ({
      default: mod.HeroCarousel,
    })),
  {
    loading: () => (
      <div className="flex h-[600px] items-center justify-center bg-gradient-to-r from-[#003C70] to-[#5EB665]">
        <div className="text-xl text-white">Зареждане...</div>
      </div>
    ),
  },
);

const FeaturedCreations = dynamic(
  () =>
    import("@/components/FeaturedCreations").then((mod) => ({
      default: mod.FeaturedCreations,
    })),
  {
    loading: () => (
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="mx-auto mb-4 h-8 w-64 animate-pulse rounded bg-gray-200"></div>
            <div className="mx-auto h-4 w-96 animate-pulse rounded bg-gray-200"></div>
          </div>
        </div>
      </div>
    ),
  },
);

export const metadata: Metadata = {
  title: "a-el-key мебели | Ръчно изработени мебели в България",
  description:
    "Професионално изработване на мебели по поръчка в София и цяла България. Кухни, спални, гардероби и индивидуални проекти от Андрей Къкрински.",
  keywords:
    "мебели по поръчка, София, България, кухни, спални, гардероби, ръчно изработени мебели, Андрей Къкрински",
  openGraph: {
    title: "a-el-key мебели | Ръчно изработени мебели в България",
    description:
      "Професионално изработване на мебели по поръчка в София и цяла България. Кухни, спални, гардероби и индивидуални проекти от Андрей Къкрински.",
    images: [
      {
        url: "https://a-el-key.bg/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "a-el-key мебели - Ръчно изработени мебели в България",
      },
    ],
  },
};

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
            Специализирани в ръчно изработени мебели по поръчка в град София.
            Създаваме уникални решения за вашия дом или офис.
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
        <FeaturedCreations />
      </Suspense>
    </div>
  );
}
