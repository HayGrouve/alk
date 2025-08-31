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

    // Track UploadThing deletion success
    let uploadThingSuccess = false;

    if (fileKey) {
      // Retry UploadThing deletion up to 3 times
      let lastError: Error | null = null;

      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          // Delete from UploadThing with timeout
          const deletePromise = utapi.deleteFiles([fileKey]);
          const timeoutPromise = new Promise((_, reject) => {
            setTimeout(
              () => reject(new Error("UploadThing deletion timeout")),
              15000,
            ); // 15 second timeout
          });

          await Promise.race([deletePromise, timeoutPromise]);

          uploadThingSuccess = true;
          break;
        } catch (uploadThingError) {
          lastError =
            uploadThingError instanceof Error
              ? uploadThingError
              : new Error("Unknown error");
          console.warn(
            `UploadThing deletion attempt ${attempt} failed for file ${fileKey}:`,
            {
              error: lastError.message,
              fileKey,
              fileUrl,
            },
          );

          // Wait before retrying (exponential backoff)
          if (attempt < 3) {
            const delay = Math.pow(2, attempt) * 1000; // 2s, 4s delays
            await new Promise((resolve) => setTimeout(resolve, delay));
          }
        }
      }

      if (!uploadThingSuccess) {
        console.error(
          `Failed to delete file ${fileKey} from UploadThing after 3 attempts:`,
          {
            error: lastError?.message ?? "Unknown error",
            fileKey,
            fileUrl,
          },
        );

        // The Convex deletion already succeeded, so we can continue
        // The file will remain in UploadThing but won't be referenced in our database
      }
    }

    return NextResponse.json({
      success: true,
      message:
        "Image deleted successfully from database" +
        (uploadThingSuccess
          ? " and UploadThing"
          : " (UploadThing deletion may have failed)"),
    });
  } catch (error) {
    console.error("Error deleting image:", error);
    return NextResponse.json(
      { error: "Failed to delete image" },
      { status: 500 },
    );
  }
}
