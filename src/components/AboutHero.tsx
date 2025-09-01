import Image from "next/image";

export function AboutHero() {
  return (
    <div className="mb-16">
      {/* Page Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-[#003c70] sm:text-5xl">
          За нас
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Запознайте се със страстта зад a-el-key мебели
        </p>
      </div>

      {/* Hero Content */}
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        {/* Text Content */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-[#003c70]">
              Андрей Къкрински - майстор
            </h2>
            <p className="text-lg text-gray-600">
              С над 15 години опит в мебелното производство, <br />
              Андрей Къкрински е създал a-el-key като символ на качество,
              прецизност и индивидуален подход към всеки проект.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-[#003c70]">Мисия</h3>
            <p className="text-gray-600">
              Да създаваме мебели, които не просто украсяват дома ви, а стават
              част от вашата история. Всеки проект е уникален, всеки детайл е
              внимателно обмислен, всяка завършена мебел е израз на нашата
              страст към занаята.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="rounded-lg bg-[#5eb665] px-4 py-2 text-white">
              <span className="text-sm font-medium">
                15+ години опит в мебелното производство
              </span>
            </div>
            <div className="rounded-lg bg-[#5eb665] px-4 py-2 text-white">
              <span className="text-sm font-medium">100% ръчна изработка</span>
            </div>
            <div className="rounded-lg bg-[#5eb665] px-4 py-2 text-white">
              <span className="text-sm font-medium">Гаранция за качество</span>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="relative">
          <div className="aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src="/about-hero.jpg"
              alt="Андрей Къкрински"
              width={600}
              height={450}
              className="h-full w-full object-cover"
              priority
              quality={85}
            />
          </div>
          <div className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-[#5eb665] opacity-20"></div>
        </div>
      </div>
    </div>
  );
}
