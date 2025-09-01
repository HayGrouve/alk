import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://a-el-key.com";
  const currentDate = new Date();

  // Static pages with Bulgarian SEO optimization
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 1.0,
      // Bulgarian language targeting
      alternates: {
        languages: {
          bg: baseUrl,
          "x-default": baseUrl,
        },
      },
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.9,
      alternates: {
        languages: {
          bg: `${baseUrl}/gallery`,
          "x-default": `${baseUrl}/gallery`,
        },
      },
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: {
        languages: {
          bg: `${baseUrl}/about`,
          "x-default": `${baseUrl}/about`,
        },
      },
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: {
        languages: {
          bg: `${baseUrl}/contact`,
          "x-default": `${baseUrl}/contact`,
        },
      },
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: {
        languages: {
          bg: `${baseUrl}/faq`,
          "x-default": `${baseUrl}/faq`,
        },
      },
    },
  ];

  // Gallery category pages with Bulgarian naming
  const categories = [
    { slug: "kitchens", name: "кухни", priority: 0.8 },
    { slug: "bedrooms", name: "спални", priority: 0.8 },
    { slug: "living-rooms", name: "холни", priority: 0.7 },
    { slug: "offices", name: "офиси", priority: 0.7 },
    { slug: "children-rooms", name: "детски стаи", priority: 0.7 },
    { slug: "wardrobes", name: "гардероби", priority: 0.8 },
    { slug: "toilets", name: "тоалетки", priority: 0.6 },
    { slug: "dining-rooms", name: "трапезарии", priority: 0.6 },
    { slug: "entrance-halls", name: "входове", priority: 0.6 },
    { slug: "custom-furniture", name: "индивидуални мебели", priority: 0.7 },
  ];

  const categoryPages = categories.map((category) => ({
    url: `${baseUrl}/gallery/${category.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: category.priority,
    alternates: {
      languages: {
        bg: `${baseUrl}/gallery/${category.slug}`,
        "x-default": `${baseUrl}/gallery/${category.slug}`,
      },
    },
  }));

  // Subcategory pages for kitchens (most important category)
  const kitchenSubcategories = [
    { slug: "modern", name: "модерни кухни", priority: 0.7 },
    { slug: "classic", name: "класически кухни", priority: 0.7 },
    { slug: "minimalist", name: "минималистични кухни", priority: 0.7 },
    { slug: "scandinavian", name: "скандинавски кухни", priority: 0.7 },
    { slug: "industrial", name: "индустриални кухни", priority: 0.6 },
    { slug: "rustic", name: "селски кухни", priority: 0.6 },
  ];

  const kitchenSubcategoryPages = kitchenSubcategories.map((subcategory) => ({
    url: `${baseUrl}/gallery/kitchens/${subcategory.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: subcategory.priority,
    alternates: {
      languages: {
        bg: `${baseUrl}/gallery/kitchens/${subcategory.slug}`,
        "x-default": `${baseUrl}/gallery/kitchens/${subcategory.slug}`,
      },
    },
  }));

  // Service pages (important for local SEO)
  const servicePages = [
    {
      url: `${baseUrl}/services/kitchen-design`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: {
        languages: {
          bg: `${baseUrl}/services/kitchen-design`,
          "x-default": `${baseUrl}/services/kitchen-design`,
        },
      },
    },
    {
      url: `${baseUrl}/services/custom-furniture`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: {
        languages: {
          bg: `${baseUrl}/services/custom-furniture`,
          "x-default": `${baseUrl}/services/custom-furniture`,
        },
      },
    },
    {
      url: `${baseUrl}/services/installation`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: {
        languages: {
          bg: `${baseUrl}/services/installation`,
          "x-default": `${baseUrl}/services/installation`,
        },
      },
    },
  ];

  // Local SEO pages for Bulgarian market
  const localSEOPages = [
    {
      url: `${baseUrl}/locations/sofia`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: {
        languages: {
          bg: `${baseUrl}/locations/sofia`,
          "x-default": `${baseUrl}/locations/sofia`,
        },
      },
    },
    {
      url: `${baseUrl}/locations/novi-iskar`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: {
        languages: {
          bg: `${baseUrl}/locations/novi-iskar`,
          "x-default": `${baseUrl}/locations/novi-iskar`,
        },
      },
    },
  ];

  return [
    ...staticPages,
    ...categoryPages,
    ...kitchenSubcategoryPages,
    ...servicePages,
    ...localSEOPages,
  ];
}
