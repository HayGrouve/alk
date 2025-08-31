import { MapPin, Clock, Phone, Mail } from "lucide-react";

export function AboutWorkshop() {
  return (
    <div className="mb-16">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold text-[#003c70]">
          Нашата работилница
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          Модерно оборудвана работилница в сърцето на Нови Искър, където се
          превръщат мечтите в реалност
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Workshop Info Card */}
        <div className="flex h-full flex-col rounded-lg bg-white p-8 shadow-lg">
          <h3 className="mb-6 text-2xl font-bold text-[#003c70]">
            За нашата работилница
          </h3>
          <div className="flex-1 space-y-4 text-gray-600">
            <p>
              Нашата работилница е разположена в Нови Искър, София, и е
              оборудвана с най-модерните машини и инструменти за мебелно
              производство. Тук се създават всички наши мебели - от
              първоначалната идея до финалния продукт.
            </p>
            <p>
              Работим с най-качествени материали - масивно дърво, МДФ,
              ламинирани плоскости и аксесоари от водещи европейски
              производители. Всяка стъпка от процеса е внимателно контролирана
              за да гарантираме най-високото качество.
            </p>
          </div>
        </div>

        {/* Equipment Card */}
        <div className="flex h-full flex-col rounded-lg bg-white p-8 shadow-lg">
          <h3 className="mb-6 text-2xl font-bold text-[#003c70]">
            Нашето оборудване
          </h3>
          <div className="grid flex-1 gap-4">
            <div className="flex items-start">
              <div className="mt-2 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-[#5eb665]"></div>
              <div>
                <h4 className="font-semibold text-[#003c70]">Фрезова машина</h4>
                <p className="text-sm text-gray-600">
                  За прецизна обработка на дърво
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mt-2 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-[#5eb665]"></div>
              <div>
                <h4 className="font-semibold text-[#003c70]">
                  Циркулярна трион
                </h4>
                <p className="text-sm text-gray-600">
                  За рязане на различни материали
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mt-2 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-[#5eb665]"></div>
              <div>
                <h4 className="font-semibold text-[#003c70]">
                  Шлифовъчни машини
                </h4>
                <p className="text-sm text-gray-600">
                  За фина обработка и полиране
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mt-2 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-[#5eb665]"></div>
              <div>
                <h4 className="font-semibold text-[#003c70]">
                  Свързващи инструменти
                </h4>
                <p className="text-sm text-gray-600">
                  За здрави и издръжливи съединения
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info Card */}
        <div className="flex h-full flex-col rounded-lg bg-gradient-to-br from-[#003c70] to-[#5eb665] p-8 text-white">
          <h3 className="mb-6 text-2xl font-bold">Свържете се с нас</h3>
          <div className="flex-1 space-y-4">
            <div className="flex items-center">
              <MapPin className="mr-3 h-5 w-5 flex-shrink-0" />
              <span>Нови Искър, София</span>
            </div>
            <div className="flex items-center">
              <Phone className="mr-3 h-5 w-5 flex-shrink-0" />
              <span>+359 87 656 6262</span>
            </div>
            <div className="flex items-center">
              <Mail className="mr-3 h-5 w-5 flex-shrink-0" />
              <span>kakrinski@abv.bg</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-3 h-5 w-5 flex-shrink-0" />
              <span>Пон-Пет: 8:00 - 18:00</span>
            </div>
          </div>
        </div>

        {/* Process Card */}
        <div className="flex h-full flex-col rounded-lg bg-white p-8 shadow-lg">
          <h3 className="mb-6 text-2xl font-bold text-[#003c70]">
            Нашият процес
          </h3>
          <div className="flex-1 space-y-4">
            <div className="flex items-center">
              <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#5eb665] text-sm font-bold text-white">
                1
              </div>
              <span className="text-gray-600">Консултация и дизайн</span>
            </div>
            <div className="flex items-center">
              <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#5eb665] text-sm font-bold text-white">
                2
              </div>
              <span className="text-gray-600">Избор на материали</span>
            </div>
            <div className="flex items-center">
              <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#5eb665] text-sm font-bold text-white">
                3
              </div>
              <span className="text-gray-600">Производство</span>
            </div>
            <div className="flex items-center">
              <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#5eb665] text-sm font-bold text-white">
                4
              </div>
              <span className="text-gray-600">Монтаж и доставка</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
