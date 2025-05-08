/**
 * 고용주가 자신의 가게 정보와 등록한 공고를 확인하는 페이지
 */
"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import RegisterCard from "@/components/Card/RegisterCard";
import ShopNotices from "@/components/ShopNotices/ShopNotices";
import ShopInfoCard from "@/components/ShopCard/ShopInfoCard";
import { useGetUser } from "@/hooks/api/useUserService";
import { ShopInfo } from "@/types/api/shop";

export default function ShopDetailPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params.shopId as string;
  const { data: userDataWrapper, isLoading, error } = useGetUser(userId);

  if (isLoading) {
    return <div className="text-center py-10">로딩 중...</div>;
  }

  if (error) {
    // useQuery에서 error 객체를 반환하므로, 에러 상태를 표시하는 것이 좋습니다.
    return (
      <div className="text-center py-10">
        데이터를 불러오는 중 오류가 발생했습니다.
      </div>
    );
  }

  const user = userDataWrapper?.item;

  if (!user) {
    router.push("/login");
    return;
  }

  const shopData: ShopInfo | undefined = user.shop?.item;


  // 오류 발생 또는 가게 정보가 없는 경우 가게 등록 안내 카드 표시
  if (!shopData) {
    return (
      <RegisterCard
        title="내 가게"
        description="내 가게를 소개하고 공고도 등록해 보세요."
        buttonText="가게 등록하기"
        onClick={() => router.push("/shops/new")}
      />
    );
  } else {
    return (
      <div className="max-w-[964px] mx-auto px-6 py-10">
        <h1 className="text-[28px] font-bold mb-6">내 가게</h1>
        <section className="mb-10">
          <ShopInfoCard shop={shopData} />
        </section>
        <section>
          <ShopNotices shopId={shopData.id} />
        </section>
      </div>
    );
  }
}
