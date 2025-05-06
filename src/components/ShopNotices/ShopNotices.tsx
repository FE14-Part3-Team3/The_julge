"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NoticeList from "@/components/Notice/NoticeList";
import NoticeRegisterCard from "@/components/Card/NoticeRegisterCard";
import { ExtendedNotice } from "@/types/ShopTypes";
import { useShopsNoticeList } from "@/hooks/api/useNoticeService";
import { GetListQuery } from "@/types/common";
import { ItemWrapper } from "@/types/api/notice";

// API 설정 상수
const API_CONFIG = {
  ITEMS_PER_PAGE: 6,
};

interface ShopNoticesProps {
  shopId: string;
}

export default function ShopNotices({ shopId }: ShopNoticesProps) {
  const router = useRouter();
  const [notices, setNotices] = useState<ExtendedNotice[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(0);

  // API를 통한 공고 목록 조회
  const { data, isLoading } = useShopsNoticeList(shopId, {
    offset: page * API_CONFIG.ITEMS_PER_PAGE,
    limit: API_CONFIG.ITEMS_PER_PAGE,
  } as GetListQuery);

  // 데이터 로드 효과
  useEffect(() => {
    if (data) {
      // API 응답 데이터를 컴포넌트에서 사용할 형태로 변환
      const mapped = (data.items || []).map((itemWrapper: ItemWrapper) => ({
        id: itemWrapper.item.id,
        hourlyPay: itemWrapper.item.hourlyPay,
        startsAt: itemWrapper.item.startsAt,
        workhour: itemWrapper.item.workhour,
        description: itemWrapper.item.description,
        closed: itemWrapper.item.closed,
        shopId: shopId,
      }));

      // 첫 페이지인 경우 교체, 아닌 경우 추가
      setNotices((prev) => (page === 0 ? mapped : [...prev, ...mapped]));
      setHasMore(data.hasNext);
    }
  }, [data, page, shopId]);

  // 페이지 변경 시 초기화
  useEffect(() => {
    setPage(0);
    setNotices([]);
  }, [shopId]);

  // 더 보기 - 무한 스크롤 구현
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 100 >=
        document.documentElement.offsetHeight
      ) {
        if (hasMore && !isLoading) {
          setPage((prev) => prev + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, isLoading]);

  // 로딩 중이고 첫 페이지일 경우에만 로딩 표시
  if (isLoading && notices.length === 0) {
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
          onClick={() => router.push(`/shops/${shopId}/register-notice`)}
        />
      )}
    </>
  );
}
