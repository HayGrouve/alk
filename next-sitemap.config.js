/** @type {import('next-sitemap').IConfig} */
export default {
  siteUrl: process.env.SITE_URL || "https://a-el-key.bg",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ["/admin", "/api", "/test-ui"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "Googlebot",
        allow: "/",
      },
    ],
    additionalSitemaps: ["https://a-el-key.bg/sitemap.xml"],
  },
  transform: async (config, path) => {
    // Custom priority and changefreq for different page types
    const customConfig = {
      loc: path,
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date().toISOString(),
    };

    // Homepage gets highest priority
    if (path === "/") {
      customConfig.priority = 1.0;
      customConfig.changefreq = "daily";
    }

    // Gallery and FAQ pages get high priority
    if (path.startsWith("/gallery") || path === "/faq") {
      customConfig.priority = 0.9;
      customConfig.changefreq = "weekly";
    }

    // Contact page gets high priority for local SEO
    if (path === "/contact") {
      customConfig.priority = 0.8;
      customConfig.changefreq = "monthly";
    }

    return customConfig;
  },
};
