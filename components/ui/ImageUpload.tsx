"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getImageUrl } from "@/lib/image-url";

interface ImageUploadProps {
  defaultImage?: string;
  onImageChange: (file: File | null) => void;
  label?: string;
  className?: string;
}

export function ImageUpload({
  defaultImage,
  onImageChange,
  label = "Image",
  className = "",
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (defaultImage) {
      setPreview(getImageUrl(defaultImage));
    }
  }, [defaultImage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      onImageChange(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleTriggerClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      
      <div className="relative group">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        {preview ? (
          <div className="relative w-full h-64 rounded-lg overflow-hidden border-2 border-gray-200 shadow-sm">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleTriggerClick}
                className="bg-white/90 hover:bg-white text-gray-900 border-none"
              >
                <Upload className="w-4 h-4 mr-2" />
                Changer
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleRemove}
                className="bg-red-500/90 hover:bg-red-600 text-white border-none"
              >
                <X className="w-4 h-4 mr-2" />
                Supprimer
              </Button>
            </div>
          </div>
        ) : (
          <div
            onClick={handleTriggerClick}
            className="w-full h-64 rounded-lg border-2 border-dashed border-gray-300 hover:border-brand-red hover:bg-gray-50 transition-colors flex flex-col items-center justify-center cursor-pointer"
          >
            <div className="p-4 rounded-full bg-gray-100 mb-4 group-hover:scale-110 transition-transform">
              <ImageIcon className="w-8 h-8 text-gray-400 group-hover:text-brand-red" />
            </div>
            <p className="text-sm font-medium text-gray-900">
              Cliquez pour ajouter une image
            </p>
            <p className="text-xs text-gray-500 mt-1">
              PNG, JPG, WEBP jusqu&apos;à 5MB
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
