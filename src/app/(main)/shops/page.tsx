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
  const [error, setError] = useState<string | null>(null);

  // 사용자의 가게 정보 조회
  useEffect(() => {
    if (!isLogin || !user || !user.id) {
      console.log("[ShopsIndexPage] 로그인 상태 확인:", { isLogin, user });
      setLoading(false);
      return;
    }

    // 로컬스토리지 값 확인
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("id");
    console.log("[ShopsIndexPage] 로컬스토리지 확인:", {
      token: !!token,
      userId,
    });

    // 사용자의 가게 정보 조회 (약간의 지연 후)
    const fetchShopInfo = async () => {
      try {
        console.log("[ShopsIndexPage] 가게 정보 조회 시작, userId:", user.id);

        // 약간의 지연 후 API 호출 - 가끔 API가 너무 빨리 호출되면 인증 문제가 발생할 수 있음
        await new Promise((resolve) => setTimeout(resolve, 500));

        const result = await getMyShop(user.id);
        console.log("[ShopsIndexPage] 가게 정보 조회 결과:", result);

        if (result) {
          // 가게가 있으면 해당 가게 상세 페이지로 이동
          console.log("[ShopsIndexPage] 가게 발견, 리다이렉션:", result.id);
          router.replace(`/shops/${result.id}`);
        } else {
          // 가게가 없으면 로딩 상태 해제
          console.log("[ShopsIndexPage] 가게 없음, 등록 화면 표시");
          setLoading(false);
        }
      } catch (error) {
        console.error("[ShopsIndexPage] 가게 정보 조회 오류:", error);
        setError("가게 정보를 불러오는 중 오류가 발생했습니다.");
        setLoading(false);
      }
    };

    fetchShopInfo();
  }, [isLogin, user, router]);

  // 로딩 중 표시
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
        <p className="text-gray-600">가게 정보를 불러오는 중...</p>
      </div>
    );
  }

  // 오류 발생 시
  if (error) {
    return (
      <div className="max-w-[964px] mx-auto px-6 py-10">
        <div className="p-4 bg-red-100 border border-red-300 text-red-700 rounded mb-6">
          {error}
          <button
            className="ml-4 underline"
            onClick={() => window.location.reload()}
          >
            다시 시도
          </button>
        </div>
        <RegisterCard
          title="내 가게"
          description="내 가게를 소개하고 공고도 등록해 보세요."
          buttonText="가게 등록하기"
          onClick={() => router.push("/shops/new")}
        />
      </div>
    );
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
