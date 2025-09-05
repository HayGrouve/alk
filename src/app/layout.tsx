import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Analytics } from "@/components/Analytics";
import { PerformanceMonitor } from "@/components/PerformanceMonitor";
import { ClientProviders } from "@/components/ClientProviders";
import { structuredData } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "a-el-key мебели | Ръчно изработени мебели в България",
  description:
    "Професионално изработване на мебели по поръчка в София и цяла България. Кухня, спалня, гардероб и индивидуални проекти от Андрей Къкрински.",
  keywords:
    "мебели, мебели по поръчка, София, България, кухня, спалня, гардероб, ръчно изработени мебели, Андрей Къкрински, a-el-key",
  authors: [{ name: "Андрей Къкрински" }],
  creator: "Андрей Къкрински",
  publisher: "a-el-key мебели",
  robots: "index, follow",
  metadataBase: new URL("https://a-el-key.com"),
  openGraph: {
    type: "website",
    locale: "bg_BG",
    url: "https://a-el-key.com",
    siteName: "a-el-key мебели",
    title: "a-el-key мебели | Ръчно изработени мебели в България",
    description:
      "Професионално изработване на мебели по поръчка в София и цяла България. Кухня, спалня, гардероб и индивидуални проекти от Андрей Къкрински.",
    images: [
      {
        url: "https://a-el-key.com/images/hero/kitchen.jpg",
        width: 1200,
        height: 630,
        alt: "a-el-key мебели - Ръчно изработени мебели в България",
      },
    ],
  },
  other: {
    "fb:app_id": process.env.NEXT_PUBLIC_FB_APP_ID ?? "1234567890123456",
  },
  twitter: {
    card: "summary_large_image",
    title: "a-el-key мебели | Ръчно изработени мебели в България",
    description:
      "Професионално изработване на мебели по поръчка в София и цяла България.",
    images: ["https://a-el-key.com/images/hero/kitchen.jpg"],
  },
  icons: [
    { rel: "icon", url: "/favicon.ico" },
    { rel: "apple-touch-icon", url: "/apple-touch-icon.png", sizes: "180x180" },
  ],
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://a-el-key.com",
    languages: {
      bg: "https://a-el-key.com",
      "x-default": "https://a-el-key.com",
    },
  },
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="bg" className={`${geist.variable}`} suppressHydrationWarning>
      <head>
        {/* Bulgarian language targeting */}
        <link rel="alternate" hrefLang="bg" href="https://a-el-key.com" />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://a-el-key.com"
        />

        {/* Structured Data - now loaded via metadata API instead of Script tags */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData.organization),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData.person),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData.localBusiness),
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col" suppressHydrationWarning>
        <ClientProviders>
          {/* Skip Navigation Link */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-[#003C70] focus:px-4 focus:py-2 focus:text-white focus:ring-2 focus:ring-white focus:outline-none"
          >
            Прескочи до основното съдържание
          </a>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />

          {/* Analytics */}
          <Analytics gaId={process.env.NEXT_PUBLIC_GA_ID} />

          {/* Performance Monitoring */}
          <PerformanceMonitor />
        </ClientProviders>
      </body>
    </html>
  );
}
