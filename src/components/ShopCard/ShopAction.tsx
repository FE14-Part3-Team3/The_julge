/**
 * 편집하기, 공고 등록하기 버튼을 보여주는 컴포넌트
 * props: shopId
 */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface ShopActionProps {
  shopId: string;
}

export default function ShopAction({ shopId }: ShopActionProps) {
  const router = useRouter();
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

  // 태블릿 모드에서의 버튼 스타일 설정
  const buttonStyles = {
    mobile: {
      container: "flex flex-row gap-2 justify-start",
      editButton: "w-[151.5px] h-[38px] text-sm/[16px] font-bold",
      registerButton: "w-[151.5px] h-[38px] text-sm/[16px] font-bold",
    },
    tablet: {
      // 정확히 24px 간격 유지, 태블릿 모드 컨테이너 너비는 680px에서 padding 12px * 2를 뺀 656px
      // 각 버튼은 (656px - 8px(버튼 사이 간격)) / 2 = 324px
      container: "flex flex-row gap-2 justify-between",
      editButton: "w-[324px] h-[48px] text-base/[20px] font-bold",
      registerButton: "w-[324px] h-[48px] text-base/[20px] font-bold",
    },
    desktop: {
      container: "flex flex-row gap-2 justify-start",
      editButton: "w-[169px] h-[48px] text-base/[20px] font-bold",
      registerButton: "w-[169px] h-[48px] text-base/[20px] font-bold",
    },
  }[deviceSize];

  return (
    <div className={buttonStyles.container}>
      <button
        className={`${buttonStyles.editButton} border border-red-50 text-red-50 rounded-md text-center`}
        onClick={() => router.push(`/shops/${shopId}/edit`)}
      >
        편집하기
      </button>
      <button
        className={`${buttonStyles.registerButton} bg-red-50 text-white rounded-md text-center`}
        onClick={() => router.push(`/shops/${shopId}/notices/new`)}
      >
        공고 등록하기
      </button>
    </div>
  );
}
