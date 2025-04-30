/**
 * 고용주가 자신의 가게 정보와 등록한 공고를 확인하는 페이지
 */
"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getNoticesByShop } from "@/lib/shared/api";
import NoticeList from "@/components/Notice/NoticeList";
import { Shop, ExtendedNotice } from "@/types/ShopTypes";
import { mockNotices as mockNoticesData } from "@/mock/noticeData";
import RegisterCard from "@/components/Card/RegisterCard";
import { getShopById } from "@/lib/shopApi";
import { ShopInfo as ShopInfoType } from "@/types/api/shop";
import { Section } from "@/components/Section/Section";
import ShopInfoCard from "@/components/ShopCard/ShopInfoCard";

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

// 공통 클래스를 변수로 정의
const containerClass = "w-[351px] sm:w-[680px] md:w-[964px] mx-auto";

export default function ShopDetailPage() {
  const params = useParams();
  const shopId = params.shopId as string;
  const [shop, setShop] = useState<Shop | null>(null);
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
    getShopById(shopId).then((result) => {
      setShop(result as Shop | null);
      setLoading(false);
    });
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
      />
    );
  }

  return (
    <div className="max-w-[964px] mx-auto px-6 py-10">
      {/* 가게 정보 섹션 */}
      <Section name="내 가게" className="mb-10">
        <div className={containerClass}>
          <ShopInfoCard shop={shop} />
        </div>
      </Section>

      {/* 내가 등록한 공고 섹션 */}
      <Section name="내가 등록한 공고">
        <div className={containerClass}>
          <NoticeList notices={notices} shopId={shop.id} hasMore={hasMore} />
        </div>
      </Section>
    </div>
  );
}
