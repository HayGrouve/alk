"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "framer-motion";
import { useRef } from "react";

// Sample featured furniture data - in a real app, this would come from your CMS/database
const featuredCreations = [
  {
    id: 1,
    title: "Модерна кухня с остров",
    description:
      "Съвременна кухня с остров, изработена от масивна дъбова дървесина с матови лакове. Включва вградени уреди и интелигентно осветление.",
    materials: "Масивна дъбова дървесина, матови лакове, неръждаема стомана",
    image: "/api/placeholder/600/400",
    category: "kitchens",
    year: "2024",
    slug: "modern-kitchen-island",
  },
  {
    id: 2,
    title: "Класическа спалня с гардероб",
    description:
      "Елегантна спалня в класически стил с вграден гардероб и нощни шкафчета. Изработена от вишнова дървесина с традиционни техники.",
    materials: "Вишнова дървесина, традиционни техники, бронзови дръжки",
    image: "/api/placeholder/600/400",
    category: "bedrooms",
    year: "2024",
    slug: "classic-bedroom-wardrobe",
  },
  {
    id: 3,
    title: "Офис бюро с библиотека",
    description:
      "Функционално офис бюро с вградена библиотека и скрити отделения. Перфектно за домашен офис или кабинет.",
    materials: "Ясенова дървесина, метални акценти, стъклени врати",
    image: "/api/placeholder/600/400",
    category: "office",
    year: "2024",
    slug: "office-desk-library",
  },
  {
    id: 4,
    title: "Гостинска мебел с ТВ шкаф",
    description:
      "Стилен комплект гостинска мебел с ТВ шкаф, секция и масичка за кафе. Съвременен дизайн с функционалност.",
    materials: "МДФ с ламинат, метални крака, стъклени повърхности",
    image: "/api/placeholder/600/400",
    category: "living-room",
    year: "2024",
    slug: "living-room-tv-unit",
  },
];

// Animation configurations
const staggerDelay = 0.2;
const animationDuration = 0.6;

export function FeaturedCreations() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="bg-gray-50 py-16 dark:bg-gray-900"
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
            className="mb-4 text-3xl font-bold text-[#003C70] md:text-4xl dark:text-blue-400"
          >
            Избрани Творения
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Представяме ви нашите най-добри проекти - уникални мебели,
            изработени с внимание към детайла и качеството.
          </p>
        </motion.div>

        {/* Featured Creations Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4">
          {featuredCreations.map((creation, index) => (
            <motion.article
              key={creation.id}
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
              className="group overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl dark:bg-gray-800 dark:shadow-gray-900/50"
              whileHover={{ y: -8 }}
              role="article"
              aria-labelledby={`creation-${creation.id}-title`}
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
                    src={creation.image}
                    alt={creation.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  />

                  {/* Overlay with year */}
                  <div className="absolute top-4 right-4 rounded-full bg-white/90 px-3 py-1 backdrop-blur-sm dark:bg-gray-800/90">
                    <span className="text-sm font-semibold text-[#003C70] dark:text-blue-400">
                      {creation.year}
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3
                  id={`creation-${creation.id}-title`}
                  className="mb-3 text-xl font-bold text-[#003C70] transition-colors duration-300 group-hover:text-[#0056b3] dark:text-blue-400 dark:group-hover:text-blue-300"
                >
                  {creation.title}
                </h3>

                <p className="mb-4 line-clamp-3 text-gray-600 dark:text-gray-300">
                  {creation.description}
                </p>

                {/* Materials */}
                <div className="mb-4">
                  <h4 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Материали:
                  </h4>
                  <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                    {creation.materials}
                  </p>
                </div>

                {/* Call to Action */}
                <Link
                  href={`/gallery/${creation.category}/${creation.slug}`}
                  className="inline-flex w-full items-center justify-center rounded-lg bg-[#003C70] px-4 py-2 text-white transition-colors duration-300 hover:bg-[#0056b3] focus:ring-2 focus:ring-[#003C70] focus:ring-offset-2 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-500"
                  aria-label={`Вижте ${creation.title} в галерията`}
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

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
          className="mt-12 text-center"
        >
          <Link
            href="/gallery"
            className="inline-flex items-center rounded-lg border-2 border-[#003C70] bg-transparent px-8 py-3 text-[#003C70] transition-all duration-300 hover:bg-[#003C70] hover:text-white focus:ring-2 focus:ring-[#003C70] focus:ring-offset-2 focus:outline-none dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-gray-900 dark:focus:ring-blue-500"
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
      </div>
    </section>
  );
}
