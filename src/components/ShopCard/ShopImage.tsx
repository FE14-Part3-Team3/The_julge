/**
 * 가게 이미지를 보여주는 컴포넌트
 * props: imageUrl, alt
 */
import React from "react";

interface ShopImageProps {
  imageUrl: string;
  alt: string;
}

export default function ShopImage({ imageUrl, alt }: ShopImageProps) {
  return (
    <div className="w-[311px] h-[177.71px] md:w-[632px] md:h-[360.86px] lg:w-[539px] lg:h-[308px] mx-auto">
      <img
        src={imageUrl}
        alt={alt}
        className="w-full h-full object-cover rounded-lg"
      />
    </div>
  );
}
