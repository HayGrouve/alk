import { GalleryBreadcrumb } from "@/components/Breadcrumb";

export default function ModernKitchensPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <GalleryBreadcrumb category="Кухни" subcategory="Модерни кухни" />
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Модерни кухни</h1>
          <p className="mt-2 text-lg text-gray-600">
            Чисти линии, съвременен дизайн и функционалност
          </p>
        </div>

        {/* Sample Kitchen Items */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "Кухня Модерн 1",
              description: "Бяла кухня с остров и мраморна работна площ",
              price: "От 15,000 лв.",
            },
            {
              name: "Кухня Модерн 2",
              description: "Сива кухня с високогледащи шкафове",
              price: "От 18,000 лв.",
            },
            {
              name: "Кухня Модерн 3",
              description: "Черна кухня с дървени акценти",
              price: "От 20,000 лв.",
            },
            {
              name: "Кухня Модерн 4",
              description: "Бежова кухня с метални детайли",
              price: "От 16,000 лв.",
            },
            {
              name: "Кухня Модерн 5",
              description: "Синя кухня с бяли шкафове",
              price: "От 17,000 лв.",
            },
            {
              name: "Кухня Модерн 6",
              description: "Зелена кухня с естествени материали",
              price: "От 19,000 лв.",
            },
          ].map((kitchen, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-200 hover:shadow-lg"
            >
              <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                <div className="flex h-48 items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
                  <span className="text-lg font-semibold text-gray-700">
                    {kitchen.name}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  {kitchen.name}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {kitchen.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-bold text-[#003C70]">
                    {kitchen.price}
                  </span>
                  <button className="rounded-md bg-[#003C70] px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#5EB665]">
                    Запишете се
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 rounded-lg bg-[#003C70] px-6 py-8 text-center">
          <h2 className="text-2xl font-bold text-white">
            Искате кухня по поръчка?
          </h2>
          <p className="mt-2 text-lg text-gray-300">
            Свържете се с нас за безплатна консултация
          </p>
          <div className="mt-6">
            <button className="rounded-md bg-white px-6 py-3 text-lg font-medium text-[#003C70] transition-colors duration-200 hover:bg-gray-100">
              Свържете се с нас
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
