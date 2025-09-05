import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Basic transliteration + slug normalization for BG → Latin and URL safety
function transliterateBgToLatin(input: string): string {
  const map: Record<string, string> = {
    а: "a",
    б: "b",
    в: "v",
    г: "g",
    д: "d",
    е: "e",
    ж: "zh",
    з: "z",
    и: "i",
    й: "y",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "h",
    ц: "ts",
    ч: "ch",
    ш: "sh",
    щ: "sht",
    ъ: "a",
    ь: "",
    ю: "yu",
    я: "ya",
  };
  return input
    .toLowerCase()
    .split("")
    .map((ch) => map[ch] ?? ch)
    .join("");
}

function normalizeSlug(title: string): string {
  const base = transliterateBgToLatin(title)
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
  return base || "produkt";
}

async function ensureUniqueSlug(ctx: any, base: string): Promise<string> {
  let candidate = base;
  let i = 1;
  // Try base, then base-2, base-3...
  // Uses by_slug index for fast lookups
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const existing = await ctx.db
      .query("images")
      .withIndex("by_slug", (q: any) => q.eq("slug", candidate))
      .unique();
    if (!existing) return candidate;
    i += 1;
    candidate = `${base}-${i}`;
  }
}

// Mutation to store image metadata
export const storeImageMetadata = mutation({
  args: {
    url: v.string(),
    name: v.string(),
    size: v.number(),
    title: v.optional(v.string()),
    width: v.optional(v.number()),
    height: v.optional(v.number()),
    format: v.optional(v.string()),
    materials: v.optional(v.array(v.string())),
    year: v.optional(v.number()),
    category: v.optional(v.string()),
    description: v.optional(v.string()),
    isFeatured: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const title = (args.title ?? "").trim();
    const baseTitle = title || args.name.replace(/\.[^.]+$/, "");
    const baseSlug = normalizeSlug(baseTitle);
    const slug = await ensureUniqueSlug(ctx, baseSlug);

    return await ctx.db.insert("images", {
      ...args,
      title: baseTitle,
      slug,
      createdAt: Date.now(),
    });
  },
});

// Query to get all images
export const getAllImages = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("images").order("desc").collect();
  },
});

// Query to get images by category
export const getImagesByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("images")
      .withIndex("by_category", (q) => q.eq("category", args.category))
      .order("desc")
      .collect();
  },
});

// Query to get featured images
export const getFeaturedImages = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("images")
      .withIndex("by_featured", (q) => q.eq("isFeatured", true))
      .order("desc")
      .collect();
  },
});

// Query to get a single image by ID
export const getImageById = query({
  args: { id: v.id("images") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Query to get a single image by slug
export const getImageBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("images")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
  },
});

// Mutation to update image metadata
export const updateImageMetadata = mutation({
  args: {
    id: v.id("images"),
    title: v.optional(v.string()),
    confirmSlugChange: v.optional(v.boolean()),
    slugOverride: v.optional(v.string()),
    materials: v.optional(v.array(v.string())),
    year: v.optional(v.number()),
    category: v.optional(v.string()),
    description: v.optional(v.string()),
    isFeatured: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, title, confirmSlugChange, slugOverride, ...updates } =
      args as any;
    const doc = await ctx.db.get(id);
    if (!doc) throw new Error("Image not found");

    let patch: Record<string, unknown> = { ...updates };

    if (typeof title === "string") {
      const newTitle = title.trim();
      if (!newTitle || newTitle.length < 2 || newTitle.length > 80) {
        throw new Error("Невалидно заглавие (2–80 символа)");
      }
      patch.title = newTitle;

      // Handle slug change logic
      if (slugOverride && slugOverride.trim()) {
        // Admin override path — ensure uniqueness
        const base = normalizeSlug(slugOverride.trim());
        patch.slug = await ensureUniqueSlug(ctx, base);
      } else if (doc.title !== newTitle) {
        // Title changed, require confirm flag to modify slug to avoid link breakage
        if (confirmSlugChange) {
          const base = normalizeSlug(newTitle);
          patch.slug = await ensureUniqueSlug(ctx, base);
        }
      }
    }

    return await ctx.db.patch(id, patch);
  },
});

// Mutation to delete an image
export const deleteImage = mutation({
  args: { id: v.id("images") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});

// Query to get images with pagination
export const getImagesPaginated = query({
  args: {
    limit: v.number(),
    cursor: v.optional(v.string()),
    category: v.optional(v.string()),
    searchTerm: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let allImages;

    // Apply category filter if provided
    if (args.category) {
      allImages = await ctx.db
        .query("images")
        .withIndex("by_category", (q) => q.eq("category", args.category))
        .order("desc")
        .collect();
    } else {
      allImages = await ctx.db.query("images").order("desc").collect();
    }

    // Apply search filter if provided
    if (args.searchTerm) {
      allImages = allImages.filter(
        (image) =>
          image.name.toLowerCase().includes(args.searchTerm!.toLowerCase()) ||
          (image.description &&
            image.description
              .toLowerCase()
              .includes(args.searchTerm!.toLowerCase())),
      );
    }

    // Apply pagination
    const startIndex = args.cursor ? parseInt(args.cursor) : 0;
    const endIndex = startIndex + args.limit;
    const paginatedImages = allImages.slice(startIndex, endIndex);

    return {
      images: paginatedImages,
      hasMore: endIndex < allImages.length,
      nextCursor: endIndex < allImages.length ? endIndex.toString() : null,
    };
  },
});

// Query to get all unique categories
export const getCategories = query({
  args: {},
  handler: async (ctx) => {
    const images = await ctx.db.query("images").collect();
    const categories = new Set<string>();

    images.forEach((image) => {
      if (image.category) {
        categories.add(image.category);
      }
    });

    return Array.from(categories).sort();
  },
});
