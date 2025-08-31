"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className="relative flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center overflow-hidden text-white"
      style={{ backgroundColor: "#003C70" }}
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #5EB665 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, #5EB665 2px, transparent 2px)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 container flex flex-col items-center justify-center gap-8 px-4 py-16 text-center">
        {/* Logo */}
        <div
          className={`transition-all duration-1000 ease-out ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          <div className="mb-8">
            <Image
              src="/logo.png"
              alt="a-el-key мебели"
              width={200}
              height={200}
              className="mx-auto"
              priority
            />
          </div>
        </div>

        {/* Main message */}
        <div
          className={`transition-all delay-300 duration-1000 ease-out ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl">
            Очаквайте ни <span style={{ color: "#5EB665" }}>скоро</span>
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

        {/* Business description */}
        <div
          className={`transition-all delay-700 duration-1000 ease-out ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          <p className="max-w-xl text-lg text-gray-400 md:text-xl">
            Ръчно изработени мебели по поръчка в град София!
          </p>
        </div>

        {/* Progress indicator */}
        <div
          className={`transition-all delay-900 duration-1000 ease-out ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          <div className="mt-12">
            <div className="mb-4 flex items-center justify-center space-x-2">
              <div
                className="h-3 w-3 animate-pulse rounded-full"
                style={{ backgroundColor: "#5EB665" }}
              ></div>
              <div
                className="animation-delay-200 h-3 w-3 animate-pulse rounded-full"
                style={{ backgroundColor: "#5EB665" }}
              ></div>
              <div
                className="animation-delay-400 h-3 w-3 animate-pulse rounded-full"
                style={{ backgroundColor: "#5EB665" }}
              ></div>
            </div>
            <p className="text-sm text-gray-400">В процес на разработка</p>
          </div>
        </div>
      </div>
    </div>
  );
}
