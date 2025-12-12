import { createUploadthing, type FileRouter } from "uploadthing/next";
import sharp from "sharp";
import { storeImageMetadata } from "@/lib/convex-server";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    image: {
      maxFileSize: "8MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req: _req }) => {
      // Optional: Add authentication logic here
      // For now, we'll allow all uploads
      // In production, you might want to add authentication
      return {};
    })
    .onUploadComplete(async ({ file, metadata: _metadata }) => {
      // This code RUNS ON YOUR SERVER after upload

      try {
        // Extract image metadata using Sharp
        const imageResponse = await fetch(file.ufsUrl);
        const imageBuffer = await imageResponse.arrayBuffer();
        const metadata = await sharp(Buffer.from(imageBuffer)).metadata();

        // Store metadata in Convex database
        const imageId = await storeImageMetadata({
          url: file.ufsUrl,
          name: file.name,
          size: file.size,
          title: (file.name || "").replace(/\.[^.]+$/, ""),
          width: metadata.width ?? undefined,
          height: metadata.height ?? undefined,
          format: metadata.format ?? undefined,
          // Additional metadata can be added here
          materials: [], // Will be updated later via admin interface
          year: new Date().getFullYear(), // Default to current year
          category: "uncategorized", // Default category
          description: "", // Will be updated later
          isFeatured: false, // Default to not featured
        });

        return {
          message: "Image Upload Complete",
          url: file.ufsUrl,
          name: file.name,
          size: file.size,
          width: metadata.width,
          height: metadata.height,
          format: metadata.format,
          convexId: imageId,
        };
      } catch (error) {
        console.error("Error processing image metadata:", error);

        // Still return basic info even if metadata extraction fails
        return {
          message: "Image Upload Complete (metadata extraction failed)",
          url: file.ufsUrl,
          name: file.name,
          size: file.size,
          error: "Failed to extract metadata",
        };
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
