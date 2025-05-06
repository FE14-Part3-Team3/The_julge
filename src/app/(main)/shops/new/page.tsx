// 가게 등록 페이지 구현
// Next.js의 페이지 라우팅 시스템에서 /shops/new 경로에 대응하는 페이지 컴포넌트
import React from "react";
import ShopRegisterForm from "@/app/(main)/shops/[shopId]/register/components/ShopRegisterForm";

export default function NewShopPage() {
  return (
    <main className="lg:max-w-[964px] mx-auto mt-[60px] sm:min-mx-[32px] px-6">
      {/* 페이지 제목 표시 */}
      <h1 className="font-bold text-lg text-black">가게 등록</h1>
      {/* 가게 정보 입력 폼 컴포넌트 */}
      <ShopRegisterForm />
    </main>
  );
}
