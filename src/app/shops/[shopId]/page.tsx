/**
 * 고용주가 자신의 가게 정보와 등록한 공고를 확인하는 페이지
 */
"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Shop } from "@/types/ShopTypes";
import RegisterCard from "@/components/Card/RegisterCard";
import ShopNotices from "@/components/ShopNotices/ShopNotices";
import ShopInfoCard from "@/components/ShopCard/ShopInfoCard";
import { getShopById } from "@/lib/shopApi";

export default function ShopDetailPage() {
  const router = useRouter();
  const params = useParams();
  const shopId = params.shopId as string;
  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);

  // 가게 정보 로드
  useEffect(() => {
    const fetchShopData = async () => {
      try {
        const result = await getShopById(shopId);
        setShop(result as Shop | null);
      } catch (error) {
        console.error("Failed to load shop:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShopData();
  }, [shopId]);

  if (loading) {
    return <div className="text-center py-10">로딩 중...</div>;
  }

  if (!shop) {
    return (
      <RegisterCard
        title="내 가게"
        description="내 가게를 소개하고 공고도 등록해 보세요."
        buttonText="가게 등록하기"
        onClick={() => router.push("/shops/new")}
      />
    );
  }

  return (
    <div className="max-w-[964px] mx-auto px-6 py-10">
      <h1 className="text-[28px] font-bold mb-6">내 가게</h1>

      {/* 가게 정보 섹션 */}
      <section className="mb-10">
        <ShopInfoCard shop={shop} />
      </section>

      {/* 공고 섹션 - 분리된 컴포넌트 사용 */}
      <section>
        <ShopNotices shopId={shop.id} />
      </section>
    </div>
  );
}
