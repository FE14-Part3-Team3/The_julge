/**
 * 식당명(가게명)을 보여주는 컴포넌트
 * props: name
 */
import React, { useState, useEffect } from "react";

interface ShopNameProps {
  name: string;
}

export default function ShopName({ name }: ShopNameProps) {
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

  // 태블릿 모드에서 글자 크기 28px로 설정
  const textSize = deviceSize === "tablet" ? "text-[28px]" : "text-[20px]";

  return <h2 className={`${textSize} font-bold text-gray-900`}>{name}</h2>;
}
