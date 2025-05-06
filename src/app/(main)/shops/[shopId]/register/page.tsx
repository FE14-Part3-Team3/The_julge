"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import ShopRegisterForm from "./components/ShopRegisterForm";
import Image from "next/image";

export default function MyStoreRegisterPage() {
  const { shopId } = useParams();
  const router = useRouter();

  // shopId가 'new'가 아니면 수정 모드로 간주
  const isEditMode = shopId && typeof shopId === "string" && shopId !== "new";

  const handleClose = () => {
    router.back();
  };

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
      
      /* 데스크탑 환경에서 폼 레이아웃 최적화 */
      @media (min-width: 1024px) {
        .shop-register-form {
          max-width: 1100px !important;
          margin: 0 auto;
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
    <main className="max-w-[1200px] mx-auto px-6 py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-[28px]/[100%] lg:text-[32px]/[100%] text-black">
          {isEditMode ? "가게 정보" : "가게 정보 등록"}
        </h1>
        <button onClick={handleClose} className="focus:outline-none">
          <Image
            src="/assets/images/vector.svg"
            width={17.58}
            height={17.58}
            alt="닫기"
          />
        </button>
      </div>
      <div className="w-full shop-register-form bg-[#FAFAFA] p-6 rounded-lg">
        <ShopRegisterForm />
      </div>
    </main>
  );
}
