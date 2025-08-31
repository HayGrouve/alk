"use client";

import { useState } from "react";
import { UploadDropzone } from "@/lib/uploadthing";
import { UploadButton } from "@/lib/uploadthing";

interface ImageUploadProps {
  onUploadComplete?: (url: string) => void;
  onUploadError?: (error: string) => void;
  className?: string;
}

export function ImageUpload({
  onUploadComplete,
  onUploadError,
  className = "",
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  return (
    <div className={`w-full ${className}`}>
      <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          setIsUploading(false);
          if (res?.[0]) {
            onUploadComplete?.(res[0].url);
          }
        }}
        onUploadError={(error: Error) => {
          setIsUploading(false);
          onUploadError?.(error.message);
        }}
        onUploadBegin={(_name) => {
          setIsUploading(true);
        }}
        appearance={{
          container:
            "border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors",
          uploadIcon: "text-gray-400 mb-4",
          label: "text-gray-700 font-medium",
          allowedContent: "text-gray-500 text-sm mt-2",
          button:
            "bg-[#003C70] hover:bg-[#002a4f] text-white px-6 py-2 rounded-md font-medium transition-colors",
        }}
        content={{
          uploadIcon: (
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ),
          label: "Качете изображение",
          allowedContent: "PNG, JPG, WebP до 8MB",
        }}
      />

      {isUploading && (
        <div className="mt-4 text-center">
          <div className="inline-flex items-center rounded-md bg-[#5EB665] px-4 py-2 text-white">
            <svg
              className="mr-3 -ml-1 h-5 w-5 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Качване...
          </div>
        </div>
      )}
    </div>
  );
}

export function SimpleUploadButton({
  onUploadComplete,
  onUploadError,
  className = "",
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  return (
    <div className={className}>
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          setIsUploading(false);
          if (res?.[0]) {
            onUploadComplete?.(res[0].url);
          }
        }}
        onUploadError={(error: Error) => {
          setIsUploading(false);
          onUploadError?.(error.message);
        }}
        onUploadBegin={(_name) => {
          setIsUploading(true);
        }}
        appearance={{
          button:
            "bg-[#003C70] hover:bg-[#002a4f] text-white px-6 py-2 rounded-md font-medium transition-colors disabled:opacity-50",
        }}
        content={{
          button: isUploading ? "Качване..." : "Качи изображение",
        }}
      />
    </div>
  );
}
