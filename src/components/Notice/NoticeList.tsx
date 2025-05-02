"use client";

/**
 * 가게의 공고 목록을 표시하는 컴포넌트, 무한 스크롤 기능 지원
 */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ExtendedNotice } from "@/types/ShopTypes";
import Button from "@/components/Button/Button";

// 반응형 컨테이너 클래스
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

interface NoticeListProps {
  notices: ExtendedNotice[];
  shopId: string;
  hasMore: boolean;
}

export default function NoticeList({
  notices,
  shopId,
  hasMore,
}: NoticeListProps) {
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

  // 그리드 열 수 설정
  const gridCols =
    deviceSize === "mobile"
      ? "grid-cols-1"
      : deviceSize === "tablet"
      ? "grid-cols-2"
      : "grid-cols-3";

  return (
    <div
      className={`bg-white border border-gray-200 rounded-xl ${containerClass} h-auto mx-auto p-6`}
    >
      {/* 공고가 없는 경우 표시할 내용 */}
      {notices.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">공고를 등록해 보세요.</p>
          <Button
            variant="primary"
            size={deviceSize === "mobile" ? "sm" : "lg"}
            onClick={() => router.push(`/shops/${shopId}/notices/new`)}
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
            공고 등록하기
          </Button>
        </div>
      ) : (
        <div>
          {/* 공고 카드 그리드 - 반응형으로 열 수 조정 */}
          <div className={`grid ${gridCols} gap-4`}>
            {notices.map((notice) => (
              <div
                key={notice.id}
                className="p-4 border rounded-lg shadow hover:shadow-md cursor-pointer transition"
                onClick={() => router.push(`/notices/${notice.id}`)}
              >
                {/* 공고 제목 */}
                <h3 className="text-lg font-semibold line-clamp-1">
                  {notice.description}
                </h3>
                {/* 급여 및 근무시간 정보 */}
                <div className="text-sm text-gray-600 mt-2">
                  시급 {notice.hourlyPay.toLocaleString()}원
                  {notice.workhour && <> / 근무시간 {notice.workhour}시간</>}
                </div>
                {/* 시작일 표시 */}
                <div className="text-xs text-gray-400 mt-4">
                  {new Date(notice.startsAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>

          {/* 무한 스크롤 로딩 표시 */}
          {hasMore && (
            <div className="text-center py-4 mt-4">
              <p className="text-gray-500">공고 더 불러오는 중...</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
