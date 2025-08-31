import { GalleryBreadcrumb } from "@/components/Breadcrumb";

export default function KitchensPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <GalleryBreadcrumb category="Кухни" />
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Кухни</h1>
          <p className="mt-2 text-lg text-gray-600">
            Модерни и функционални кухни, изработени по поръчка
          </p>
        </div>

        {/* Kitchen Categories */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "Модерни кухни",
              description: "Чисти линии и съвременен дизайн",
              href: "/gallery/kitchens/modern",
            },
            {
              name: "Класически кухни",
              description: "Традиционен стил с модерна функционалност",
              href: "/gallery/kitchens/classic",
            },
            {
              name: "Скандинавски кухни",
              description: "Минимализъм и естествени материали",
              href: "/gallery/kitchens/scandinavian",
            },
            {
              name: "Индустриални кухни",
              description: "Метални акценти и суров дизайн",
              href: "/gallery/kitchens/industrial",
            },
            {
              name: "Малки кухни",
              description: "Оптимизирани решения за малки пространства",
              href: "/gallery/kitchens/small",
            },
            {
              name: "Отворени кухни",
              description: "Интегрирани в жилищното пространство",
              href: "/gallery/kitchens/open",
            },
          ].map((subcategory) => (
            <div
              key={subcategory.name}
              className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-200 hover:shadow-lg"
            >
              <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                <div className="flex h-48 items-center justify-center bg-gradient-to-br from-[#5EB665] to-[#003C70]">
                  <span className="text-xl font-bold text-white">
                    {subcategory.name}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  {subcategory.name}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {subcategory.description}
                </p>
                <div className="mt-4">
                  <a
                    href={subcategory.href}
                    className="inline-flex items-center text-sm font-medium text-[#003C70] transition-colors duration-200 hover:text-[#5EB665]"
                  >
                    Разгледайте
                    <svg
                      className="ml-1 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
