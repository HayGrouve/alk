"use client";

import Script from "next/script";

interface AnalyticsProps {
  gaId?: string;
}

export function Analytics({ gaId }: AnalyticsProps) {
  if (!gaId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', {
            page_title: document.title,
            page_location: window.location.href,
          });
        `}
      </Script>
    </>
  );
}

// Performance monitoring utility
export function trackPerformance() {
  if (typeof window === "undefined") return;

  // Track page load time
  window.addEventListener("load", () => {
    const loadTime = performance.now();
    console.log(`Page load time: ${loadTime.toFixed(2)}ms`);
  });
}

// Error tracking utility
export function trackError(error: Error, context?: string) {
  console.error(`Error${context ? ` in ${context}` : ""}:`, error);

  // In production, you would send this to an error tracking service
  if (process.env.NODE_ENV === "production") {
    // Example: Send to Sentry, LogRocket, etc.
    // errorTrackingService.captureException(error, { extra: { context } });
  }
}
