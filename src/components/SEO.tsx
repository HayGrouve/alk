import { NextSeo } from "next-seo";
import Script from "next/script";
import { defaultSEO, pageSEO, structuredData } from "@/lib/seo";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  openGraph?: {
    title?: string;
    description?: string;
    images?: Array<{
      url: string;
      width?: number;
      height?: number;
      alt?: string;
    }>;
  };
  structuredData?: Array<object>;
  noindex?: boolean;
}

export function SEO({
  title,
  description,
  keywords,
  canonical,
  openGraph,
  structuredData: customStructuredData,
  noindex = false,
}: SEOProps) {
  const seoConfig = {
    title: title ?? defaultSEO.defaultTitle,
    description: description ?? defaultSEO.description,
    canonical: canonical ?? defaultSEO.canonical,
    noindex,
    nofollow: noindex,
    openGraph: {
      ...defaultSEO.openGraph,
      ...openGraph,
    },
    additionalMetaTags: [
      ...(defaultSEO.additionalMetaTags ?? []),
      ...(keywords ? [{ name: "keywords", content: keywords }] : []),
    ],
  };

  return (
    <>
      <NextSeo {...seoConfig} />

      {/* Default structured data */}
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

      {/* Custom structured data */}
      {customStructuredData?.map((data, index) => (
        <Script
          key={index}
          id={`custom-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(data),
          }}
        />
      ))}
    </>
  );
}

// Predefined SEO configurations for common pages
export const HomeSEO = () => (
  <SEO
    title={pageSEO.home.title}
    description={pageSEO.home.description}
    keywords={pageSEO.home.keywords}
  />
);

export const GallerySEO = () => (
  <SEO
    title={pageSEO.gallery.title}
    description={pageSEO.gallery.description}
    keywords={pageSEO.gallery.keywords}
    canonical="https://a-el-key.com/gallery"
  />
);

export const ContactSEO = () => (
  <SEO
    title={pageSEO.contact.title}
    description={pageSEO.contact.description}
    keywords={pageSEO.contact.keywords}
    canonical="https://a-el-key.com/contact"
  />
);

export const FAQSEO = () => (
  <SEO
    title={pageSEO.faq.title}
    description={pageSEO.faq.description}
    keywords={pageSEO.faq.keywords}
    canonical="https://a-el-key.com/faq"
  />
);

export const AboutSEO = () => (
  <SEO
    title={pageSEO.about.title}
    description={pageSEO.about.description}
    keywords={pageSEO.about.keywords}
    canonical="https://a-el-key.com/about"
  />
);
