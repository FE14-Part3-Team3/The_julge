/**
 * 가게 설명을 보여주는 컴포넌트
 * props: description
 */
import React, { useState, useEffect } from "react";

interface ShopDescriptionProps {
  description: string;
}

export default function ShopDescription({ description }: ShopDescriptionProps) {
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
  const textClass =
    deviceSize === "tablet"
      ? "text-base leading-relaxed"
      : "text-sm leading-[22px]";

  return (
    <p className={`${textClass} text-gray-700 whitespace-pre-wrap`}>
      {description}
    </p>
  );
}
