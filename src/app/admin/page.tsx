"use client";

import { useState, Suspense } from "react";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import { MonitoringDashboard } from "@/components/MonitoringDashboard";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import dynamic from "next/dynamic";
import type { Doc } from "../../../convex/_generated/dataModel";

// Lazy load heavy admin components
const ImageUpload = dynamic(
  () =>
    import("@/components/ImageUpload").then((mod) => ({
      default: mod.ImageUpload,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="h-32 animate-pulse rounded-lg bg-gray-200"></div>
    ),
  },
);

const SimpleUploadButton = dynamic(
  () =>
    import("@/components/ImageUpload").then((mod) => ({
      default: mod.SimpleUploadButton,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="h-10 w-32 animate-pulse rounded bg-gray-200"></div>
    ),
  },
);

const ImageGallery = dynamic(
  () =>
    import("@/components/ImageGallery").then((mod) => ({
      default: mod.ImageGallery,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-48 animate-pulse rounded-lg bg-gray-200"
          ></div>
        ))}
      </div>
    ),
  },
);

const ImageMetadataEditor = dynamic(
  () =>
    import("@/components/ImageMetadataEditor").then((mod) => ({
      default: mod.ImageMetadataEditor,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="h-96 animate-pulse rounded-lg bg-gray-200"></div>
    ),
  },
);

function AdminPageContent() {
  const [error, setError] = useState<string>("");
  const [editingImage, setEditingImage] = useState<Doc<"images"> | null>(null);
  const { user, logout } = useAuth();

  const handleUploadComplete = (_url: string) => {
    setError("");
    // Image is automatically saved to database, no need for local state
  };

  const handleUploadError = (error: string) => {
    setError(error);
  };

  return (
    <ConvexClientProvider>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="mx-auto max-w-4xl px-4">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-[#003C70]">
              Администраторски панел
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Здравейте, {user?.id}
              </span>
              <button
                onClick={logout}
                className="cursor-pointer rounded-md bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
              >
                Изход
              </button>
            </div>
          </div>

          {/* System Monitoring */}
          <div className="mb-8">
            <MonitoringDashboard />
          </div>

          <h2 className="mb-6 text-2xl font-semibold text-[#003C70]">
            Качване на изображения
          </h2>

          <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Качи ново изображение
            </h2>

            <Suspense
              fallback={
                <div className="mb-4 h-32 animate-pulse rounded-lg bg-gray-200"></div>
              }
            >
              <ImageUpload
                onUploadComplete={handleUploadComplete}
                onUploadError={handleUploadError}
                className="mb-4"
              />
            </Suspense>

            <div className="mb-4 text-center text-sm text-gray-500">или</div>

            <div className="text-center">
              <Suspense
                fallback={
                  <div className="mx-auto h-10 w-32 animate-pulse rounded bg-gray-200"></div>
                }
              >
                <SimpleUploadButton
                  onUploadComplete={handleUploadComplete}
                  onUploadError={handleUploadError}
                />
              </Suspense>
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
          <Suspense
            fallback={
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-48 animate-pulse rounded-lg bg-gray-200"
                  ></div>
                ))}
              </div>
            }
          >
            <ImageGallery onEditImage={setEditingImage} />
          </Suspense>
        </div>
      </div>

      {/* Image Metadata Editor Modal */}
      {editingImage && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
          <Suspense
            fallback={
              <div className="h-96 w-full max-w-2xl animate-pulse rounded-lg bg-gray-200"></div>
            }
          >
            <ImageMetadataEditor
              image={editingImage}
              onClose={() => setEditingImage(null)}
            />
          </Suspense>
        </div>
      )}
    </ConvexClientProvider>
  );
}

export default function AdminPage() {
  return (
    <ProtectedRoute>
      <AdminPageContent />
    </ProtectedRoute>
  );
}
