import { type Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { ContactInfo } from "@/components/ContactInfo";
import { WorkshopMap } from "@/components/WorkshopMap";
import { Breadcrumb } from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Контакти | a-el-key мебели",
  description:
    "Свържете се с нас за безплатна консултация по вашия мебелен проект. Работилница в Нови Искър, София. Телефон: +359 87 656 6262",
  keywords:
    "контакти, мебели, консултация, Нови Искър, София, телефон, имейл, Андрей Къкрински",
  openGraph: {
    title: "Контакти | a-el-key мебели",
    description:
      "Свържете се с нас за безплатна консултация по вашия мебелен проект. Работилница в Нови Искър, София.",
    images: [
      {
        url: "https://a-el-key.bg/contact-og.jpg",
        width: 1200,
        height: 630,
        alt: "Контакти - a-el-key мебели",
      },
    ],
  },
  alternates: {
    canonical: "https://a-el-key.bg/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb Navigation */}
      <div className="mb-8">
        <Breadcrumb
          items={[
            { name: "Начало", href: "/", current: false },
            { name: "Контакти", href: "/contact", current: true },
          ]}
        />
      </div>

      {/* Page Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-[#003C70] sm:text-5xl">
          Свържете се с нас
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Готови сме да обсъдим вашия проект и да ви помогнем да създадете
          мебелите от вашите мечти
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Contact Form */}
        <div>
          <ContactForm />
        </div>

        {/* Contact Information and Map */}
        <div className="space-y-8">
          <ContactInfo />
          <WorkshopMap />
        </div>
      </div>
    </div>
  );
}
