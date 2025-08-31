"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Doc } from "../../convex/_generated/dataModel";
import { getCategoryDisplayName } from "@/lib/categories";

// Helper function to create a slug from the image name
function createSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

// Animation configurations
const staggerDelay = 0.2;
const animationDuration = 0.6;

// Main component that uses Convex queries
export function FeaturedCreations() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Use Convex query - error boundary will catch any issues
  const featuredImages: Doc<"images">[] | undefined = useQuery(
    api.images.getFeaturedImages,
  );

  return (
    <FeaturedCreationsContent
      ref={ref}
      isInView={isInView}
      featuredImages={featuredImages}
    />
  );
}

// Content component that renders the actual UI
function FeaturedCreationsContent({
  ref,
  isInView,
  featuredImages,
}: {
  ref: React.RefObject<HTMLElement | null>;
  isInView: boolean;
  featuredImages: Doc<"images">[] | undefined;
}) {
  return (
    <section
      ref={ref}
      className="bg-gray-50 py-16"
      aria-labelledby="featured-creations-heading"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 text-center"
        >
          <h2
            id="featured-creations-heading"
            className="mb-4 text-3xl font-bold text-[#003C70] md:text-4xl"
          >
            Избрани Творения
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Представяме ви нашите най-добри проекти - уникални мебели,
            изработени с внимание към детайла и качеството.
          </p>
        </motion.div>

        {/* Loading State */}
        {!featuredImages && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-96 animate-pulse rounded-lg bg-gray-200"
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {featuredImages && featuredImages.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-lg text-gray-600">
              В момента няма избрани творения. Моля, проверете отново по-късно.
            </p>
          </div>
        )}

        {/* Featured Creations Grid */}
        {featuredImages && featuredImages.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4">
            {featuredImages.map((image, index) => (
              <motion.article
                key={image._id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 30, scale: 0.95 }
                }
                transition={{
                  duration: animationDuration,
                  delay: index * staggerDelay,
                  ease: "easeOut",
                }}
                className="group overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl"
                whileHover={{ y: -8 }}
                role="article"
                aria-labelledby={`creation-${image._id}-title`}
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <motion.div
                    initial={{ scale: 1.1, opacity: 0.8 }}
                    animate={
                      isInView
                        ? { scale: 1, opacity: 1 }
                        : { scale: 1.1, opacity: 0.8 }
                    }
                    transition={{
                      duration: 0.8,
                      delay: index * staggerDelay + 0.2,
                      ease: "easeOut",
                    }}
                    className="relative h-full w-full"
                  >
                    <Image
                      src={image.url}
                      alt={image.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      quality={80}
                      loading="lazy"
                    />

                    {/* Overlay with year */}
                    <div className="absolute top-4 right-4 rounded-full bg-white/90 px-3 py-1 backdrop-blur-sm">
                      <span className="text-sm font-semibold text-[#003C70]">
                        {image.year}
                      </span>
                    </div>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3
                    id={`creation-${image._id}-title`}
                    className="mb-3 text-xl font-bold text-[#003C70] transition-colors duration-300 group-hover:text-[#0056b3]"
                  >
                    {image.name}
                  </h3>

                  {image.description && (
                    <p className="mb-4 line-clamp-3 text-gray-600">
                      {image.description}
                    </p>
                  )}

                  {/* Category */}
                  <div className="mb-2">
                    <span className="inline-block rounded-full bg-[#003C70]/10 px-3 py-1 text-sm font-medium text-[#003C70]">
                      {getCategoryDisplayName(image.category ?? "")}
                    </span>
                  </div>

                  {/* Materials */}
                  {image.materials && image.materials.length > 0 && (
                    <div className="mb-4">
                      <h4 className="mb-2 text-sm font-semibold text-gray-700">
                        Материали:
                      </h4>
                      <p className="line-clamp-2 text-sm text-gray-600">
                        {image.materials.join(", ")}
                      </p>
                    </div>
                  )}

                  {/* Call to Action */}
                  <Link
                    href={`/gallery/${image.category ? createSlug(image.category) : "uncategorized"}/${createSlug(image.name)}`}
                    className="inline-flex w-full items-center justify-center rounded-lg bg-[#003C70] px-4 py-2 text-white transition-colors duration-300 hover:bg-[#0056b3] focus:ring-2 focus:ring-[#003C70] focus:ring-offset-2 focus:outline-none"
                    aria-label={`Вижте ${image.name} в галерията`}
                  >
                    <span className="mr-2">Виж в галерията</span>
                    <svg
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* View All Button */}
        {featuredImages && featuredImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
            className="mt-12 text-center"
          >
            <Link
              href="/gallery"
              className="inline-flex items-center rounded-lg border-2 border-[#003C70] bg-transparent px-8 py-3 text-[#003C70] transition-all duration-300 hover:bg-[#003C70] hover:text-white focus:ring-2 focus:ring-[#003C70] focus:ring-offset-2 focus:outline-none"
              aria-label="Вижте всички творения в галерията"
            >
              <span className="mr-2 font-semibold">Виж всички творения</span>
              <svg
                className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
