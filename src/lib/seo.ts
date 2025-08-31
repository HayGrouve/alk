import type { DefaultSeoProps } from "next-seo";

export const defaultSEO: DefaultSeoProps = {
  titleTemplate: "%s | a-el-key мебели",
  defaultTitle: "a-el-key мебели | Ръчно изработени мебели в България",
  description:
    "Професионално изработване на мебели по поръчка в София и цяла България. Кухни, спални, гардероби и индивидуални проекти от Андрей Къкрински.",
  canonical: "https://a-el-key.bg",
  openGraph: {
    type: "website",
    locale: "bg_BG",
    url: "https://a-el-key.bg",
    siteName: "a-el-key мебели",
    title: "a-el-key мебели | Ръчно изработени мебели в България",
    description:
      "Професионално изработване на мебели по поръчка в София и цяла България. Кухни, спални, гардероби и индивидуални проекти от Андрей Къкрински.",
    images: [
      {
        url: "https://a-el-key.bg/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "a-el-key мебели - Ръчно изработени мебели в България",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    handle: "@aelkey",
    site: "@aelkey",
    cardType: "summary_large_image",
  },
  additionalMetaTags: [
    {
      name: "keywords",
      content:
        "мебели, мебели по поръчка, София, България, кухни, спални, гардероби, ръчно изработени мебели, Андрей Къкрински, a-el-key",
    },
    {
      name: "author",
      content: "Андрей Къкрински",
    },
    {
      name: "robots",
      content: "index, follow",
    },
    {
      name: "language",
      content: "bg",
    },
    {
      name: "geo.region",
      content: "BG",
    },
    {
      name: "geo.placename",
      content: "София",
    },
    {
      name: "geo.position",
      content: "42.6977;23.3219",
    },
    {
      name: "ICBM",
      content: "42.6977, 23.3219",
    },
  ],
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon.ico",
    },
    {
      rel: "apple-touch-icon",
      href: "/apple-touch-icon.png",
      sizes: "180x180",
    },
    {
      rel: "manifest",
      href: "/site.webmanifest",
    },
  ],
};

// Page-specific SEO configurations
export const pageSEO = {
  home: {
    title: "a-el-key мебели | Ръчно изработени мебели в България",
    description:
      "Професионално изработване на мебели по поръчка в София и цяла България. Кухни, спални, гардероби и индивидуални проекти от Андрей Къкрински.",
    keywords:
      "мебели по поръчка, София, България, кухни, спални, гардероби, ръчно изработени мебели",
  },
  gallery: {
    title: "Галерия | a-el-key мебели",
    description:
      "Разгледайте нашата галерия от ръчно изработени мебели. Кухни, спални, гардероби и индивидуални проекти в различни стилове.",
    keywords:
      "галерия мебели, кухни, спални, гардероби, мебели по поръчка, София",
  },
  contact: {
    title: "Контакти | a-el-key мебели",
    description:
      "Свържете се с нас за безплатна консултация по вашия мебелен проект. Работилница в Нови Искър, София.",
    keywords:
      "контакти, мебели, консултация, Нови Искър, София, телефон, имейл",
  },
  faq: {
    title: "Често задавани въпроси | a-el-key мебели",
    description:
      "Отговори на най-често задаваните въпроси за нашите мебели и услуги. Време за изработка, материали, гаранция и доставка.",
    keywords:
      "въпроси, отговори, мебели, време за изработка, материали, гаранция, доставка",
  },
  about: {
    title: "За нас | a-el-key мебели",
    description:
      "Запознайте се с Андрей Къкрински и нашата история в изработката на ръчно изработени мебели в България.",
    keywords:
      "за нас, Андрей Къкрински, история, мебели, ръчно изработени, България",
  },
};

// Structured data schemas
export const structuredData = {
  organization: {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    name: "a-el-key мебели",
    alternateName: "a-el-key",
    description:
      "Професионално изработване на мебели по поръчка в София и цяла България",
    url: "https://a-el-key.bg",
    logo: "https://a-el-key.bg/logo.png",
    image: "https://a-el-key.bg/og-image.jpg",
    telephone: "+359876566262",
    email: "kakrinski@abv.bg",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Нови Искър",
      addressLocality: "София",
      addressRegion: "София",
      addressCountry: "BG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 42.6977,
      longitude: 23.3219,
    },
    openingHours: "Mo-Fr 09:00-18:00",
    priceRange: "$$",
    paymentAccepted: "Cash, Credit Card, Bank Transfer",
    currenciesAccepted: "BGN",
    areaServed: {
      "@type": "Country",
      name: "Bulgaria",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Мебели по поръчка",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Кухни по поръчка",
            description: "Индивидуално проектиране и изработка на кухни",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Спални по поръчка",
            description: "Ръчно изработени спални гарнитури",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Гардероби по поръчка",
            description: "Вградени и самостоятелни гардероби",
          },
        },
      ],
    },
    sameAs: [
      "https://www.facebook.com/aelkey",
      "https://www.instagram.com/aelkey",
    ],
  },
  person: {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Андрей Къкрински",
    jobTitle: "Мастер по мебели",
    worksFor: {
      "@type": "Organization",
      name: "a-el-key мебели",
    },
    telephone: "+359876566262",
    email: "kakrinski@abv.bg",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Нови Искър",
      addressLocality: "София",
      addressCountry: "BG",
    },
  },
  website: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "a-el-key мебели",
    url: "https://a-el-key.bg",
    description:
      "Професионално изработване на мебели по поръчка в София и цяла България",
    inLanguage: "bg",
    publisher: {
      "@type": "Organization",
      name: "a-el-key мебели",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://a-el-key.bg/gallery?search={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  },
};
