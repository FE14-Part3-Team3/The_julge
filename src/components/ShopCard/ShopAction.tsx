/**
 * 편집하기, 공고 등록하기 버튼을 보여주는 컴포넌트
 * props: shopId
 */
import React from "react";
import { useRouter } from "next/navigation";

interface ShopActionProps {
  shopId: string;
}

export default function ShopAction({ shopId }: ShopActionProps) {
  const router = useRouter();

  return (
    <div className="flex flex-row gap-2 justify-center lg:justify-end mt-4">
      <button
        className="w-[151.5px] h-[38px] md:w-[632px] md:h-[48px] lg:w-[169px] lg:h-[48px] text-sm/[16px] md:text-base/[20px] font-bold border border-red-50 text-red-50 rounded-md text-center"
        onClick={() => router.push(`/shops/${shopId}/edit`)}
      >
        편집하기
      </button>
      <button
        className="w-[151.5px] h-[38px] md:w-[632px] md:h-[48px] lg:w-[169px] lg:h-[48px] text-sm/[16px] md:text-base/[20px] font-bold bg-red-50 text-white rounded-md text-center"
        onClick={() => router.push(`/shops/${shopId}/notices/new`)}
      >
        공고 등록하기
      </button>
    </div>
  );
}
