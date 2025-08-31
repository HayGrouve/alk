export function AboutTeam() {
  return (
    <div className="mb-16">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold text-[#003c70]">Нашият екип</h2>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          Зад всеки успешен проект стои екип от професионалисти, които споделят
          нашата страст към качеството
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Main Team Member */}
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <div className="text-center">
            <div className="mb-6">
              <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-[#003c70] to-[#5eb665]">
                <span className="text-4xl font-bold text-white">АК</span>
              </div>
            </div>
            <h3 className="mb-2 text-2xl font-bold text-[#003c70]">
              Андрей Къкрински
            </h3>
            <p className="mb-4 text-lg font-medium text-[#5eb665]">
              Основател и главен майстор
            </p>
            <p className="mb-6 text-gray-600">
              С над 15 години опит в мебелното производство, Андрей е сърцето и
              душата на a-el-key. Неговата страст към занаята и внимание към
              детайла се отразяват във всеки проект.
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <div>• Специализация: Кухни, спални, офис мебели</div>
              <div>• Опит: 15+ години</div>
              <div>• Образование: Мебелно производство</div>
            </div>
          </div>
        </div>

        {/* Supporting Team */}
        <div className="space-y-6">
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h4 className="mb-3 text-xl font-semibold text-[#003c70]">
              Нашият екип
            </h4>
            <p className="mb-4 text-gray-600">
              Работим с проверени партньори и специалисти в различни области:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <div className="mr-3 h-2 w-2 rounded-full bg-[#5eb665]"></div>
                Дизайнери и архитекти
              </li>
              <li className="flex items-center">
                <div className="mr-3 h-2 w-2 rounded-full bg-[#5eb665]"></div>
                Специалисти по обработка на дърво
              </li>
              <li className="flex items-center">
                <div className="mr-3 h-2 w-2 rounded-full bg-[#5eb665]"></div>
                Монтьори и доставчици
              </li>
              <li className="flex items-center">
                <div className="mr-3 h-2 w-2 rounded-full bg-[#5eb665]"></div>
                Консултанти по материали
              </li>
            </ul>
          </div>

          <div className="rounded-lg bg-gradient-to-br from-[#003c70] to-[#5eb665] p-6 text-white">
            <h4 className="mb-3 text-xl font-semibold">Защо избират нас?</h4>
            <ul className="space-y-2 text-sm">
              <li>• Личен подход към всеки клиент</li>
              <li>• Гаранция за качество и издръжливост</li>
              <li>• Съвременни техники и традиционни методи</li>
              <li>• Пълна прозрачност в процеса на работа</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
