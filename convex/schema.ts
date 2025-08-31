import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  images: defineTable({
    url: v.string(),
    name: v.string(),
    size: v.number(),
    width: v.optional(v.number()),
    height: v.optional(v.number()),
    format: v.optional(v.string()),
    materials: v.optional(v.array(v.string())),
    year: v.optional(v.number()),
    category: v.optional(v.string()), // For gallery categories like "Антре", "Гардероб", etc.
    description: v.optional(v.string()),
    isFeatured: v.optional(v.boolean()),
    createdAt: v.number(),
  })
    .index("by_category", ["category"])
    .index("by_featured", ["isFeatured"])
    .index("by_created_at", ["createdAt"]),
});
