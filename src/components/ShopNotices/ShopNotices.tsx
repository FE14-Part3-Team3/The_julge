"use client";

import React, { useEffect, useState, useRef } from "react";
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
  const [error, setError] = useState<string | null>(null);
  const [loadingRetryCount, setLoadingRetryCount] = useState(0);
  const [initialLoading, setInitialLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false); // 데이터 로딩 성공 여부 추적
  const [isMounted, setIsMounted] = useState(false); // 클라이언트 사이드 마운트 여부 확인

  // 상태 대신 ref를 사용하여 렌더링 사이클과 분리
  const loadedNoticeIdsRef = useRef<Set<string>>(new Set());
  const totalNoticeCountRef = useRef<number | null>(null);
  const lastShopIdRef = useRef<string | null>(null); // 마지막으로 처리한 shopId 저장

  // API를 통한 공고 목록 조회
  const { data, isLoading, refetch } = useShopsNoticeList(shopId, {
    offset: page * API_CONFIG.ITEMS_PER_PAGE,
    limit: API_CONFIG.ITEMS_PER_PAGE,
  } as GetListQuery);

  // 컴포넌트가 클라이언트 사이드에서 마운트됐는지 확인
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 디버그 정보를 로깅하는 효과 - Hook 순서 오류 수정을 위해 상단으로 이동
  useEffect(() => {
    if (!isMounted) return; // 서버 사이드 렌더링 시에는 실행하지 않음

    console.log("[ShopNotices] 현재 상태:", {
      hasMore,
      isLoading,
      page,
      공고수: notices.length,
      로딩된ID수: loadedNoticeIdsRef.current.size,
      totalCount: totalNoticeCountRef.current,
    });
  }, [hasMore, isLoading, page, notices.length, isMounted]);

  console.log("[ShopNotices] 컴포넌트 렌더링, shopId:", shopId);

  // API를 통한 공고 목록 직접 호출 함수
  const fetchNotices = async (shopId: string, page: number) => {
    if (!shopId) {
      console.error("[ShopNotices] 유효하지 않은 shopId");
      setError("가게 정보를 찾을 수 없습니다.");
      return null;
    }

    try {
      console.log("[ShopNotices] 공고 목록 직접 조회 시도:", { shopId, page });
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("[ShopNotices] 인증 토큰 없음");
        setError("인증 정보가 없습니다. 다시 로그인해주세요.");
        return null;
      }

      const offset = page * API_CONFIG.ITEMS_PER_PAGE;
      const limit = API_CONFIG.ITEMS_PER_PAGE;

      const response = await fetch(
        `https://bootcamp-api.codeit.kr/api/0-1/the-julge/shops/${shopId}/notices?offset=${offset}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("[ShopNotices] API 응답 상태:", response.status);

      if (!response.ok) {
        if (response.status === 401) {
          console.error("[ShopNotices] 인증 오류 (401)");
          setError("인증이 만료되었습니다. 다시 로그인해주세요.");
        } else {
          console.error("[ShopNotices] API 오류:", response.status);
          setError("공고 목록을 불러오는 중 오류가 발생했습니다.");
        }
        return null;
      }

      const data = await response.json();
      console.log("[ShopNotices] 공고 목록 조회 성공:", {
        count: data.items?.length,
        hasNext: data.hasNext,
        totalCount: data.count,
      });

      // 전체 공고 수 설정 (ref 사용)
      if (data.count !== undefined && totalNoticeCountRef.current === null) {
        totalNoticeCountRef.current = data.count;
      }

      return data;
    } catch (error) {
      console.error("[ShopNotices] 공고 목록 조회 오류:", error);
      setError("공고 목록을 불러오는 중 오류가 발생했습니다.");
      return null;
    }
  };

  // 공고 중복 제거 및 상태 업데이트 함수
  const processNoticeData = (data: any, isFirstPage: boolean) => {
    if (!data || !data.items) {
      console.log("[ShopNotices] 처리할 데이터 없음, 로딩 상태 종료");
      setInitialLoading(false);

      // 데이터가 빈 배열이더라도 데이터 로딩 성공으로 간주
      if (data && data.items && data.items.length === 0) {
        setDataLoaded(true);
      }

      return;
    }

    // 전체 공고 수 저장 (ref 사용)
    if (data.count !== undefined) {
      totalNoticeCountRef.current = data.count;
      console.log("[ShopNotices] 전체 공고 수 설정:", data.count);
    }

    // 새로운 공고 데이터 매핑
    const newNotices = data.items.map((itemWrapper: ItemWrapper) => ({
      id: itemWrapper.item.id,
      hourlyPay: Number(itemWrapper.item.hourlyPay),
      startsAt: itemWrapper.item.startsAt,
      workhour: itemWrapper.item.workhour,
      description: itemWrapper.item.description,
      closed: itemWrapper.item.closed,
      shopId: shopId,
    }));

    console.log("[ShopNotices] 매핑된 공고 데이터:", {
      count: newNotices.length,
      totalCount: data.count,
      isFirstPage,
    });

    // 마감기한이 먼 순으로 정렬 (startsAt 기준으로 내림차순, 더 미래 날짜가 앞에 옴)
    const sortedNotices = [...newNotices].sort((a, b) => {
      const dateA = new Date(a.startsAt).getTime();
      const dateB = new Date(b.startsAt).getTime();
      return dateB - dateA; // 내림차순 정렬 (더 먼 미래의 날짜가 앞에 옴)
    });

    // 첫 페이지인 경우 교체, 아닌 경우 추가 (중복 필터링 제거)
    if (isFirstPage) {
      // 첫 페이지면 모든 데이터 교체
      setNotices(sortedNotices);

      // Set 초기화 및 새 ID 추가
      loadedNoticeIdsRef.current = new Set();
      sortedNotices.forEach((notice: ExtendedNotice) => {
        loadedNoticeIdsRef.current.add(notice.id);
      });
    } else {
      // 이어지는 페이지면 중복 ID만 필터링
      const loadedIds = loadedNoticeIdsRef.current;
      const uniqueNewNotices = sortedNotices.filter(
        (notice: ExtendedNotice) => !loadedIds.has(notice.id)
      );

      // 새 ID를 Set에 추가
      uniqueNewNotices.forEach((notice: ExtendedNotice) => {
        loadedIds.add(notice.id);
      });

      // 기존 목록에 추가하고 마감기한이 먼 순으로 다시 정렬
      setNotices((prevNotices) => {
        const combinedNotices = [...prevNotices, ...uniqueNewNotices];
        return combinedNotices.sort((a, b) => {
          const dateA = new Date(a.startsAt).getTime();
          const dateB = new Date(b.startsAt).getTime();
          return dateB - dateA; // 내림차순 정렬 (더 먼 미래의 날짜가 앞에 옴)
        });
      });
    }

    // hasMore 상태 설정
    setHasMore(!!data.hasNext);

    // 로딩 상태 종료 및 데이터 로딩 성공 표시
    setLoadingRetryCount(0);
    setInitialLoading(false);
    setDataLoaded(true);

    // 마지막으로 처리한 shopId 저장
    lastShopIdRef.current = shopId;
  };

  // 데이터 로드 효과 - 공통 로직을 processNoticeData로 분리하여 의존성 감소
  useEffect(() => {
    if (data) {
      console.log("[ShopNotices] 데이터 로드됨:", {
        count: data.items?.length,
        hasNext: data.hasNext,
        totalCount: data.count,
      });

      processNoticeData(data, page === 0);
    }
  }, [data, page, shopId]);

  // API Hook이 실패하면 직접 API 호출로 시도
  useEffect(() => {
    let isMounted = true;

    const loadNoticesDirectly = async () => {
      if ((!data || loadingRetryCount > 0) && !isLoading && !error && shopId) {
        console.log(
          "[ShopNotices] 직접 API 호출 시도, 재시도 횟수:",
          loadingRetryCount
        );
        const result = await fetchNotices(shopId, page);

        if (result && isMounted) {
          processNoticeData(result, page === 0);
        }
      }
    };

    loadNoticesDirectly();

    return () => {
      isMounted = false;
    };
  }, [data, isLoading, error, shopId, page, loadingRetryCount]);

  // 페이지 변경 시 초기화 (shopId 변경 시에만 실행)
  useEffect(() => {
    // shopId가 변경되었고, 이전에 처리한 shopId와 다른 경우에만 초기화
    if (shopId !== lastShopIdRef.current) {
      console.log("[ShopNotices] shopId 변경으로 인한 초기화:", {
        이전: lastShopIdRef.current,
        현재: shopId,
      });

      setPage(0);
      setError(null);
      setInitialLoading(true);
      setDataLoaded(false);

      // ref 초기화
      loadedNoticeIdsRef.current = new Set();
      totalNoticeCountRef.current = null;

      // 데이터 로딩을 위한 refetch 및 fallback 메커니즘 설정
      if (shopId) {
        refetch();

        // 직접 API 호출을 위한 재시도 카운트 설정 (fallback 메커니즘)
        const timer = setTimeout(() => {
          if (!dataLoaded) {
            console.log("[ShopNotices] 데이터 로드 재시도");
            setLoadingRetryCount((prev) => prev + 1);
          }
        }, 1500);

        // 최대 5초 후에는 로딩 상태 종료 (데이터가 없더라도)
        const maxLoadingTimer = setTimeout(() => {
          if (initialLoading) {
            console.log("[ShopNotices] 최대 로딩 시간 초과, 로딩 상태 종료");
            setInitialLoading(false);
          }
        }, 5000);

        return () => {
          clearTimeout(timer);
          clearTimeout(maxLoadingTimer);
        };
      }
    }
  }, [shopId, refetch, dataLoaded]);

  // 더 보기 - 무한 스크롤 구현
  useEffect(() => {
    // 서버 사이드 렌더링 시에는 실행하지 않음
    if (!isMounted) return;

    // 스크롤 이벤트의 디바운싱을 위한 타이머 참조
    let scrollTimer: NodeJS.Timeout | null = null;
    const scrollThreshold = 200; // 스크롤 임계값을 높여서 더 빠른 로딩 (기존 100)

    const handleScroll = () => {
      // 이미 타이머가 있으면 취소
      if (scrollTimer) {
        clearTimeout(scrollTimer);
      }

      // 새 타이머 설정 (디바운싱)
      scrollTimer = setTimeout(() => {
        // 현재 스크롤 위치
        const scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        // 문서 높이
        const documentHeight = document.documentElement.scrollHeight;
        // 창 높이
        const windowHeight = window.innerHeight;

        // 사용자가 문서 하단에 더 빨리 도달했다고 감지 (임계값 증가)
        if (windowHeight + scrollTop + scrollThreshold >= documentHeight) {
          if (hasMore && !isLoading) {
            console.log(
              "[ShopNotices] 스크롤 감지, 다음 페이지 로드 시도:",
              page + 1,
              {
                현재스크롤위치: scrollTop,
                문서전체높이: documentHeight,
                창높이: windowHeight,
                감지임계값: scrollThreshold,
                hasMore,
                isLoading,
                loadedCount: loadedNoticeIdsRef.current.size,
                totalCount: totalNoticeCountRef.current,
              }
            );
            setPage((prev) => prev + 1);
          } else {
            console.log(
              "[ShopNotices] 스크롤 감지되었지만 더 로드할 데이터 없음:",
              {
                hasMore,
                isLoading,
                page,
              }
            );
          }
        }
      }, 100); // 100ms 디바운싱
    };

    // 스크롤 이벤트 리스너 등록
    window.addEventListener("scroll", handleScroll);

    // 초기 로드 후 hasMore이 true이고 공고가 적으면 추가 데이터 자동 로드
    // 화면이 스크롤바 없이 짧을 경우를 대비
    const checkInitialScroll = setTimeout(() => {
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;

      if (
        documentHeight <= windowHeight &&
        hasMore &&
        !isLoading &&
        notices.length > 0 &&
        notices.length < 12
      ) {
        console.log(
          "[ShopNotices] 초기 화면이 짧아 자동으로 다음 페이지 로드:",
          {
            documentHeight,
            windowHeight,
            hasMore,
            noticesLength: notices.length,
          }
        );
        setPage((prev) => prev + 1);
      }
    }, 500);

    // 컴포넌트 언마운트 시 정리
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimer) {
        clearTimeout(scrollTimer);
      }
      clearTimeout(checkInitialScroll);
    };
  }, [hasMore, isLoading, page, notices.length, isMounted]); // isMounted 의존성 추가

  // 로딩 UI 컴포넌트
  const LoadingUI = () => (
    <div className="flex flex-col items-center justify-center py-6">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary mb-3"></div>
      <p className="text-gray-600 font-medium">
        공고 목록을 불러오는 중입니다...
      </p>
    </div>
  );

  // 서버 사이드 렌더링과 클라이언트 사이드 렌더링의 차이를 방지하기 위한 조건부 렌더링
  if (!isMounted) {
    // 서버 렌더링 또는 초기 클라이언트 렌더링에서는 간단한 로딩 UI만 표시
    return (
      <div className="min-h-[200px] flex items-center justify-center">
        로딩 중...
      </div>
    );
  }

  // 로딩 중이거나 초기 로딩 상태면 로딩 UI 표시
  if (isLoading || initialLoading) {
    return <LoadingUI />;
  }

  // 오류가 있는 경우
  if (error) {
    return (
      <div className="text-center py-6">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
          {error}
        </div>
        <button
          onClick={() => {
            setError(null);
            setPage(0);
            setInitialLoading(true);
            // ref 초기화
            loadedNoticeIdsRef.current = new Set();
            totalNoticeCountRef.current = null;
            setLoadingRetryCount((prev) => prev + 1);
          }}
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
        >
          다시 시도
        </button>
      </div>
    );
  }

  // 데이터가 성공적으로 로드되었으나 공고가 없는 경우
  const hasNotices = notices.length > 0;
  console.log("[ShopNotices] 렌더링 결과:", {
    hasNotices,
    count: notices.length,
    loadedIds: loadedNoticeIdsRef.current.size,
    totalCount: totalNoticeCountRef.current,
    shopId,
    initialLoading,
    dataLoaded,
    hasMore,
  });

  // 디버그 정보 컴포넌트 - 개발 시에만 사용
  const DebugInfo = () => (
    <div className="text-xs bg-blue-50 p-2 mb-4 rounded">
      <p>디버그 정보:</p>
      <p>shopId: {shopId}</p>
      <p>공고 개수: {notices.length}</p>
      <p>데이터 로드 상태: {dataLoaded ? "완료" : "미완료"}</p>
      <p>마지막 처리 shopId: {lastShopIdRef.current}</p>
      <button
        onClick={() => {
          setInitialLoading(true);
          setPage(0);
          refetch();
        }}
        className="bg-blue-500 text-white px-2 py-1 rounded mt-1"
      >
        데이터 다시 로드
      </button>
    </div>
  );

  return (
    <>
      {/* 디버그 정보 비활성화 */}
      {/* {process.env.NODE_ENV !== "production" && <DebugInfo />} */}

      {hasNotices ? (
        <>
          <h2 className="text-[24px] font-bold mb-6">내가 등록한 공고</h2>
          <NoticeList notices={notices} shopId={shopId} hasMore={hasMore} />
        </>
      ) : (
        <NoticeRegisterCard
          title="등록한 공고"
          description="공고를 등록해 보세요."
          buttonText="공고 등록하기"
          onClick={() =>
            router.push(`/shops/${shopId}/notices/register-notice`)
          }
        />
      )}
    </>
  );
}
