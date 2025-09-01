import { type Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { AboutHero } from "@/components/AboutHero";
import { AboutStory } from "@/components/AboutStory";
import { AboutValues } from "@/components/AboutValues";
import { AboutContact } from "@/components/AboutContact";

export const metadata: Metadata = {
  title: "За нас | a-el-key мебели",
  description:
    "Познайте a-el-key мебели и майстора Андрей Къкрински. Специализирани в създаването на уникални мебели по поръчка в Нови Искър, София.",
  keywords:
    "за нас, Андрей Къкрински, майстор, мебели, опит, качество, традиция, Нови Искър, София",
  openGraph: {
    type: "website",
    url: "https://a-el-key.com/about",
    siteName: "a-el-key мебели",
    title: "За нас | a-el-key мебели",
    description:
      "Познайте a-el-key мебели и майстора Андрей Къкрински. Специализирани в създаването на уникални мебели по поръчка.",
    images: [
      {
        url: "https://a-el-key.com/images/hero/bedroom.jpg",
        width: 1200,
        height: 630,
        alt: "За нас - a-el-key мебели",
      },
    ],
  },
  alternates: {
    canonical: "https://a-el-key.com/about",
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb Navigation */}
      <div className="mb-8">
        <Breadcrumb
          items={[{ name: "За нас", href: "/about", current: true }]}
        />
      </div>

      {/* About Hero Section */}
      <AboutHero />

      {/* About Story Section */}
      <div className="mt-16 lg:mt-24">
        <AboutStory />
      </div>

      {/* About Values Section */}
      <div className="mt-16 lg:mt-24">
        <AboutValues />
      </div>

      {/* About Contact Section */}
      <div className="mt-16 lg:mt-24">
        <AboutContact />
      </div>
    </div>
  );
}
