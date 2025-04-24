"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// 임시 사용자 ID (실제로는 인증 컨텍스트 또는 세션에서 가져옴)
const mockUserId = "user123";

// 임시 API 호출 시뮬레이션 (실제로는 fetch 또는 axios 사용)
const fetchUserShops = async (userId: string): Promise<string[]> => {
  // 더미 데이터: 가게 ID 목록 (빈 배열이면 가게 없음)
  return ["shop1"]; // 테스트용: 가게 1개 존재
  // return []; // 테스트용: 가게 없음
};

export default function HeaderHandler() {
  const router = useRouter();
  const [hasShops, setHasShops] = useState(false);
  const [shopId, setShopId] = useState<string | null>(null);

  // 가게 등록 여부 확인
  useEffect(() => {
    const checkShops = async () => {
      try {
        const shops = await fetchUserShops(mockUserId);
        setHasShops(shops.length > 0);
        if (shops.length > 0) {
          setShopId(shops[0]); // 첫 번째 가게 ID 저장
        }
      } catch (error) {
        console.error("가게 목록 조회 실패:", error);
      }
    };
    checkShops();
  }, []);

  // 내 가게 클릭 핸들러
  const handleMyShopClick = () => {
    if (hasShops && shopId) {
      router.push(`/shops/${shopId}`);
    } else {
      router.push("/employer"); // 가게 없으면 현재 페이지
    }
  };

  return (
    <header className="bg-kakao py-4 px-6">
      <nav className="flex items-center justify-between max-w-3xl mx-auto">
        <Link href="/notices" className="text-black font-bold">
          The Julge
        </Link>
        <div className="flex space-x-6">
          <Link href="/search" className="text-black">
            가게검색
          </Link>
          <button onClick={handleMyShopClick} className="text-black">
            내 가게
          </button>
          <Link href="/logout" className="text-black">
            로그아웃
          </Link>
          <span className="text-black">알림버튼</span>
        </div>
      </nav>
    </header>
  );
}
