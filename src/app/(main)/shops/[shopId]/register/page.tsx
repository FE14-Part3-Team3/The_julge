"use client";

import { useParams } from "next/navigation";
import ShopRegisterForm from "./components/ShopRegisterForm";

export default function MyStoreRegisterPage() {
  const { shopId } = useParams();

  // shopId가 'new'가 아니면 수정 모드로 간주
  const isEditMode = shopId && typeof shopId === "string" && shopId !== "new";

  return (
    <main className="lg:max-w-[964px] mx-auto mt-[60px] sm:min-mx-[32px]">
      <h1 className="font-bold text-lg text-black">
        {isEditMode ? "가게 정보 수정" : "가게 정보 등록"}
      </h1>
      <ShopRegisterForm />
    </main>
  );
}
