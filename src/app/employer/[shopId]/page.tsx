/**
 * 고용주가 자신의 가게 정보와 등록한 공고를 확인하는 페이지
 */
"use client";

import React, { useEffect, useState } from "react";
import { getNoticesByShop } from "@/lib/shared/api";
import ShopInfo from "@/components/Shop/ShopInfo";
import NoticeList from "@/components/Notice/NoticeList";
import { Shop, ExtendedNotice } from "@/types/ShopTypes";
import { mockNotices as mockNoticesData } from "@/mock/noticeData";
import RegisterCard from "@/components/Card/RegisterCard";
import ShopOverview from "@/components/Card/ShopOverview";

// Mock 데이터를 ExtendedNotice 타입으로 변환
const mockNotices = mockNoticesData as unknown as ExtendedNotice[];

// 임시 가게 데이터
const MOCK_SHOP: Shop = {
  id: "shop-1",
  name: "도토리 식당",
  category: "식당",
  address1: "서울시 송파구",
  address2: "송파동 123-45",
  description:
    "알바하기 편한 나구리네 라면집!\n라면 올려주고 끓이기만 하면 되어서 쉬운 편에 속하는 가게입니다.",
  imageUrl: "/temp-restaurant.jpg",
  originalHourlyPay: 11000,
  location: "서울시 송파구",
  userId: "current-user-id", // 현재 사용자 ID (임시로 설정)
};

// 페이지 당 아이템 수
const ITEMS_PER_PAGE = 6;

interface PageProps {
  params: {
    shopId: string;
  };
}

// 예시: 사장님 id로 가게를 조회하는 mock 함수
async function getMyShop(userId: string) {
  // 실제로는 fetch("/api/shops?userId=...") 등으로 대체
  // 가게가 있으면 객체 반환, 없으면 null 반환
  if (userId === "has-shop") {
    return {
      id: "shop-1",
      imageUrl: "/temp-restaurant.jpg",
      category: "식당",
      name: "도토리 식당",
      location: "서울시 송파구",
      description: "알바하기 편한 나구리네 라면집!",
    };
  }
  return null;
}

export default function ShopDetailPage({ params }: PageProps) {
  // 상태 관리
  const [shop, setShop] = useState<Shop>(MOCK_SHOP);
  const [notices, setNotices] = useState<ExtendedNotice[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);

  // 공고 더 불러오기 (모의 API 호출)
  const loadMoreNotices = () => {
    // 페이지네이션을 시뮬레이션하기 위해 일정 개수만큼 가져옴
    const startIndex = page * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    // 새로운 공고 데이터 가져오기
    const newNotices = mockNotices.slice(startIndex, endIndex);

    // 더 불러올 데이터가 있는지 확인
    const nextHasMore = endIndex < mockNotices.length;

    // 상태 업데이트
    setNotices((prev) => [...prev, ...newNotices]);
    setHasMore(nextHasMore);
    setPage((prev) => prev + 1);
  };

  // 초기 데이터 로드
  useEffect(() => {
    loadMoreNotices();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // 무한 스크롤 구현
  useEffect(() => {
    const handleScroll = () => {
      // 스크롤이 페이지 하단에 가까워졌을 때 추가 데이터 로드
      if (
        window.innerHeight + document.documentElement.scrollTop + 100 >=
        document.documentElement.offsetHeight
      ) {
        if (hasMore) {
          loadMoreNotices();
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    getMyShop(params.shopId).then((result) => {
      setShop(result);
      setLoading(false);
    });
  }, [params.shopId]);

  if (loading) {
    return <div className="text-center py-10">로딩 중...</div>;
  }

  if (!shop) {
    // 가게가 없을 때
    return (
      <RegisterCard
        title="내 가게"
        description="내 가게를 소개하고 공고도 등록해 보세요."
        buttonText="가게 등록하기"
      />
    );
  }

  // 가게가 있을 때
  return (
    <div className="max-w-[964px] mx-auto px-6 py-10">
      <h1 className="text-[28px] font-bold mb-6">내 가게</h1>

      {/* 가게 정보 섹션 */}
      <section className="mb-10">
        <ShopInfo shop={shop} />
      </section>

      {/* 내가 등록한 공고 섹션 */}
      <section>
        <h2 className="text-[22px] font-bold mb-6">내가 등록한 공고</h2>
        <NoticeList notices={notices} shopId={shop.id} hasMore={hasMore} />
      </section>
    </div>
  );
}
