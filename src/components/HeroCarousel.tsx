"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const carouselImages = [
  {
    id: 1,
    src: "/images/hero/kitchen.jpg",
    alt: "Модерна кухня",
    title: "Модерни кухни",
    description: "Създаваме кухни, които отговарят на вашите нужди и стил",
  },
  {
    id: 2,
    src: "/images/hero/wardrobe.jpg",
    alt: "Елегантен гардероб",
    title: "Гардероби",
    description: "Максимално използване на пространството със стилен дизайн",
  },
  {
    id: 3,
    src: "/images/hero/bedroom.jpg",
    alt: "Спалня",
    title: "Спални",
    description: "Персонализирани спални за най-добър отдих",
  },
  {
    id: 4,
    src: "/images/hero/kids-room.jpg",
    alt: "Детска стая",
    title: "Детски стаи",
    description: "Създаваме вдъхновяващи пространства за най-малките",
  },
];

export function HeroCarousel() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const handleImageChange = (newIndex: number) => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentImageIndex(newIndex);
      setIsFading(false);
    }, 500); // Half of transition duration
  };

  // Auto-rotate images
  useEffect(() => {
    const interval = setInterval(() => {
      handleImageChange((currentImageIndex + 1) % carouselImages.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [currentImageIndex]);

  const currentImage = carouselImages[currentImageIndex];

  // Safety check - this should never happen but TypeScript needs it
  if (!currentImage) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
      {/* Background Image with enhanced overlay */}
      <div
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
          isFading ? "opacity-0" : "opacity-100"
        }`}
        style={{
          backgroundImage: `url(${currentImage.src})`,
        }}
      />

      {/* Dark overlay for better text readability */}
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity duration-1000 ${
          isFading ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Content with enhanced styling */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${
          isFading ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="max-w-5xl px-6 text-center text-white">
          {/* Enhanced title with text shadow */}
          <h1 className="mb-6 text-5xl leading-tight font-bold drop-shadow-2xl md:text-7xl lg:text-8xl">
            {currentImage.title}
          </h1>

          {/* Enhanced description with text shadow */}
          <p className="mx-auto mb-10 max-w-3xl text-xl leading-relaxed text-gray-100 drop-shadow-lg md:text-2xl">
            {currentImage.description}
          </p>

          {/* Enhanced CTA button without gradient */}
          <Link
            href="/gallery"
            className="group inline-flex items-center gap-3 rounded-full bg-[#003C70] px-10 py-4 text-lg font-semibold text-white shadow-2xl transition-all duration-300 hover:bg-[#5eb665] hover:shadow-2xl active:scale-95"
          >
            <span>Вижте нашите проекти</span>
            <svg
              className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>

      {/* Enhanced dot indicators with project colors */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 space-x-3">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => handleImageChange(index)}
            className={`h-4 w-4 rounded-full transition-all duration-300 ${
              index === currentImageIndex
                ? "bg-[#5eb665] shadow-lg shadow-[#5eb665]/50"
                : "bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      {/* Enhanced navigation arrows with project styling */}
      <button
        onClick={() =>
          handleImageChange(
            (currentImageIndex - 1 + carouselImages.length) %
              carouselImages.length,
          )
        }
        className="group absolute top-1/2 left-6 hidden -translate-y-1/2 cursor-pointer rounded-full bg-white/10 p-4 text-white backdrop-blur-sm transition-all duration-300 hover:bg-[#5eb665] md:flex"
      >
        <svg
          className="h-6 w-6 transition-transform duration-300 group-hover:-translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={() =>
          handleImageChange((currentImageIndex + 1) % carouselImages.length)
        }
        className="group absolute top-1/2 right-6 hidden -translate-y-1/2 cursor-pointer rounded-full bg-white/10 p-4 text-white backdrop-blur-sm transition-all duration-300 hover:bg-[#5eb665] md:flex"
      >
        <svg
          className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}
