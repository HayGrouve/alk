import { GalleryBreadcrumb } from "@/components/Breadcrumb";

export default function GalleryPage() {
  return (
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

        {/* Gallery Categories */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "Кухни",
              description: "Модерни и функционални кухни",
              href: "/gallery/kitchens",
            },
            {
              name: "Спални",
              description: "Удобни и стилни спални",
              href: "/gallery/bedrooms",
            },
            {
              name: "Хол",
              description: "Елегантни холови мебели",
              href: "/gallery/living-rooms",
            },
            {
              name: "Офиси",
              description: "Функционални офисни мебели",
              href: "/gallery/offices",
            },
            {
              name: "Детски стаи",
              description: "Безопасни и игриви детски мебели",
              href: "/gallery/children-rooms",
            },
            {
              name: "Гардероби",
              description: "Просторни и организирани гардероби",
              href: "/gallery/wardrobes",
            },
          ].map((category) => (
            <div
              key={category.name}
              className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-200 hover:shadow-lg"
            >
              <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                <div className="flex h-48 items-center justify-center bg-gradient-to-br from-[#003C70] to-[#5EB665]">
                  <span className="text-2xl font-bold text-white">
                    {category.name}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  {category.name}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {category.description}
                </p>
                <div className="mt-4">
                  <a
                    href={category.href}
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
