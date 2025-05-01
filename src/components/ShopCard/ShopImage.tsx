/**
 * 가게 이미지를 보여주는 컴포넌트
 * props: imageUrl, alt
 */
import React, { useState, useEffect } from "react";

interface ShopImageProps {
  imageUrl: string;
  alt: string;
}

export default function ShopImage({ imageUrl, alt }: ShopImageProps) {
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

  // 각 디바이스별 이미지 크기 설정
  // 태블릿 모드에서 정확히 24px 간격 확보 - 680px 컨테이너에 패딩 24px*2 = 48px를 뺀 632px
  const imageClasses = {
    mobile: "w-[311px] h-[177.71px]",
    tablet: "w-[632px] h-[360.86px]", // 정확히 24px 간격 확보
    desktop: "w-[539px] h-[308px]",
  }[deviceSize];

  return (
    <div className={`${imageClasses} mx-auto`}>
      <img
        src={imageUrl}
        alt={alt}
        className="w-full h-full object-cover rounded-lg"
      />
    </div>
  );
}
