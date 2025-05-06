"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RegisterCard from "@/components/Card/RegisterCard";
import { getMyShop } from "@/lib/shopApi";
import { useAuth } from "@/contexts/AuthContext";

export default function ShopsIndexPage() {
  const router = useRouter();
  const { isLogin, user } = useAuth();
  const [loading, setLoading] = useState(true);

  // 사용자의 가게 정보 조회
  useEffect(() => {
    if (!isLogin || !user || !user.id) {
      setLoading(false);
      return;
    }

    // 사용자의 가게 정보 조회 (실제 API 호출)
    getMyShop(user.id).then((result) => {
      if (result) {
        // 가게가 있으면 해당 가게 상세 페이지로 이동
        router.replace(`/shops/${result.id}`);
      } else {
        // 가게가 없으면 로딩 상태 해제
        setLoading(false);
      }
    });
  }, [isLogin, user, router]);

  // 로딩 중 표시
  if (loading) {
    return <div className="text-center py-10">로딩 중...</div>;
  }

  // 가게 등록 안내 화면
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
