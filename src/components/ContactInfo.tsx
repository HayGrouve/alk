import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";

export function ContactInfo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl text-[#003C70]">
          Контактна информация
        </CardTitle>
        <CardDescription>
          Свържете се с нас по удобен за вас начин
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Phone */}
        <div className="flex items-start space-x-3">
          <PhoneIcon className="mt-1 h-6 w-6 flex-shrink-0 text-[#003C70]" />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">Телефон</h3>
            <p className="text-gray-600">+359 88 526 0083</p>
            <Button variant="brand-outline" size="sm" className="mt-2" asChild>
              <a href="tel:+359885260083" className="text-sm">
                Обадете се сега
              </a>
            </Button>
          </div>
        </div>

        <Separator />

        {/* Email */}
        <div className="flex items-start space-x-3">
          <EnvelopeIcon className="mt-1 h-6 w-6 flex-shrink-0 text-[#003C70]" />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">Имейл</h3>
            <p className="text-gray-600">dastankova@abv.bg</p>
            <Button variant="brand-outline" size="sm" className="mt-2" asChild>
              <a href="mailto:dastankova@abv.bg" className="text-sm">
                Изпратете имейл
              </a>
            </Button>
          </div>
        </div>

        <Separator />

        {/* Address */}
        <div className="flex items-start space-x-3">
          <MapPinIcon className="mt-1 h-6 w-6 flex-shrink-0 text-[#003C70]" />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">Адрес</h3>
            <p className="text-gray-600">
              ул. &quot;Цариградско шосе&quot; 123
              <br />
              София 1000, България
            </p>
          </div>
        </div>

        <Separator />

        {/* Viber Quick Contact */}
        <div className="flex items-start space-x-3">
          <ChatBubbleLeftRightIcon className="mt-1 h-6 w-6 flex-shrink-0 text-[#5EB665]" />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">Viber</h3>
            <p className="text-gray-600">Бързо съобщение в Viber</p>
            <Button
              variant="brand-secondary"
              size="sm"
              className="mt-2"
              asChild
            >
              <a
                href="viber://chat?number=%2B359885260083"
                className="text-sm"
                aria-label="Отвори чат в Viber с номер +359 88 526 0083"
              >
                <ChatBubbleLeftRightIcon className="mr-2 h-4 w-4" />
                Чат в Viber
              </a>
            </Button>
          </div>
        </div>

        <Separator />

        {/* Working Hours */}
        <div className="flex items-start space-x-3">
          <ClockIcon className="mt-1 h-6 w-6 flex-shrink-0 text-[#003C70]" />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">Работно време</h3>
            <div className="space-y-1 text-gray-600">
              <p>Понеделник - Петък: 9:00 - 18:00</p>
              <p>Събота: 10:00 - 16:00</p>
              <p>Неделя: Почивен ден</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
