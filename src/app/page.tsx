import { type Metadata } from "next";
import { HeroCarousel } from "@/components/HeroCarousel";
import { FeaturedCreations } from "@/components/FeaturedCreations";

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
      <HeroCarousel />

      {/* Welcome Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-bold text-[#003C70] dark:text-blue-400">
            Добре дошли в a-el-key мебели
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Специализирани в ръчно изработени мебели по поръчка в град София.
            Създаваме уникални решения за вашия дом или офис.
          </p>
          <p className="mt-4 text-base text-gray-500 dark:text-gray-400">
            Майстор:{" "}
            <span className="font-semibold text-[#003C70] dark:text-blue-400">
              Андрей Къкрински
            </span>
          </p>
        </div>
      </div>

      {/* Featured Creations Section */}
      <FeaturedCreations />
    </div>
  );
}
