// src/components/Card/ShopOverview.tsx
/**
 * 가게 정보와 관리 버튼을 표시하는 개요 컴포넌트 (반응형 지원)
 */
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button/Button";

export interface Shop {
  id: string;
  imageUrl: string;
  category: string;
  name: string;
  location: string;
  description: string;
}

interface ShopOverviewProps {
  shop: Shop;
  onEdit?: () => void;
  onRegisterNotice?: () => void;
  hideButtons?: boolean;
}

export default function ShopOverview({
  shop,
  onEdit,
  onRegisterNotice,
  hideButtons = false,
}: ShopOverviewProps) {
  const router = useRouter();

  // 커스텀 버튼 스타일 - ShopInfo 컴포넌트와 일관성 유지
  const customButtonStyle =
    "w-[151.5px] h-[38px] text-sm/[16px] md:w-[312px] md:h-[48px] md:text-base/[20px] lg:w-[169px] lg:h-[48px] font-bold";

  if (!shop) {
    return (
      <div className="text-center text-gray-500">가게 정보가 없습니다.</div>
    );
  }

  return (
    <div
      className="bg-[#FFEBE7] rounded-xl w-full mx-auto 
      h-[489.71px] max-w-[351px] 
      md:h-[677px] md:max-w-[680px] 
      lg:h-[368px] lg:max-w-[964px]"
    >
      <div
        className="flex flex-col p-5 gap-6 
        lg:flex-row lg:p-6"
      >
        {/* 가게 이미지 섹션 - 반응형으로 크기 조정 */}
        <div
          className="w-full flex justify-center
          lg:w-[500px] lg:h-[308px] lg:flex-shrink-0 lg:justify-start"
        >
          <div
            className="w-[280px] h-[177.71px]
            md:w-[560px] md:h-[360.86px]
            lg:w-[500px] lg:h-[308px]"
          >
            <img
              src={shop.imageUrl}
              alt={shop.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
        {/* 가게 정보 및 버튼 섹션 */}
        <div
          className="flex flex-col justify-between flex-grow p-0 m-0
          lg:w-[385px]"
        >
          {/* 가게 정보 표시 영역 */}
          <div className="lg:h-[190px] lg:overflow-y-auto p-0 m-0">
            <div className="text-[#FF5B5B] text-sm font-semibold mb-1">
              {shop.category}
            </div>
            <h2 className="text-[20px] font-bold text-gray-900 mb-1">
              {shop.name}
            </h2>
            <p className="text-sm text-gray-600 flex items-center mb-3">
              <span className="mr-1">📍</span>
              {shop.location}
            </p>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
              {shop.description}
            </p>
          </div>

          {/* 버튼 영역 - 편집 및 공고 등록 버튼 */}
          {!hideButtons && (
            <div className="mt-4">
              <div className="flex gap-2 justify-center lg:justify-end">
                <button
                  className={`${customButtonStyle} border border-red-50 text-red-50 rounded-md text-center`}
                  onClick={
                    onEdit ?? (() => router.push(`/shops/${shop.id}/edit`))
                  }
                >
                  편집하기
                </button>
                <button
                  className={`${customButtonStyle} bg-red-50 text-white rounded-md text-center`}
                  onClick={
                    onRegisterNotice ??
                    (() => router.push(`/shops/${shop.id}/notices/new`))
                  }
                >
                  공고 등록하기
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
