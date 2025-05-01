"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NoticeList from "@/components/Notice/NoticeList";
import NoticeRegisterCard from "@/components/Card/NoticeRegisterCard";
import { ExtendedNotice } from "@/types/ShopTypes";
import { generateDummyNotices, TEST_MODE_CONFIG, TestMode } from "./dummyData";
import { useShopsNoticeList } from "@/hooks/api/useNoticeService";
import { GetListQuery } from "@/types/common";
import { ItemWrapper } from "@/types/api/notice";

interface ShopNoticesProps {
  shopId: string;
}

export default function ShopNotices({ shopId }: ShopNoticesProps) {
  const router = useRouter();
  const [notices, setNotices] = useState<ExtendedNotice[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  // 실제 API 연동: useShopsNoticeList
  const { data, isLoading } = useShopsNoticeList(shopId, {
    offset: page * TEST_MODE_CONFIG.ITEMS_PER_PAGE,
    limit: TEST_MODE_CONFIG.ITEMS_PER_PAGE,
  } as GetListQuery);

  // 테스트 모드에 따른 데이터 로드 함수
  const loadTestModeData = (mode: TestMode) => {
    switch (mode) {
      case "empty":
        setNotices([]);
        setHasMore(false);
        setLoading(false);
        break;
      case "random":
        loadRandomData();
        break;
      case "normal":
      default:
        // 실제 API 데이터로 대체
        if (data) {
          // ItemWrapper[] -> ExtendedNotice[] 변환
          const mapped = (data.items || []).map((itemWrapper: ItemWrapper) => ({
            id: itemWrapper.item.id,
            hourlyPay: itemWrapper.item.hourlyPay,
            startsAt: itemWrapper.item.startsAt,
            workhour: itemWrapper.item.workhour,
            description: itemWrapper.item.description,
            closed: itemWrapper.item.closed,
            shopId: shopId,
          }));
          setNotices(mapped);
          setHasMore(data.hasNext);
        }
        setLoading(isLoading);
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
    setLoading(false);
  };

  // 데이터 로드 메인 함수
  const loadNotices = () => {
    loadTestModeData(TEST_MODE_CONFIG.CURRENT_MODE);
  };

  // 초기 데이터 로드
  useEffect(() => {
    setPage(0);
    setNotices([]);
    setLoading(true);
    loadNotices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shopId, data, isLoading]);

  // 무한 스크롤 구현 (테스트 모드에서만 동작)
  useEffect(() => {
    if (TEST_MODE_CONFIG.CURRENT_MODE === "normal") return;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
