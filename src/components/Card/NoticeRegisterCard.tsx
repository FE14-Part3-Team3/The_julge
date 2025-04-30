"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button/Button";

interface NoticeRegisterCardProps {
  title: string;
  description: string;
  buttonText: string;
  onClick?: () => void;
}

// 반응형 컨테이너 스타일 클래스
const CONTAINER_CLASSES = {
  mobile: "w-[351px]",
  tablet: "w-[680px]",
  desktop: "w-[964px]",
};

// 버튼 크기와 스타일 설정
const BUTTON_STYLES = {
  mobile: {
    width: "w-[151.5px]",
    height: "h-[38px]",
    text: "text-sm/[16px]",
  },
  tablet: {
    width: "w-[324px]", // ShopAction과 동일 크기
    height: "h-[48px]",
    text: "text-base/[20px]",
  },
  desktop: {
    width: "w-[169px]",
    height: "h-[48px]",
    text: "text-base/[20px]",
  },
};

export default function NoticeRegisterCard({
  title,
  description,
  buttonText,
  onClick,
}: NoticeRegisterCardProps) {
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

  // 현재 디바이스 크기에 맞는 컨테이너 클래스 가져오기
  const containerClass = CONTAINER_CLASSES[deviceSize];
  const buttonStyle = BUTTON_STYLES[deviceSize];

  return (
    <div className={`${containerClass} mx-auto`}>
      <h2 className="text-[22px] font-bold mb-6">{title}</h2>
      <div className="flex flex-col h-[217px] items-center justify-center text-center gap-6 border border-gray-20 rounded-2xl p-6 md:p-8 bg-white w-full">
        <p className="text-[14px] md:text-[16px] text-gray-700">
          {description}
        </p>
        <Button
          onClick={onClick ?? (() => router.push("/shops/register"))}
          variant="primary"
          size={deviceSize === "mobile" ? "sm" : "lg"}
          className={`
            font-bold flex items-center justify-center
            ${deviceSize === "mobile" ? "w-[151.5px] h-[38px] text-sm" : ""}
            ${
              deviceSize === "tablet"
                ? "w-[324px] h-[48px] text-base whitespace-nowrap"
                : ""
            }
            ${
              deviceSize === "desktop"
                ? "w-[169px] h-[48px] text-base whitespace-nowrap"
                : ""
            }
          `}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
}
