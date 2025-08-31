import { ConvexHttpClient } from "convex/browser";
import { api } from "../../convex/_generated/api";

// Initialize Convex client for server-side use
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

// Type-safe wrapper for storing image metadata
export async function storeImageMetadata(data: {
  url: string;
  name: string;
  size: number;
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    const imageId = await (convex as any).mutation(
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
