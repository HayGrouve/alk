import { MapPin, Clock, Phone, Mail } from "lucide-react";

export function AboutContact() {
  return (
    <div className="mb-16">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold text-[#003c70]">
          Свържете се с нас
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          Готови сме да отговорим на всички ваши въпроси и да започнем работа по
          вашия проект
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Contact Info Card */}
        <div className="flex h-full flex-col rounded-lg bg-gradient-to-br from-[#003c70] to-[#5eb665] p-8 text-white">
          <h3 className="mb-6 text-2xl font-bold">Контактна информация</h3>
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
              <span className="text-gray-600">Доставка и монтаж</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
