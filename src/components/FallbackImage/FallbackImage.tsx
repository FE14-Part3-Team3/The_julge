"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";
import { allowedImageDomains, blurDataImage, fallbackImage, imageExtensionRegex } from "@/lib/imageAssets";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface ImageWithFadeProps extends ImageProps {
  fallbackSrc?: string;
  blurDataURL?: string;
}

export const FallbackImage = ({
  src,
  alt,
  fallbackSrc = fallbackImage,
  blurDataURL = blurDataImage,
  className = "",
  ...props
}: ImageWithFadeProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // string 타입 보장
  const url = typeof src === "string" ? src : "";

  // 유효성 검사
  let isValid = false;
  try {
    const parsed = new URL(url);
    const isExtensionOk = imageExtensionRegex.test(parsed.pathname);
    const isDomainOk = allowedImageDomains.includes(parsed.hostname);
    isValid = isExtensionOk && isDomainOk;
  } catch {
    isValid = false;
  }

  // 최종 표시할 이미지 src
  const finalSrc = hasError || !isValid ? fallbackImage : src;



  return (

    <div className="relative w-full h-full">
    <Image
      src={blurDataImage}
      alt={alt}
      fill
      priority
      sizes="sm:100vw, 33vw"
      className={`absolute inset-0 object-cover blur-sm scale-105 transition-opacity duration-300 ${
        isLoaded ? "opacity-0" : "opacity-100"
      }`}
      aria-hidden="true"
    />
    <Image
      src={finalSrc}
      alt={alt}
      fill
      priority
      unoptimized
      onLoad={() => setIsLoaded(true)}
      sizes="sm:100vw, 33vw"
      className={`object-cover transition-opacity duration-700 ${
        isLoaded ? "opacity-100" : "opacity-0"
      } ${className}`}
      {...props}
    />
  </div>

    // <Image
    //   src={finalSrc}
    //   alt={alt}
    //   onLoad={() => setIsLoaded(true)}
    //   onError={() => setHasError(true)}
    //   placeholder={blurDataURL ? "blur" : undefined}
    //   blurDataURL={blurDataURL}
    //   fill
    //   priority
    //   unoptimized
    //   sizes="(max-width: 768px) 100vw, 33vw"
    //   className={`transition-opacity duration-700 ease-in-out ${
    //     isLoaded ? "opacity-100" : "opacity-0"
    //   } ${className}`}
    //   {...props}
    // />
  );
};

