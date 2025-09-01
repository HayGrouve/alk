import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Allow all search engines to crawl the main site
      {
        userAgent: "*",
        allow: [
          "/",
          "/gallery/*",
          "/about",
          "/contact",
          "/faq",
          "/services/*",
          "/locations/*",
        ],
        disallow: [
          "/admin",
          "/api/*",
          "/_next/*",
          "/static/*",
          "/*.json",
          "/*.xml",
          "/sitemap*.xml",
          "/robots.txt",
        ],
        crawlDelay: 1, // Be respectful to the server
      },
      // Specific rules for major search engines
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/admin", "/api/*"],
        crawlDelay: 1,
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/admin", "/api/*"],
        crawlDelay: 1,
      },
      {
        userAgent: "Yandex",
        allow: "/",
        disallow: ["/admin", "/api/*"],
        crawlDelay: 1,
      },
      // Block AI training bots
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "CCBot",
          "anthropic-ai",
          "Claude-Web",
          "Omgilibot",
          "facebookexternalhit",
          "Twitterbot",
          "rogerbot",
          "linkedinbot",
          "embedly",
          "quora link preview",
          "showyoubot",
          "outbrain",
          "pinterest",
          "slackbot",
          "vkShare",
          "W3C_Validator",
        ],
        disallow: "/",
      },
    ],
    sitemap: [
      "https://a-el-key.com/sitemap.xml",
      "https://a-el-key.com/sitemap-0.xml",
    ],
    host: "https://a-el-key.com",
  };
}
