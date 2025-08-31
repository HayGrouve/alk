"use client";

import { useQuery } from "convex/react";
import Image from "next/image";
import { api } from "../../convex/_generated/api";
import type { Doc } from "../../convex/_generated/dataModel";

export function ImageGallery() {
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
              <p className="truncate text-xs text-gray-500">{image.url}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
