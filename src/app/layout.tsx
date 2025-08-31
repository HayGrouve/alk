import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { structuredData } from "@/lib/seo";
import { Analytics } from "@/components/Analytics";
import { PerformanceMonitor } from "@/components/PerformanceMonitor";
import { ClientProviders } from "@/components/ClientProviders";

export const metadata: Metadata = {
  title: "a-el-key мебели | Ръчно изработени мебели в България",
  description:
    "Професионално изработване на мебели по поръчка в София и цяла България. Кухни, спални, гардероби и индивидуални проекти от Андрей Къкрински.",
  keywords:
    "мебели, мебели по поръчка, София, България, кухни, спални, гардероби, ръчно изработени мебели, Андрей Къкрински, a-el-key",
  authors: [{ name: "Андрей Къкрински" }],
  creator: "Андрей Къкрински",
  publisher: "a-el-key мебели",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "bg_BG",
    url: "https://a-el-key.com",
    siteName: "a-el-key мебели",
    title: "a-el-key мебели | Ръчно изработени мебели в България",
    description:
      "Професионално изработване на мебели по поръчка в София и цяла България. Кухни, спални, гардероби и индивидуални проекти от Андрей Къкрински.",
    images: [
      {
        url: "https://a-el-key.com/og-image.jpg",
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
    images: ["https://a-el-key.com/og-image.jpg"],
  },
  icons: [
    { rel: "icon", url: "/favicon.ico" },
    { rel: "apple-touch-icon", url: "/apple-touch-icon.png", sizes: "180x180" },
  ],
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://a-el-key.com",
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
        {/* Structured Data */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData.organization),
          }}
        />
        <Script
          id="person-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData.person),
          }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData.website),
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
