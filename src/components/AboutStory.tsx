export function AboutStory() {
  return (
    <div className="mb-16">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        {/* Image */}
        <div className="relative order-2 lg:order-1">
          <div className="aspect-[4/3] overflow-hidden rounded-lg">
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#003c70] to-[#5eb665]">
              <div className="p-8 text-center text-white">
                <h3 className="mb-4 text-2xl font-bold">Началото</h3>
                <p className="text-lg opacity-90">
                  Всяка велика история започва с една мечта
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
              Нашата история
            </h2>
          </div>

          <div className="space-y-4">
            <p className="text-gray-600">
              През 2008 година Андрей Къкрински започва своето пътуване в света
              на мебелното производство. Със страст към дървото и желание да
              създава нещо уникално, той основава a-el-key мебели.
            </p>

            <p className="text-gray-600">
              Първоначално работилницата беше малка, но мечтата беше голяма. С
              годините опитът се натрупваше, техниките се усъвършенстваха, а
              клиентите ставаха все повече. Днес a-el-key е синоним за качество
              и индивидуален подход в мебелната индустрия.
            </p>

            <p className="text-gray-600">
              Всеки проект е ново предизвикателство, всеки клиент е нова
              възможност да създадем нещо изключително. Това е философията,
              която ни движи и днес.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#003c70]">2008</div>
              <div className="text-sm text-gray-600">Година на основаване</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#003c70]">500+</div>
              <div className="text-sm text-gray-600">Завършени проекта</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
