"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageUpload, SimpleUploadButton } from "@/components/ImageUpload";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import { ImageGallery } from "@/components/ImageGallery";

export default function AdminPage() {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [error, setError] = useState<string>("");

  const handleUploadComplete = (url: string) => {
    setUploadedImages((prev) => [...prev, url]);
    setError("");
  };

  const handleUploadError = (error: string) => {
    setError(error);
  };

  return (
    <ConvexClientProvider>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="mb-8 text-3xl font-bold text-[#003C70]">
            Администраторски панел - Качване на изображения
          </h1>

          <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Качи ново изображение
            </h2>

            <ImageUpload
              onUploadComplete={handleUploadComplete}
              onUploadError={handleUploadError}
              className="mb-4"
            />

            <div className="mb-4 text-center text-sm text-gray-500">или</div>

            <div className="text-center">
              <SimpleUploadButton
                onUploadComplete={handleUploadComplete}
                onUploadError={handleUploadError}
              />
            </div>

            {error && (
              <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-4">
                <p className="text-sm text-red-600">
                  Грешка при качване: {error}
                </p>
              </div>
            )}
          </div>

          {/* Display images from Convex database */}
          <ImageGallery />

          {/* Display locally uploaded images (for testing) */}
          {uploadedImages.length > 0 && (
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-4 text-xl font-semibold text-gray-800">
                Локално качени изображения ({uploadedImages.length})
              </h2>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {uploadedImages.map((url, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-lg border"
                  >
                    <Image
                      src={url}
                      alt={`Качено изображение ${index + 1}`}
                      width={400}
                      height={192}
                      className="h-48 w-full object-cover"
                    />
                    <div className="p-3">
                      <p className="truncate text-sm text-gray-600">{url}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </ConvexClientProvider>
  );
}
