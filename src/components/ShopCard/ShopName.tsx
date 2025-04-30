/**
 * 식당명(가게명)을 보여주는 컴포넌트
 * props: name
 */
import React from "react";

interface ShopNameProps {
  name: string;
}

export default function ShopName({ name }: ShopNameProps) {
  return <h2 className="text-[20px] font-bold text-gray-900 mb-1">{name}</h2>;
}
