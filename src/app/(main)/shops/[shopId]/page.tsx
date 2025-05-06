/**
 * 고용주가 자신의 가게 정보와 등록한 공고를 확인하는 페이지
 */
"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import RegisterCard from "@/components/Card/RegisterCard";
import ShopNotices from "@/components/ShopNotices/ShopNotices";
import ShopInfoCard from "@/components/ShopCard/ShopInfoCard";
import { useGetShop } from "@/hooks/api/useShopService";

export default function ShopDetailPage() {
  const router = useRouter();
  const params = useParams();
  const shopId = params.shopId as string;

  // API 연동
  const { data, isLoading, error } = useGetShop(shopId);
  const shop = data?.item;

  // 로딩 중 표시
  if (isLoading) {
    return <div className="text-center py-10">로딩 중...</div>;
  }

  // 가게 정보를 컴포넌트에서 사용 가능한 형태로 변환
  const mappedShop = shop && {
    ...shop,
    location: shop.address1,
    userId: shop.user?.item?.id || "",
  };

  // 오류 발생 또는 가게 정보가 없는 경우 가게 등록 안내 카드 표시
  if (error || !mappedShop) {
    return (
      <RegisterCard
        title="내 가게"
        description="내 가게를 소개하고 공고도 등록해 보세요."
        buttonText="가게 등록하기"
        onClick={() => router.push("/shops/new")}
      />
    );
  }

  // 가게 정보 및 공고 목록 표시
  return (
    <div className="max-w-[964px] mx-auto px-6 py-10">
      <h1 className="text-[28px] font-bold mb-6">내 가게</h1>
      <section className="mb-10">
        <ShopInfoCard shop={mappedShop} />
      </section>
      <section>
        <ShopNotices shopId={mappedShop.id} />
      </section>
    </div>
  );
}
