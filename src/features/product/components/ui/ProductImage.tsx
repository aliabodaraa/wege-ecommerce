"use client";

import Image from "next/image";
import { customLoader } from "@/lib/image-loader";
import { useState } from "react";
import ProductImageFallback from "./product-image-fallback";

interface ProductImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  quality?: number;
  className?: string;
}

export function ProductImage({
  src,
  alt,
  priority = false,
  quality = 85,
  className = "",
}: ProductImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  return (
    <div className="relative w-full h-full">
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
      )}
      {imageError && <ProductImageFallback />}
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 25vw"
        className={`
          object-cover
          transition-opacity duration-300
          ${imageLoaded ? "opacity-100" : "opacity-0"}
          ${className}
        `}
        loader={customLoader}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
        priority={priority}
        quality={quality}
      />
    </div>
  );
}
