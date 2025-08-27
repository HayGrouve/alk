"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="animate-blob absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-600 opacity-20 mix-blend-multiply blur-xl filter"></div>
        <div className="animate-blob animation-delay-2000 absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-green-500 opacity-20 mix-blend-multiply blur-xl filter"></div>
        <div className="animate-blob animation-delay-4000 absolute top-40 left-40 h-80 w-80 rounded-full bg-blue-500 opacity-20 mix-blend-multiply blur-xl filter"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 container flex flex-col items-center justify-center gap-8 px-4 py-16 text-center">
        {/* Logo/Brand */}
        <div
          className={`transition-all duration-1000 ease-out ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          <div className="mb-4 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-6xl font-bold text-transparent">
            ALK
          </div>
        </div>

        {/* Main message */}
        <div
          className={`transition-all delay-300 duration-1000 ease-out ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl">
            Очаквайте ни{" "}
            <span className="bg-gradient-to-r from-blue-400 via-green-400 to-blue-500 bg-clip-text text-transparent">
              скоро
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <div
          className={`transition-all delay-500 duration-1000 ease-out ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          <p className="max-w-2xl text-xl leading-relaxed text-gray-300 md:text-2xl">
            Подготвяме се да ви изненадаме с нещо изключително.
          </p>
        </div>

        {/* Progress indicator */}
        <div
          className={`transition-all delay-700 duration-1000 ease-out ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          <div className="mt-12">
            <div className="mb-4 flex items-center justify-center space-x-2">
              <div className="h-3 w-3 animate-pulse rounded-full bg-green-400"></div>
              <div className="animation-delay-200 h-3 w-3 animate-pulse rounded-full bg-green-400"></div>
              <div className="animation-delay-400 h-3 w-3 animate-pulse rounded-full bg-green-400"></div>
            </div>
            <p className="text-sm text-gray-400">В процес на разработка</p>
          </div>
        </div>

        {/* Contact info */}
        <div
          className={`transition-all delay-1000 duration-1000 ease-out ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          <div className="mt-16 rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
            <p className="mb-2 text-gray-300">
              Искате да бъдете първите, които разберат?
            </p>
            <p className="font-medium text-green-300">
              Следете ни за повече информация
            </p>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute bottom-8 left-8 text-xs text-gray-500">
        © 2024 ALK. Всички права запазени.
      </div>
    </main>
  );
}
