import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Mutation to store image metadata
export const storeImageMetadata = mutation({
  args: {
    url: v.string(),
    name: v.string(),
    size: v.number(),
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
    return await ctx.db.insert("images", {
      ...args,
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

// Mutation to update image metadata
export const updateImageMetadata = mutation({
  args: {
    id: v.id("images"),
    materials: v.optional(v.array(v.string())),
    year: v.optional(v.number()),
    category: v.optional(v.string()),
    description: v.optional(v.string()),
    isFeatured: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    return await ctx.db.patch(id, updates);
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
