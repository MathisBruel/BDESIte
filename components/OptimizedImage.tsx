import Image from "next/image";
import { migrateImagePath } from "@/lib/image-url";
import { getBlurPlaceholder } from "@/lib/blur-placeholders";

interface OptimizedImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  className?: string;
  loading?: "lazy" | "eager";
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
}

export function OptimizedImage({
  src,
  alt,
  fill,
  width,
  height,
  sizes,
  className,
  loading = "lazy",
  placeholder,
  blurDataURL,
}: OptimizedImageProps) {
  const imageSrc = migrateImagePath(src);
  const isApiImage = imageSrc.startsWith('/api/images/');
  
  // For API images, use unoptimized to avoid Next.js optimization issues
  if (isApiImage) {
    return (
      <Image
        src={imageSrc}
        alt={alt}
        fill={fill}
        width={width}
        height={height}
        sizes={sizes}
        className={className}
        loading={loading}
        placeholder={placeholder}
        blurDataURL={blurDataURL || getBlurPlaceholder(src)}
        unoptimized={true}
      />
    );
  }
  
  // For other images, use normal optimization
  return (
    <Image
      src={imageSrc}
      alt={alt}
      fill={fill}
      width={width}
      height={height}
      sizes={sizes}
      className={className}
      loading={loading}
      placeholder={placeholder}
      blurDataURL={blurDataURL || getBlurPlaceholder(src)}
    />
  );
}
