/**
 * 지역(위치) 정보를 IconText 컴포넌트로 보여주는 컴포넌트
 * props: location
 */
import React, { useState, useEffect } from "react";
import IconText from "@/components/IconText/IconText";

interface ShopLocationProps {
  location: string;
}

export default function ShopLocation({ location }: ShopLocationProps) {
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

  // 태블릿 모드에서 글자 크기를 16px로 설정
  const textClass =
    deviceSize === "tablet" ? "leading-[26px] text-base" : "leading-[22px]";

  return (
    <IconText
      iconSrc="/assets/images/map.svg"
      alt="위치"
      text={location}
      className={textClass}
      iconSize={deviceSize === "tablet" ? 24 : 20}
    />
  );
}
