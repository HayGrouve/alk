import { HeroCarousel } from "@/components/HeroCarousel";

export default function HomePage() {
  return (
    <div className="w-full">
      {/* Hero Section with Animated Carousel */}
      <HeroCarousel />

      {/* Additional content sections can be added here */}
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
    </div>
  );
}
