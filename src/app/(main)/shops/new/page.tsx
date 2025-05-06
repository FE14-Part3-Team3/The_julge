// 가게 등록 페이지 구현
// Next.js의 페이지 라우팅 시스템에서 /shops/new 경로에 대응하는 페이지 컴포넌트
"use client";

import React, { useEffect } from "react";
import ShopRegisterForm from "@/app/(main)/shops/[shopId]/register/components/ShopRegisterForm";

export default function NewShopPage() {
  // 반응형 스타일을 동적으로 적용하기 위한 useEffect
  useEffect(() => {
    // 모바일 환경에서 폼의 그리드 레이아웃을 조정하는 스타일을 추가
    const styleSheet = document.createElement("style");
    styleSheet.id = "responsive-shop-form";
    styleSheet.textContent = `
      @media (max-width: 639px) {
        .grid-cols-2 {
          grid-template-columns: 1fr !important;
        }
        .col-span-1 {
          grid-column: span 1 !important;
        }
      }
    `;
    document.head.appendChild(styleSheet);

    // 컴포넌트 언마운트 시 스타일 제거
    return () => {
      const addedStyle = document.getElementById("responsive-shop-form");
      if (addedStyle) {
        addedStyle.remove();
      }
    };
  }, []);

  return (
    <main className="max-w-[964px] mx-auto mt-[60px] px-4 sm:px-6 mb-10">
      {/* 페이지 제목 표시 */}
      <h1 className="font-bold text-lg sm:text-xl md:text-2xl text-black mb-6">
        가게 등록
      </h1>
      {/* 가게 정보 입력 폼 컴포넌트를 반응형 컨테이너로 감싸기 */}
      <div className="w-full sm:p-4">
        <ShopRegisterForm />
      </div>
    </main>
  );
}
