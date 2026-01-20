"use client";

import Image, { ImageProps } from "next/image";
import { getBlurPlaceholder } from "@/lib/blur-placeholders";
import { migrateImagePath } from "@/lib/image-url";

interface OptimizedImageProps extends Omit<ImageProps, 'placeholder' | 'blurDataURL'> {
  src: string;
}

export function OptimizedImage({ src, alt, ...props }: OptimizedImageProps) {
  const imageSrc = migrateImagePath(src);
  const blurDataURL = getBlurPlaceholder(src);

  return (
    <Image
      src={imageSrc}
      alt={alt}
      placeholder={blurDataURL ? "blur" : "empty"}
      blurDataURL={blurDataURL}
      {...props}
    />
  );
}
