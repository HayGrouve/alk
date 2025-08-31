"use client";

import { useState, useEffect } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

export function HighContrastToggle() {
  const [isHighContrast, setIsHighContrast] = useState(false);

  useEffect(() => {
    // Check for saved preference or system preference
    const savedPreference = localStorage.getItem("high-contrast-mode");
    const systemPreference = window.matchMedia(
      "(prefers-contrast: high)",
    ).matches;

    if (savedPreference !== null) {
      setIsHighContrast(savedPreference === "true");
    } else {
      setIsHighContrast(systemPreference);
    }
  }, []);

  useEffect(() => {
    // Apply high contrast mode to document
    if (isHighContrast) {
      document.documentElement.classList.add("high-contrast");
    } else {
      document.documentElement.classList.remove("high-contrast");
    }

    // Save preference
    localStorage.setItem("high-contrast-mode", isHighContrast.toString());
  }, [isHighContrast]);

  const toggleHighContrast = () => {
    setIsHighContrast(!isHighContrast);
  };

  return (
    <button
      type="button"
      onClick={toggleHighContrast}
      className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-[#003C70] focus:ring-2 focus:ring-[#003C70] focus:outline-none focus:ring-inset"
      aria-label={
        isHighContrast ? "Изключи висок контраст" : "Включи висок контраст"
      }
      title={
        isHighContrast ? "Изключи висок контраст" : "Включи висок контраст"
      }
    >
      {isHighContrast ? (
        <SunIcon className="h-5 w-5" aria-hidden="true" />
      ) : (
        <MoonIcon className="h-5 w-5" aria-hidden="true" />
      )}
    </button>
  );
}
