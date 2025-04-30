"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NoticeList from "@/components/Notice/NoticeList";
import NoticeRegisterCard from "@/components/Card/NoticeRegisterCard";
import { ExtendedNotice } from "@/types/ShopTypes";
import { getNoticesByShop } from "@/lib/shared/api";
import { generateDummyNotices, TEST_MODE_CONFIG, TestMode } from "./dummyData";

interface ShopNoticesProps {
  shopId: string;
}

export default function ShopNotices({ shopId }: ShopNoticesProps) {
  const router = useRouter();
  const [notices, setNotices] = useState<ExtendedNotice[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  // 테스트 모드에 따른 데이터 로드 함수
  const loadTestModeData = (mode: TestMode) => {
    switch (mode) {
      case "empty":
        setNotices([]);
        setHasMore(false);
        break;

      case "random":
        loadRandomData();
        break;

      case "normal":
      default:
        loadApiData();
        break;
    }
  };

  // 랜덤 데이터 로드 함수
  const loadRandomData = () => {
    const randomNotices = generateDummyNotices(
      shopId,
      TEST_MODE_CONFIG.RANDOM_DATA_COUNT
    );

    const startIndex = page * TEST_MODE_CONFIG.ITEMS_PER_PAGE;
    const endIndex = startIndex + TEST_MODE_CONFIG.ITEMS_PER_PAGE;

    if (startIndex < randomNotices.length) {
      const newNotices = randomNotices.slice(startIndex, endIndex);
      setNotices((prev) =>
        page === 0 ? newNotices : [...prev, ...newNotices]
      );
      setHasMore(endIndex < randomNotices.length);
      setPage((prev) => prev + 1);
    } else {
      setHasMore(false);
    }
  };

  // API 데이터 로드 함수
  const loadApiData = async () => {
    try {
      const result = await getNoticesByShop({
        shopId,
        offset: page * TEST_MODE_CONFIG.ITEMS_PER_PAGE,
        limit: TEST_MODE_CONFIG.ITEMS_PER_PAGE,
      });

      if (result && result.notices) {
        const formattedNotices = result.notices.map((notice) => ({
          ...notice,
          shopId,
        })) as ExtendedNotice[];

        setNotices((prev) => [...prev, ...formattedNotices]);
        setHasMore(result.hasNext || false);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Failed to load notices:", error);
    }
  };

  // 데이터 로드 메인 함수
  const loadNotices = async () => {
    // 무한 스크롤에서는 이미 로딩 중이면 추가 로드 방지
    if (loading && page > 0) return;

    try {
      setLoading(true);
      loadTestModeData(TEST_MODE_CONFIG.CURRENT_MODE);
    } catch (error) {
      console.error("Failed to load notices:", error);
    } finally {
      setLoading(false);
    }
  };

  // 초기 데이터 로드
  useEffect(() => {
    // 페이지 초기화 및 초기 데이터 로드
    setPage(0);
    setNotices([]);
    setLoading(true);

    // 테스트 모드에 따라 초기 데이터 로드
    loadTestModeData(TEST_MODE_CONFIG.CURRENT_MODE);

    // 로딩 상태 해제
    setLoading(false);
  }, [shopId]);

  // 무한 스크롤 구현
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 100 >=
        document.documentElement.offsetHeight
      ) {
        if (hasMore && !loading) {
          loadNotices();
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);

  // 로딩 중이고 첫 페이지일 경우에만 로딩 표시
  if (loading && notices.length === 0) {
    return <div className="text-center py-6">공고 로딩 중...</div>;
  }

  const hasNotices = notices.length > 0;

  return (
    <>
      {hasNotices ? (
        <>
          <h2 className="text-[22px] font-bold mb-6">내가 등록한 공고</h2>
          <NoticeList notices={notices} shopId={shopId} hasMore={hasMore} />
        </>
      ) : (
        <NoticeRegisterCard
          title="등록한 공고"
          description="공고를 등록해 보세요."
          buttonText="공고 등록하기"
          onClick={() => router.push(`/shops/${shopId}/notices/new`)}
        />
      )}
    </>
  );
}
