/**
 * 가게 정보를 보여주는 카드 컴포넌트
 * props: shop
 */
import React, { useState, useEffect } from "react";
import ShopImage from "./ShopImage";
import ShopCategory from "./ShopCategory";
import ShopName from "./ShopName";
import ShopDescription from "./ShopDescription";
import ShopLocation from "./ShopLocation";
import ShopAction from "./ShopAction";
import { Shop } from "@/types/ShopTypes";

// 반응형 컨테이너 클래스
const CONTAINER_CLASSES = {
  mobile: "w-[351px]",
  tablet: "w-[680px]",
  desktop: "w-[964px] h-[356px]",
};

interface ShopInfoCardProps {
  shop: Shop;
}

export default function ShopInfoCard({ shop }: ShopInfoCardProps) {
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

  const containerClass = CONTAINER_CLASSES[deviceSize];
  const isDesktop = deviceSize === "desktop";
  const isTablet = deviceSize === "tablet";

  // 태블릿 모드에서의 패딩 및 레이아웃 설정
  const layoutStyles = {
    // 디바이스 크기에 따라 패딩 조정
    container: `bg-[#FFEBE7] rounded-lg ${
      deviceSize === "mobile" ? "p-[20px]" : "p-[24px]"
    } ${containerClass} mx-auto flex flex-col`,
    contentContainer: `flex ${isDesktop ? "flex-row" : "flex-col"} ${
      isTablet ? "gap-[24px]" : "gap-6"
    } flex-1`,
    // 데스크탑에서는 justify-between 유지, 모바일/태블릿에서는 제거
    infoContainer: `flex-1 flex flex-col ${
      isDesktop ? "lg:justify-between" : ""
    }`,
    // 모바일/태블릿에서만 하단 마진 추가
    textSection: `flex flex-col gap-4 ${isDesktop ? "" : "mb-6"}`,
    // 모바일/태블릿에서만 mt-auto 사용, 데스크탑은 원래대로 mt-0
    buttonSection: `${isDesktop ? "lg:mt-0" : "mt-auto"} ${
      isTablet ? "px-0" : ""
    }`,
  };

  return (
    <div className={layoutStyles.container}>
      <div className={layoutStyles.contentContainer}>
        <div className="flex justify-center">
          <ShopImage imageUrl={shop.imageUrl} alt={shop.name} />
        </div>
        <div className={layoutStyles.infoContainer}>
          <div className={layoutStyles.textSection}>
            <ShopCategory category={shop.category} />
            <ShopName name={shop.name} />
            <ShopLocation location={shop.location} />
            <ShopDescription description={shop.description} />
          </div>
          <div className={layoutStyles.buttonSection}>
            <ShopAction shopId={shop.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
