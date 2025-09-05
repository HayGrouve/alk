import { ConvexHttpClient } from "convex/browser";
import { api } from "../../convex/_generated/api";

// Lazy initialization of Convex client for server-side use
let convex: ConvexHttpClient | null = null;

function getConvexClient(): ConvexHttpClient {
  if (!convex) {
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
    if (!convexUrl) {
      throw new Error("NEXT_PUBLIC_CONVEX_URL environment variable is not set");
    }
    convex = new ConvexHttpClient(convexUrl);
  }
  return convex;
}

// Type-safe wrapper for storing image metadata
export async function storeImageMetadata(data: {
  url: string;
  name: string;
  size: number;
  title?: string;
  width?: number;
  height?: number;
  format?: string;
  materials?: string[];
  year?: number;
  category?: string;
  description?: string;
  isFeatured?: boolean;
}): Promise<string | null> {
  try {
    const convexClient = getConvexClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    const imageId = await (convexClient as any).mutation(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
      (api as any).images.storeImageMetadata,
      data,
    );
    return imageId as string;
  } catch (error) {
    console.error("Error storing image metadata in Convex:", error);
    return null;
  }
}
