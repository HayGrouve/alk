import { FaqPage } from "@/components/FaqPage";
import { FaqBreadcrumb } from "@/components/Breadcrumb";
import { faqData } from "@/data/faq-data";

export default function FAQPage() {
  // Generate structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-8">
          <FaqBreadcrumb />
        </div>

        {/* FAQ Page Content */}
        <FaqPage />
      </div>
    </>
  );
}
