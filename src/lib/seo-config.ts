// Base site configuration
export const siteConfig = {
  name: "a-el-key мебели",
  shortName: "a-el-key",
  description:
    "Професионално изработване на мебели по поръчка в София и цяла България",
  url: "https://a-el-key.com",
  ogImage: "https://a-el-key.com/images/hero/kitchen.jpg",
  logo: "https://a-el-key.com/logo.png",
  creator: "Андрей Къкрински",
  keywords: [
    "мебели",
    "мебели по поръчка",
    "София",
    "България",
    "кухни",
    "спални",
    "гардероби",
    "ръчно изработени мебели",
    "Андрей Къкрински",
    "a-el-key",
    "мебели София",
    "кухни по поръчка",
    "спални гарнитури",
    "вградени гардероби",
  ],
  contact: {
    phone: "+359876566262",
    email: "kakrinski@abv.bg",
    address: {
      street: "Нови Искър",
      city: "София",
      region: "София",
      country: "BG",
      postalCode: "1000",
      coordinates: {
        latitude: 42.6977,
        longitude: 23.3219,
      },
    },
  },
  social: {
    facebook: "https://www.facebook.com/aelkey",
    instagram: "https://www.instagram.com/aelkey",
  },
  businessHours: "Mo-Fr 09:00-18:00",
  priceRange: "$$",
  currencies: ["BGN"],
  languages: ["bg"],
  defaultLanguage: "bg",
};

// Page-specific metadata configurations
export const pageMetadata = {
  home: {
    title: "a-el-key мебели | Ръчно изработени мебели в България",
    description:
      "Професионално изработване на мебели по поръчка в София и цяла България. Кухни, спални, гардероби и индивидуални проекти от Андрей Къкрински.",
    keywords:
      "мебели по поръчка, София, България, кухни, спални, гардероби, ръчно изработени мебели",
  },

  gallery: {
    title: "Галерия",
    description:
      "Разгледайте нашата галерия от ръчно изработени мебели. Кухни, спални, гардероби и индивидуални проекти в различни стилове.",
    keywords:
      "галерия мебели, кухни, спални, гардероби, мебели по поръчка, София",
  },

  contact: {
    title: "Контакти",
    description:
      "Свържете се с нас за безплатна консултация по вашия мебелен проект. Работилница в Нови Искър, София.",
    keywords:
      "контакти, мебели, консултация, Нови Искър, София, телефон, имейл",
  },

  faq: {
    title: "Често задавани въпроси",
    description:
      "Отговори на най-често задаваните въпроси за нашите мебели и услуги. Време за изработка, материали, гаранция и доставка.",
    keywords:
      "въпроси, отговори, мебели, време за изработка, материали, гаранция, доставка",
  },

  about: {
    title: "За нас",
    description:
      "Запознайте се с Андрей Къкрински и нашата история в изработката на ръчно изработени мебели в България.",
    keywords:
      "за нас, Андрей Къкрински, история, мебели, ръчно изработени, България",
  },
};

// Gallery category metadata
export function createGalleryCategoryMetadata(
  category: string,
  categoryName: string,
) {
  return {
    title: `${categoryName} | Галерия`,
    description: `Разгледайте нашата галерия от ${categoryName.toLowerCase()} ръчно изработени по поръчка. Качествени материали и индивидуален дизайн.`,
    keywords: `${categoryName.toLowerCase()}, мебели, галерия, ръчно изработени, по поръчка`,
  };
}

// Structured data schemas
export const structuredData = {
  organization: {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: siteConfig.logo,
    image: siteConfig.ogImage,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address.street,
      addressLocality: siteConfig.contact.address.city,
      addressRegion: siteConfig.contact.address.region,
      addressCountry: siteConfig.contact.address.country,
      postalCode: siteConfig.contact.address.postalCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.contact.address.coordinates.latitude,
      longitude: siteConfig.contact.address.coordinates.longitude,
    },
    openingHours: siteConfig.businessHours,
    priceRange: siteConfig.priceRange,
    paymentAccepted: "Cash, Credit Card, Bank Transfer",
    currenciesAccepted: siteConfig.currencies.join(", "),
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
    sameAs: Object.values(siteConfig.social),
  },

  person: {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.creator,
    jobTitle: "Мастер по мебели",
    worksFor: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address.street,
      addressLocality: siteConfig.contact.address.city,
      addressCountry: siteConfig.contact.address.country,
    },
  },

  website: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: siteConfig.defaultLanguage,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/gallery?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  },

  // Local Business schema for better local SEO
  localBusiness: {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address.street,
      addressLocality: siteConfig.contact.address.city,
      addressRegion: siteConfig.contact.address.region,
      addressCountry: siteConfig.contact.address.country,
      postalCode: siteConfig.contact.address.postalCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.contact.address.coordinates.latitude,
      longitude: siteConfig.contact.address.coordinates.longitude,
    },
    openingHours: siteConfig.businessHours,
    priceRange: siteConfig.priceRange,
    paymentAccepted: "Cash, Credit Card, Bank Transfer",
    currenciesAccepted: siteConfig.currencies.join(", "),
    areaServed: {
      "@type": "Country",
      name: "Bulgaria",
    },
    hasMap: `${siteConfig.url}/contact`,
    image: siteConfig.ogImage,
    logo: siteConfig.logo,
  },
};
