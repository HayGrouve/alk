"use client";

import React, { useEffect } from "react";

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function PerformanceMonitor() {
  useEffect(() => {
    // Track Core Web Vitals (simplified version)
    const trackWebVitals = async () => {
      try {
        // Basic performance tracking without web-vitals library
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === "largest-contentful-paint") {
              console.log("LCP:", entry.startTime);
              if (typeof window !== "undefined" && window.gtag) {
                window.gtag("event", "web_vitals", {
                  event_category: "Performance",
                  event_label: "LCP",
                  value: Math.round(entry.startTime),
                });
              }
            }
          }
        });

        observer.observe({ entryTypes: ["largest-contentful-paint"] });
      } catch (error) {
        console.warn("Failed to setup performance tracking:", error);
      }
    };

    // Track page load performance
    const trackPageLoad = () => {
      if (typeof window === "undefined") return;

      window.addEventListener("load", () => {
        const navigation = performance.getEntriesByType(
          "navigation",
        )[0] as PerformanceNavigationTiming;

        if (navigation) {
          const loadTime = navigation.loadEventEnd - navigation.fetchStart;
          const domContentLoaded =
            navigation.domContentLoadedEventEnd - navigation.fetchStart;

          console.log("Page Load Time:", loadTime);
          console.log("DOM Content Loaded:", domContentLoaded);

          if (typeof window !== "undefined" && window.gtag) {
            window.gtag("event", "page_load", {
              event_category: "Performance",
              event_label: "Load Time",
              value: Math.round(loadTime),
            });
          }
        }
      });
    };

    // Track resource loading performance
    const trackResourcePerformance = () => {
      if (typeof window === "undefined") return;

      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === "resource") {
            const resource = entry as PerformanceResourceTiming;
            if (resource.duration > 1000) {
              // Log slow resources (>1s)
              console.warn("Slow resource:", resource.name, resource.duration);
            }
          }
        }
      });

      observer.observe({ entryTypes: ["resource"] });
    };

    // Initialize tracking
    void trackWebVitals();
    trackPageLoad();
    trackResourcePerformance();

    // Cleanup
    return () => {
      // Cleanup if needed
    };
  }, []);

  return null; // This component doesn't render anything
}

// Error boundary for catching React errors
export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, _errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error);

    // Send error to analytics
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "exception", {
        description: error.message,
        fatal: false,
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
          <div className="text-center">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Възникна грешка
            </h2>
            <p className="mb-4 text-gray-600">
              Съжаляваме, но възникна неочаквана грешка.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="rounded-md bg-[#003C70] px-4 py-2 text-white hover:bg-[#0056b3]"
            >
              Презареди страницата
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
