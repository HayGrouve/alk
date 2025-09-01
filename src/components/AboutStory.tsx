export function AboutStory() {
  return (
    <div className="mb-16">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        {/* Image */}
        <div className="relative order-2 lg:order-1">
          <div className="aspect-[4/3] overflow-hidden rounded-lg">
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#003c70] to-[#5eb665]">
              <div className="p-8 text-center text-white">
                <h3 className="mb-4 text-2xl font-bold">Нашата мисия</h3>
                <p className="text-lg opacity-90">
                  Създаваме уникални мебели за вашия дом
                </p>
              </div>
            </div>
          </div>
          <div className="absolute -top-6 -left-6 h-24 w-24 rounded-full bg-[#003c70] opacity-20"></div>
        </div>

        {/* Text Content */}
        <div className="order-1 space-y-6 lg:order-2">
          <div>
            <h2 className="mb-6 text-3xl font-bold text-[#003c70]">
              Информация
            </h2>
          </div>

          <div className="space-y-4">
            <p className="text-gray-600">
              a-el-key мебели е специализирана в създаването на уникални мебели
              по поръчка, които отговарят на индивидуалните нужди и
              предпочитания на всеки клиент.
            </p>

            <p className="text-gray-600">
              Нашият подход се основава на вниманието към детайла, използването
              на качествени материали и прилагане на модерни техники за
              производство.
            </p>

            <p className="text-gray-600">
              Всеки проект е ново предизвикателство, всеки клиент е нова
              възможност да създадем нещо изключително. Това е философията,
              която ни движи и днес.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
