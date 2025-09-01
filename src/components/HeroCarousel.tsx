"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

// Dynamic carousel images based on existing files in /public/images/hero/
const carouselImages = [
  {
    id: 1,
    src: "/images/hero/kitchen.jpg",
    alt: "Модерна кухня с висококачествени материали",
    title: "Модерни кухни",
    description: "Създаваме кухни, които отговарят на вашите нужди и стил",
  },
  {
    id: 2,
    src: "/images/hero/wardrobe.jpg",
    alt: "Елегантен гардероб с интелигентно съхранение",
    title: "Гардероби",
    description: "Максимално използване на пространството със стилен дизайн",
  },
  {
    id: 3,
    src: "/images/hero/bedroom.jpg",
    alt: "Спалня с комфорт и елегантност",
    title: "Спални",
    description: "Персонализирани спални за най-добър отдих",
  },
  {
    id: 4,
    src: "/images/hero/kids-room.jpg",
    alt: "Детска стая с игриво и функционално оформление",
    title: "Детски стаи",
    description: "Създаваме вдъхновяващи пространства за най-малките",
  },
];

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Auto-advance functionality (disabled if reduced motion is preferred)
  useEffect(() => {
    if (!isAutoPlaying || prefersReducedMotion) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1,
      );
    }, 7000); // Change image every 7 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, prefersReducedMotion]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goToNext();
      } else if (e.key === "Home") {
        e.preventDefault();
        goToSlide(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goToSlide(carouselImages.length - 1);
      }
    };

    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("keydown", handleKeyDown);
      return () => carousel.removeEventListener("keydown", handleKeyDown);
    }
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1,
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Touch gesture handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0]?.clientX ?? 0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0]?.clientX ?? 0);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setTouchEnd(null);
    setTouchStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (touchStart !== null) {
      setTouchEnd(e.clientX);
    }
  };

  const handleMouseUp = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  const currentImage = carouselImages[currentIndex];

  if (!currentImage) {
    return null;
  }

  return (
    <div
      ref={carouselRef}
      className="relative h-[70vh] min-h-[500px] w-full overflow-hidden bg-gray-100"
      role="region"
      aria-label="Галерия с мебели"
      aria-live="polite"
      tabIndex={0}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => {
        setTouchStart(null);
        setTouchEnd(null);
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          goToPrevious();
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          goToNext();
        }
      }}
    >
      {/* Main Image Container */}
      <div className="relative h-full w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={
              prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 300 }
            }
            animate={{ opacity: 1, x: 0 }}
            exit={
              prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -300 }
            }
            transition={
              prefersReducedMotion
                ? { duration: 0.1 }
                : {
                    duration: 0.6,
                    ease: "easeInOut",
                  }
            }
            className="absolute inset-0"
          >
            <Image
              src={currentImage.src}
              alt={currentImage.alt}
              fill
              className="cursor-default object-cover"
              priority={currentIndex === 0}
              sizes="100vw"
              quality={85}
              onError={(e) => {
                // Fallback for missing images
                const target = e.target as HTMLImageElement;
                target.src = `https://via.placeholder.com/1200x800/003C70/ffffff?text=${encodeURIComponent(currentImage.title)}`;
              }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Content Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="max-w-4xl px-4 text-center text-white">
                <motion.h1
                  initial={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 30 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0.1 }
                      : { delay: 0.2, duration: 0.6 }
                  }
                  className="mb-4 text-4xl font-bold md:text-6xl"
                >
                  {currentImage.title}
                </motion.h1>
                <motion.p
                  initial={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 30 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0.1 }
                      : { delay: 0.4, duration: 0.6 }
                  }
                  className="mx-auto mb-8 max-w-2xl text-lg md:text-xl"
                >
                  {currentImage.description}
                </motion.p>
                <motion.div
                  initial={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 30 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0.1 }
                      : { delay: 0.6, duration: 0.6 }
                  }
                >
                  <Link
                    href="/gallery"
                    className="inline-block rounded-lg bg-[#003C70] px-8 py-3 text-lg font-semibold text-white transition-colors duration-200 hover:bg-[#003C70]/90"
                  >
                    Вижте нашите проекти
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows - Hidden on mobile for cleaner experience */}
      <button
        onClick={goToPrevious}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        className="absolute top-1/2 left-4 hidden -translate-y-1/2 cursor-pointer rounded-full bg-white/20 p-2 text-white transition-colors duration-200 hover:bg-white/30 focus:ring-2 focus:ring-white/50 focus:outline-none md:block"
        aria-label={`Предишна снимка: ${carouselImages[currentIndex === 0 ? carouselImages.length - 1 : currentIndex - 1]?.title}`}
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </button>

      <button
        onClick={goToNext}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        className="absolute top-1/2 right-4 hidden -translate-y-1/2 cursor-pointer rounded-full bg-white/20 p-2 text-white transition-colors duration-200 hover:bg-white/30 focus:ring-2 focus:ring-white/50 focus:outline-none md:block"
        aria-label={`Следваща снимка: ${carouselImages[currentIndex === carouselImages.length - 1 ? 0 : currentIndex + 1]?.title}`}
      >
        <ChevronRightIcon className="h-6 w-6" />
      </button>

      {/* Dot Indicators */}
      <div
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 space-x-2"
        role="tablist"
        aria-label="Навигация между снимки"
      >
        {carouselImages.map((image, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className={`h-3 w-3 cursor-pointer rounded-full transition-colors duration-200 focus:ring-2 focus:ring-white/50 focus:outline-none ${
              index === currentIndex
                ? "bg-white"
                : "bg-white/50 hover:bg-white/70"
            }`}
            role="tab"
            aria-selected={index === currentIndex}
            aria-label={`Снимка ${index + 1}: ${image.title}`}
            aria-controls={`carousel-slide-${index}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      {!prefersReducedMotion && (
        <div className="absolute bottom-0 left-0 h-1 w-full bg-white/20">
          <motion.div
            className="h-full bg-white"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 7, ease: "linear" }}
            key={currentIndex}
          />
        </div>
      )}
    </div>
  );
}
