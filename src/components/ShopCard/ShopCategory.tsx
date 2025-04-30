/**
 * 가게 종류(카테고리)를 보여주는 컴포넌트
 * props: category
 */
import React from "react";

interface ShopCategoryProps {
  category: string;
}

export default function ShopCategory({ category }: ShopCategoryProps) {
  return (
    <div className="text-[#FF5B5B] text-sm font-semibold mb-1 mt-[10px]">
      {category}
    </div>
  );
}
