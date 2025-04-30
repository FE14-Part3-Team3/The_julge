"use client";
// =========================
// [목업용]
// =========================
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RegisterCard from "@/components/Card/RegisterCard";
import { getMyShop } from "@/lib/shopApi";
import { ShopInfo } from "@/types/api/shop";

// =========================
// [목업용] (Mock Data Version)
// =========================
export default function ShopsIndexPage() {
  const router = useRouter();
  // 실제로는 로그인 정보에서 userId를 추출해야 함

  const userId = "has-shop"; // 또는 "no-shop" 등으로 테스트
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 가게 정보 조회
    getMyShop(userId).then((result) => {
      if (result) {
        // 가게가 있으면 해당 가게 상세 페이지로 이동
        router.replace(`/shops/${result.id}`);
      } else {
        // 가게가 없으면 로딩 상태 해제
        setLoading(false);
      }
    });
  }, [userId, router]);

  if (loading) return <div className="text-center py-10">로딩 중...</div>;
  return (
    <div className="max-w-[964px] mx-auto px-6 py-10">
      <RegisterCard
        title="내 가게"
        description="내 가게를 소개하고 공고도 등록해 보세요."
        buttonText="가게 등록하기"
        onClick={() => router.push("/shops/new")}
      />
    </div>
  );
}

/*
// =========================
// [실제 서버 연동용]
// =========================
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RegisterCard from "@/components/Card/RegisterCard";
import { getMyShop } from "@/hooks/api/useShopApi"; // API 훅 사용으로 변경
import { useAuth } from "@/hooks/useAuth"; // 인증 관련 훅 (존재한다고 가정)

export default function ShopsIndexPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth(); // 인증 상태 사용
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 로그인 상태 확인
    if (authLoading) return;
    
    if (!isAuthenticated) {
      // 로그인되지 않은 경우 로그인 페이지로 이동
      router.replace("/login");
      return;
    }
    
    // 가게 정보 조회 (API 훅 사용)
    getMyShop()
      .then((shopData) => {
        if (shopData) {
          // 가게가 있으면 해당 가게 상세 페이지로 이동
          router.replace(`/shops/${shopData.id}`);
        } else {
          // 가게가 없으면 로딩 상태 해제
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("가게 정보 조회 실패:", error);
        setLoading(false);
      });
  }, [router, isAuthenticated, authLoading]);

  if (authLoading || loading) return <div className="text-center py-10">로딩 중...</div>;
  
  return (
    <div className="max-w-[964px] mx-auto px-6 py-10">
      <RegisterCard
        title="내 가게"
        description="내 가게를 소개하고 공고도 등록해 보세요."
        buttonText="가게 등록하기"
        onClick={() => router.push("/shops/new")}
      />
    </div>
  );
}
*/
