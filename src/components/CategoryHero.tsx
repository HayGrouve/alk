"use client";

import { FURNITURE_CATEGORIES } from "@/lib/categories";

interface CategoryHeroProps {
  category?: string;
}

// Category descriptions for the hero section
const categoryDescriptions: Record<string, string> = {
  кухни:
    "Модерни и функционални кухни. От минималистични до класически решения за вашия дом.",
  спални:
    "Уютни и елегантни спални. От компактни до луксозни решения за вашия личен оазис.",
  хол: "Просторни и функционални холове. От модерни до класически решения за вашия дом.",
  антре:
    "Практични и стилни антрета. От компактни до просторни решения за първото впечатление.",
  гардероб:
    "Функционални и елегантни гардероби. От вградени до самостоятелни решения за вашите дрехи.",
  "детски стаи":
    "Игриви и функционални детски стаи. От компактни до просторни решения за вашите малки.",
  кабинети:
    "Практични и стилни кабинети. От домашни до професионални решения за вашата работа.",
  тоалетки:
    "Елегантни и функционални тоалетки. От компактни до луксозни решения за вашата баня.",
  други:
    "Разнообразни решения за вашия дом. От специални проекти до уникални дизайни.",
};

const DEFAULT_DESCRIPTION =
  "Разгледайте нашата колекция от ръчно изработени мебели. Всяко изделие е създадено с внимание към детайла и качеството.";

export function CategoryHero({ category }: CategoryHeroProps) {
  const isCategoryValid =
    category &&
    FURNITURE_CATEGORIES.includes(
      category as (typeof FURNITURE_CATEGORIES)[number],
    );
  const displayCategory = isCategoryValid ? category : "Всички категории";
  const description = isCategoryValid
    ? categoryDescriptions[category]
    : DEFAULT_DESCRIPTION;

  return (
    <div className="relative hidden overflow-hidden rounded-2xl bg-gradient-to-br from-[#003C70] to-[#0056b3] px-4 py-6 text-white sm:block sm:px-8 sm:py-12">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-2 text-2xl font-bold tracking-tight sm:mb-4 sm:text-4xl sm:text-5xl lg:text-6xl">
            {displayCategory}
          </h1>
          {/* Hide description on mobile for better UX */}
          <p className="mx-auto mb-4 hidden max-w-2xl text-lg leading-relaxed text-blue-100 sm:mb-8 sm:block sm:text-xl">
            {description}
          </p>

          {/* Category Stats - Hidden on mobile */}
          <div className="hidden flex-wrap justify-center gap-6 text-sm text-blue-200 sm:flex">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-300"></div>
              <span>Ръчно изработени</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-300"></div>
              <span>Персонализирани проекти</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-300"></div>
              <span>Високо качество</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-white/5"></div>
      <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-white/5"></div>
    </div>
  );
}
