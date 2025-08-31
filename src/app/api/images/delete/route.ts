import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../../convex/_generated/api";
import type { Id } from "../../../../../convex/_generated/dataModel";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const utapi = new UTApi();

interface DeleteRequest {
  imageId: string;
  fileUrl: string;
}

export async function DELETE(request: NextRequest) {
  try {
    const body = (await request.json()) as DeleteRequest;
    const { imageId, fileUrl } = body;

    if (!imageId || !fileUrl) {
      return NextResponse.json(
        { error: "Image ID and file URL are required" },
        { status: 400 },
      );
    }

    // Delete from Convex database first
    await convex.mutation(api.images.deleteImage, {
      id: imageId as Id<"images">,
    });

    // Extract file key from UploadThing URL
    // UploadThing URLs are typically: https://utfs.io/f/[fileKey]
    const urlParts: string[] = fileUrl.split("/");
    const fileKey: string = urlParts[urlParts.length - 1] ?? "";

    if (fileKey) {
      try {
        // Delete from UploadThing
        await utapi.deleteFiles([fileKey]);
        console.log(`Successfully deleted file ${fileKey} from UploadThing`);
      } catch (uploadThingError) {
        console.error("Error deleting from UploadThing:", uploadThingError);
        // Don't fail the entire operation if UploadThing deletion fails
        // The Convex deletion already succeeded
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting image:", error);
    return NextResponse.json(
      { error: "Failed to delete image" },
      { status: 500 },
    );
  }
}
