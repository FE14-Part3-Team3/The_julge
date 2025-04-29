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
export default function EmployerPage() {
  const router = useRouter();
  // 실제로는 로그인 정보에서 userId를 추출해야 함

  const userId = "has-shop"; // 또는 "no-shop" 등으로 테스트
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyShop(userId).then((result) => {
      if (result) {
        router.replace(`/employer/${result.id}`);
      } else {
        setLoading(false);
      }
    });
  }, [userId, router]);

  if (loading) return <div className="text-center py-10">로딩 중...</div>;
  return (
    <RegisterCard
      title="내 가게"
      description="내 가게를 소개하고 공고도 등록해 보세요."
      buttonText="가게 등록하기"
    />
  );
}

/*
// =========================
// [실제 서버 연동용]
// =========================
import requestor from "@/lib/axios";
import { GetUserResponse } from "@/types/api/user";
import jwtDecode from "jwt-decode";

export default function EmployerPage() {
  const router = useRouter();
  // 실제로는 로그인 후 localStorage 등에 저장된 토큰을 사용
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserAndShop() {
      if (!token) {
        router.replace("/login");
        return;
      }
      try {
        // 1. 토큰에서 userId 추출 (jwt-decode 사용)
        const decoded: any = jwtDecode(token);
        const userId = decoded.userId; // payload에 userId가 있다고 명세에 기재됨

        // 2. 내 정보 조회 (user + shop 정보 포함)
        const res = await requestor.get<GetUserResponse>(`/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userDetail = res.data.item;
        // userDetail.shop이 있으면 가게가 등록된 상태
        if (userDetail.shop && userDetail.shop.item) {
          router.replace(`/employer/${userDetail.shop.item.id}`);
        } else {
          setLoading(false);
        }
      } catch (e) {
        router.replace("/login");
      }
    }
    fetchUserAndShop();
  }, [token, router]);

  if (loading) return <div className="text-center py-10">로딩 중...</div>;
  return (
    <RegisterCard
      title="내 가게"
      description="내 가게를 소개하고 공고도 등록해 보세요."
      buttonText="가게 등록하기"
    />
  );
}
*/
