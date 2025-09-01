"use client";

import { useQuery } from "convex/react";
import Image from "next/image";
import { api } from "../../convex/_generated/api";
import type { Doc } from "../../convex/_generated/dataModel";
import { Button } from "./ui/button";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { getCategoryDisplayName } from "@/lib/categories";

interface ImageGalleryProps {
  onEditImage?: (image: Doc<"images">) => void;
}

export function ImageGallery({ onEditImage }: ImageGalleryProps) {
  const images: Doc<"images">[] | undefined = useQuery(api.images.getAllImages);
  const [deletingImageId, setDeletingImageId] = useState<string | null>(null);

  const handleDeleteImage = async (image: Doc<"images">) => {
    if (
      !confirm(
        "Сигурни ли сте, че искате да изтриете това изображение? Това действие не може да бъде отменено.",
      )
    ) {
      return;
    }

    try {
      setDeletingImageId(image._id);

      const response = await fetch("/api/images/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageId: image._id,
          fileUrl: image.url,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete image");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      alert("Грешка при изтриване на изображението. Моля, опитайте отново.");
    } finally {
      setDeletingImageId(null);
    }
  };

  if (!images) {
    return (
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          Качени изображения в базата данни
        </h2>
        <p className="text-gray-600">Зареждане...</p>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          Качени изображения в базата данни
        </h2>
        <p className="text-gray-600">Няма качени изображения.</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-white p-4 shadow-md sm:p-6">
      <h2 className="mb-3 text-lg font-semibold text-gray-800 sm:mb-4 sm:text-xl">
        Качени изображения в базата данни ({images.length})
      </h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {images.map((image) => (
          <div key={image._id} className="overflow-hidden rounded-lg border">
            <Image
              src={image.url}
              alt={image.name}
              width={400}
              height={192}
              className="h-48 w-full object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
              quality={80}
              loading="lazy"
            />
            <div className="p-3">
              <h3 className="font-medium text-gray-800">{image.name}</h3>
              <p className="text-sm text-gray-600">
                {image.width} × {image.height}px
              </p>
              <p className="text-sm text-gray-600">
                {(image.size / 1024 / 1024).toFixed(2)} MB
              </p>
              <p className="text-sm text-gray-600">
                Категория: {getCategoryDisplayName(image.category ?? "")}
              </p>
              {image.materials && image.materials.length > 0 && (
                <p className="text-sm text-gray-600">
                  Материали: {image.materials.join(", ")}
                </p>
              )}
              {image.description && (
                <p className="text-sm text-gray-600">
                  Описание: {image.description}
                </p>
              )}
              <p className="text-sm text-gray-600">Година: {image.year}</p>
              {image.isFeatured && (
                <p className="text-sm font-medium text-blue-600">
                  ⭐ Избрано творение
                </p>
              )}
              <p className="truncate text-xs text-gray-500">{image.url}</p>

              <div className="mt-3 flex gap-2">
                {onEditImage && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEditImage(image)}
                    className="min-h-[44px] flex-1 touch-manipulation"
                  >
                    <Edit className="mr-1 h-3 w-3" />
                    Редактирай
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDeleteImage(image)}
                  disabled={deletingImageId === image._id}
                  className="min-h-[44px] flex-1 touch-manipulation"
                >
                  <Trash2 className="mr-1 h-3 w-3" />
                  {deletingImageId === image._id ? "Изтриване..." : "Изтрий"}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
