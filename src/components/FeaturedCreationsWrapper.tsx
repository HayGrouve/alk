"use client";

import dynamic from "next/dynamic";
import { ConvexErrorBoundary } from "./ConvexErrorBoundary";

const FeaturedCreations = dynamic(
  () =>
    import("@/components/FeaturedCreations").then((mod) => ({
      default: mod.FeaturedCreations,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="mx-auto mb-4 h-8 w-64 animate-pulse rounded bg-gray-200"></div>
            <div className="mx-auto h-4 w-96 animate-pulse rounded bg-gray-200"></div>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-96 animate-pulse rounded-lg bg-gray-200"
              />
            ))}
          </div>
        </div>
      </div>
    ),
  },
);

// Fallback component for when Convex is not available
function FeaturedCreationsFallback() {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-bold text-[#003C70] md:text-4xl">
            Избрани Творения
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Представяме ви нашите най-добри проекти - уникални мебели,
            изработени с внимание към детайла и качеството.
          </p>
        </div>
        <div className="py-12 text-center">
          <p className="text-lg text-gray-600">
            В момента няма избрани творения. Моля, проверете отново по-късно.
          </p>
        </div>
      </div>
    </div>
  );
}

export function FeaturedCreationsWrapper() {
  return (
    <ConvexErrorBoundary fallback={<FeaturedCreationsFallback />}>
      <FeaturedCreations />
    </ConvexErrorBoundary>
  );
}
