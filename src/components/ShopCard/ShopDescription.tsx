/**
 * 가게 설명을 보여주는 컴포넌트
 * props: description
 */
import React from "react";

interface ShopDescriptionProps {
  description: string;
}

export default function ShopDescription({ description }: ShopDescriptionProps) {
  return (
    <p className="text-sm text-gray-700 leading-[22px] md:leading-relaxed whitespace-pre-wrap">
      {description}
    </p>
  );
}
