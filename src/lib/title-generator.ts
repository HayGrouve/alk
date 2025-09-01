// import { getCategoryDisplayName } from "./categories"; // Not used in this file

/**
 * Generates appealing titles for images based on their category
 * Replaces technical file names with user-friendly titles
 */

// Category-specific title templates
const CATEGORY_TITLES: Record<string, string[]> = {
  kitchens: [
    "Модерна кухня",
    "Класическа кухня",
    "Минималистична кухня",
    "Индустриална кухня",
    "Скандинавска кухня",
    "Съвременна кухня",
    "Елегантна кухня",
    "Функционална кухня",
  ],
  bedrooms: [
    "Модерна спалня",
    "Класическа спалня",
    "Минималистична спалня",
    "Романтична спалня",
    "Семейна спалня",
    "Елегантна спалня",
    "Уютна спалня",
    "Съвременна спалня",
  ],
  living_rooms: [
    "Модерен хол",
    "Класически хол",
    "Минималистичен хол",
    "Семеен хол",
    "Елегантен хол",
    "Уютен хол",
    "Съвременен хол",
    "Функционален хол",
  ],
  toilets: [
    "Модерна тоалетка",
    "Класическа тоалетка",
    "Минималистична тоалетка",
    "Луксозна тоалетка",
    "Съвременна тоалетка",
    "Елегантна тоалетка",
    "Функционална тоалетка",
    "Стилна тоалетка",
  ],
  offices: [
    "Модерен офис",
    "Класически офис",
    "Минималистичен офис",
    "Съвременен офис",
    "Функционален офис",
    "Елегантен офис",
    "Домашен офис",
    "Креативен офис",
  ],
  wardrobes: [
    "Модерен гардероб",
    "Класически гардероб",
    "Минималистичен гардероб",
    "Функционален гардероб",
    "Елегантен гардероб",
    "Съвременен гардероб",
    "Вграден гардероб",
    "Луксозен гардероб",
  ],
  uncategorized: [
    "Модерен дизайн",
    "Класически дизайн",
    "Минималистичен дизайн",
    "Съвременен дизайн",
    "Елегантен дизайн",
    "Функционален дизайн",
    "Креативен дизайн",
    "Уникален дизайн",
  ],
};

/**
 * Generates a title for an image based on its category and index
 * @param category - The category of the image
 * @param index - The index/position of the image (used for variety)
 * @returns A user-friendly title
 */
export function generateImageTitle(category: string, index = 0): string {
  // Normalize category to lowercase for lookup
  const normalizedCategory = category.toLowerCase().replace(/\s+/g, "_");

  // Get title options for this category, with fallback to uncategorized
  const titleOptions =
    CATEGORY_TITLES[normalizedCategory] ?? CATEGORY_TITLES.uncategorized;

  // Ensure we have a valid array
  if (!titleOptions || titleOptions.length === 0) {
    return "Дизайн проект";
  }

  // Use index to cycle through different title options
  const titleIndex = index % titleOptions.length;
  const baseTitle =
    titleOptions[titleIndex] ?? titleOptions[0] ?? "Дизайн проект";

  return baseTitle;
}

/**
 * Generates a title with a number suffix for uniqueness
 * @param category - The category of the image
 * @param index - The index/position of the image
 * @param totalInCategory - Total number of images in this category
 * @returns A unique title with number suffix
 */
export function generateUniqueImageTitle(
  category: string,
  index = 0,
  _totalInCategory = 1,
): string {
  const baseTitle = generateImageTitle(category, index);

  // Add number suffix for uniqueness (001, 002, etc.)
  const numberSuffix = String(index + 1).padStart(3, "0");

  return `${baseTitle} #${numberSuffix}`;
}

/**
 * Gets a display title for an image, preferring custom title over generated
 * @param image - The image object
 * @param index - The index of the image in the list
 * @returns The best available title for display
 */
export function getImageDisplayTitle(
  image: { name: string; category?: string; customTitle?: string },
  index = 0,
): string {
  // If there's a custom title, use it
  if (image.customTitle?.trim()) {
    return image.customTitle.trim();
  }

  // Otherwise, generate a title based on category
  const category = image.category ?? "uncategorized";
  return generateImageTitle(category, index);
}

/**
 * Gets a unique display title for an image with number suffix
 * @param image - The image object
 * @param index - The index of the image in the list
 * @param totalInCategory - Total images in this category
 * @returns A unique title for display
 */
export function getUniqueImageDisplayTitle(
  image: { name: string; category?: string; customTitle?: string },
  index = 0,
  totalInCategory = 1,
): string {
  // If there's a custom title, use it
  if (image.customTitle?.trim()) {
    return image.customTitle.trim();
  }

  // Otherwise, generate a unique title based on category
  const category = image.category ?? "uncategorized";
  return generateUniqueImageTitle(category, index, totalInCategory);
}
