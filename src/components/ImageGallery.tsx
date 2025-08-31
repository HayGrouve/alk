"use client";

import { useQuery } from "convex/react";
import Image from "next/image";
import { api } from "../../convex/_generated/api";
import type { Doc } from "../../convex/_generated/dataModel";
import { Button } from "./ui/button";
import { Edit } from "lucide-react";

interface ImageGalleryProps {
  onEditImage?: (image: Doc<"images">) => void;
}

export function ImageGallery({ onEditImage }: ImageGalleryProps) {
  const images: Doc<"images">[] | undefined = useQuery(api.images.getAllImages);

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
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-semibold text-gray-800">
        Качени изображения в базата данни ({images.length})
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {images.map((image) => (
          <div key={image._id} className="overflow-hidden rounded-lg border">
            <Image
              src={image.url}
              alt={image.name}
              width={400}
              height={192}
              className="h-48 w-full object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
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
                Категория: {image.category ?? "Некатегоризирано"}
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

              {onEditImage && (
                <div className="mt-3 flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEditImage(image)}
                    className="flex-1"
                  >
                    <Edit className="mr-1 h-3 w-3" />
                    Редактирай
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
