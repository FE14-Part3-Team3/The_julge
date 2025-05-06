"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ShopEditForm from "./components/ShopEditForm";

export default function ShopEditPage() {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  // 반응형 스타일을 동적으로 적용하기 위한 useEffect
  useEffect(() => {
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
      
      /* 큰 화면에서 폼 크기 확장 */
      @media (min-width: 1024px) {
        .shop-register-container {
          max-width: 1200px !important;
        }
        .shop-register-form {
          width: 100% !important;
          max-width: 1100px !important;
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
    <div className="min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6 py-10 shop-register-container">
        {/* 헤더 영역: 제목과 닫기 버튼 */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-bold text-[28px]/[100%] lg:text-[32px]/[100%]">
            가게 정보
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

        {/* 가게 정보 편집 폼 컴포넌트 */}
        <div className="shop-register-form w-full bg-[#FAFAFA] p-6 rounded-lg">
          <ShopEditForm />
        </div>
      </div>
    </div>
  );
}
