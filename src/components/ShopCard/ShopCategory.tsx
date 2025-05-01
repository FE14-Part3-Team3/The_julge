/**
 * 가게 종류(카테고리)를 보여주는 컴포넌트
 * props: category
 */
import React, { useState, useEffect } from "react";

interface ShopCategoryProps {
  category: string;
}

export default function ShopCategory({ category }: ShopCategoryProps) {
  const [deviceSize, setDeviceSize] = useState<"mobile" | "tablet" | "desktop">(
    "desktop"
  );

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDeviceSize("mobile");
      } else if (width < 1024) {
        setDeviceSize("tablet");
      } else {
        setDeviceSize("desktop");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 태블릿 모드에서 글자 크기 16px로 설정
  const textSize = deviceSize === "tablet" ? "text-base" : "text-sm";

  return (
    <div className={`text-[#FF5B5B] ${textSize} font-semibold`}>{category}</div>
  );
}
