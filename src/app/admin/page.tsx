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
      <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
        <div className="mx-auto max-w-4xl px-3 sm:px-4">
          {/* Header with improved mobile layout */}
          <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-2xl font-bold text-[#003C70] sm:text-3xl">
              Администраторски панел
            </h1>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:space-x-4">
              <span className="text-sm text-gray-600">
                Здравейте, {user?.id}
              </span>
              <button
                onClick={logout}
                className="min-h-[44px] w-full cursor-pointer rounded-md bg-red-600 px-4 py-2 text-sm text-white transition-colors hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none sm:w-auto"
              >
                Изход
              </button>
            </div>
          </div>

          {/* System Monitoring */}
          <div className="mb-6 sm:mb-8">
            <MonitoringDashboard />
          </div>

          <h2 className="mb-4 text-xl font-semibold text-[#003C70] sm:mb-6 sm:text-2xl">
            Качване на изображения
          </h2>

          <div className="mb-6 rounded-lg bg-white p-4 shadow-md sm:mb-8 sm:p-6">
            <h2 className="mb-3 text-lg font-semibold text-gray-800 sm:mb-4 sm:text-xl">
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
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
      </div>
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
