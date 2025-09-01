// Hardcoded categories for furniture and interior design
export const FURNITURE_CATEGORIES = [
  "Кухни",
  "Спални",
  "Хол",
  "Антре",
  "Гардероб",
  "Детски стаи",
  "Кабинети",
  "Тоалетки",
  "Други",
] as const;

export type FurnitureCategory = (typeof FURNITURE_CATEGORIES)[number];

// Helper function to check if a string is a valid category
export function isValidCategory(
  category: string,
): category is FurnitureCategory {
  return FURNITURE_CATEGORIES.includes(category as FurnitureCategory);
}

// Helper function to get category display name
export function getCategoryDisplayName(category: string): string {
  return isValidCategory(category) ? category : "Некатегоризирано";
}
