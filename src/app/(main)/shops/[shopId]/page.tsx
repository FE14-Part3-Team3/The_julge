/**
 * 고용주가 자신의 가게 정보와 등록한 공고를 확인하는 페이지
 */
"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import RegisterCard from "@/components/Card/RegisterCard";
import ShopNotices from "@/components/ShopNotices/ShopNotices";
import ShopInfoCard from "@/components/ShopCard/ShopInfoCard";
import { useGetShop } from "@/hooks/api/useShopService";
import { getMyShop, getShopById } from "@/lib/shopApi";

// 로컬 스토리지 키
const SHOP_ID_STORAGE_KEY = "my_shop_id";

export default function ShopDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.shopId as string;

  const [isLoading, setIsLoading] = useState(true);
  const [myShop, setMyShop] = useState<any>(null);
  const [shopIdForNotices, setShopIdForNotices] = useState<string | null>(null);
  const [shouldShowRegisterCard, setShouldShowRegisterCard] = useState(false);
  const [contentReady, setContentReady] = useState(false);

  // 페이지 로드 시 실행
  useEffect(() => {
    const loadShopData = async () => {
      try {
        console.log("[ShopDetailPage] 가게 정보 로딩 시작, ID:", id);
        setIsLoading(true);
        setContentReady(false);

        // 먼저 현재 사용자 ID 가져오기
        const userId = localStorage.getItem("id");
        const userType = localStorage.getItem("type");
        const token = localStorage.getItem("token");
        const savedShopId = localStorage.getItem(SHOP_ID_STORAGE_KEY);

        console.log("[ShopDetailPage] 사용자 정보:", {
          userId,
          userType,
          hasToken: !!token,
          savedShopId,
        });

        // 고용주가 아니면 가게를 가질 수 없음
        if (userType !== "employer") {
          console.log("[ShopDetailPage] 사용자 타입이 고용주가 아님");
          setShouldShowRegisterCard(true);
          return;
        }

        // 1. 먼저 URL의 ID가 실제 가게 ID인지 확인
        console.log("[ShopDetailPage] 가게 ID 확인 시도:", id);
        let shopData = null;

        // URL에 ID가 있는 경우, 해당 ID로 가게 조회
        if (id && id !== "undefined") {
          shopData = await getShopById(id);
          console.log("[ShopDetailPage] URL ID로 가게 조회 결과:", !!shopData);
        }

        // URL의 ID로 가게를 찾았고, 현재 로그인한 사용자의 가게인 경우
        if (shopData && shopData.userId === userId) {
          console.log("[ShopDetailPage] 가게 정보 조회 성공:", shopData.id);

          // 가게 ID 로컬 스토리지에 저장 (GNB 네비게이션용)
          localStorage.setItem(SHOP_ID_STORAGE_KEY, shopData.id);

          setMyShop(shopData);
          setShopIdForNotices(shopData.id);

          // 약간의 지연 후 콘텐츠 준비 상태 설정 (로딩 UI 플래시 방지)
          setTimeout(() => setContentReady(true), 300);
          return;
        }

        // 2. URL ID가 없거나 현재 사용자의 가게가 아닌 경우, 저장된 가게 ID 확인
        if (savedShopId && savedShopId !== id) {
          console.log("[ShopDetailPage] 저장된 가게 ID 사용:", savedShopId);
          // 저장된 가게 ID로 리디렉션
          router.replace(`/shops/${savedShopId}`);
          return;
        }

        // 3. 저장된 ID도 없는 경우, 사용자 정보로 가게 조회
        if (userId) {
          console.log("[ShopDetailPage] 사용자 ID로 가게 조회 시도:", userId);
          const userShop = await getMyShop(userId);

          if (userShop && userShop.id) {
            console.log("[ShopDetailPage] 사용자의 가게 찾음:", userShop.id);

            // 사용자의 가게가 존재하면 URL 업데이트 후 데이터 설정
            router.replace(`/shops/${userShop.id}`);

            // 가게 ID 로컬 스토리지에 저장
            localStorage.setItem(SHOP_ID_STORAGE_KEY, userShop.id);

            setMyShop(userShop);
            setShopIdForNotices(userShop.id);

            // 약간의 지연 후 콘텐츠 준비 상태 설정
            setTimeout(() => setContentReady(true), 300);
            return;
          } else {
            console.log("[ShopDetailPage] 사용자의 가게 없음");
            localStorage.removeItem(SHOP_ID_STORAGE_KEY);
          }
        }

        // 어떤 방법으로도 가게를 찾지 못한 경우
        console.log("[ShopDetailPage] 가게를 찾지 못함, 등록 카드 표시");
        localStorage.removeItem(SHOP_ID_STORAGE_KEY);
        setShouldShowRegisterCard(true);
      } catch (error) {
        console.error("[ShopDetailPage] 가게 정보 로딩 오류:", error);
        setShouldShowRegisterCard(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadShopData();
  }, [id, router]);

  // 개선된 로딩 UI
  const LoadingUI = () => (
    <div className="max-w-[964px] mx-auto px-6 py-10">
      <div className="flex flex-col items-center justify-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
        <p className="text-gray-600 font-medium text-lg">
          가게 정보를 불러오는 중입니다...
        </p>
      </div>
    </div>
  );

  // 로딩 중 표시 (향상된 UI)
  if (isLoading) {
    return <LoadingUI />;
  }

  // 가게 등록 안내 카드 표시
  if (shouldShowRegisterCard) {
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

  // 콘텐츠가 준비되지 않은 경우에도 로딩 UI 표시
  if (!contentReady) {
    return <LoadingUI />;
  }

  console.log("[ShopDetailPage] 렌더링 데이터:", {
    myShop,
    shopIdForNotices,
    shopId: myShop?.id,
    contentReady,
  });

  // 가게 정보 및 공고 목록 표시
  return (
    <div className="max-w-[964px] mx-auto px-6 py-10">
      <h1 className="text-[28px] font-bold mb-6">내 가게</h1>
      <section className="mb-10">
        <ShopInfoCard shop={myShop} />
      </section>

      {/* 내가 등록한 공고 섹션 - 전체 너비 배경색 적용 */}
      <section className="relative -mx-6 -mb-10">
        {/* 배경색 확장을 위한 가상 요소 스타일 */}
        <style jsx>{`
          section::before {
            content: "";
            position: absolute;
            left: -50vw;
            right: -50vw;
            top: 0;
            bottom: 0;
            background-color: #fafafa;
            z-index: -1;
          }
        `}</style>

        <div className="px-6 py-10">
          <h2 className="text-[24px] font-bold mb-6">내가 등록한 공고</h2>
          {shopIdForNotices && <ShopNotices shopId={shopIdForNotices} />}
        </div>
      </section>
    </div>
  );
}
