"use client";

/**
 * 가게의 공고 목록을 표시하는 컴포넌트, 무한 스크롤 기능 지원
 */
import React from "react";
import { useRouter } from "next/navigation";
import { ExtendedNotice } from "@/types/ShopTypes";

interface NoticeListProps {
  notices: ExtendedNotice[];
  shopId: string;
  hasMore: boolean;
}

export default function NoticeList({
  notices,
  shopId,
  hasMore,
}: NoticeListProps) {
  const router = useRouter();

  // 커스텀 버튼 스타일 - ShopInfo 컴포넌트와 일관성 유지
  const customButtonStyle =
    "w-[151.5px] h-[38px] text-sm/[16px] md:w-[312px] md:h-[48px] md:text-base/[20px] lg:w-[169px] lg:h-[48px] font-bold";

  return (
    <div className="bg-white border border-gray-200 rounded-xl">
      {/* 공고가 없는 경우 표시할 내용 */}
      {notices.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">공고를 등록해 보세요.</p>
          <button
            className={`${customButtonStyle} bg-red-50 text-white rounded-md text-center`}
            onClick={() => router.push(`/shops/${shopId}/notices/new`)}
          >
            공고 등록하기
          </button>
        </div>
      ) : (
        <div className="p-6">
          {/* 공고 카드 그리드 - 반응형으로 열 수 조정 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {notices.map((notice) => (
              <div
                key={notice.id}
                className="p-4 border rounded-lg shadow hover:shadow-md cursor-pointer transition"
                onClick={() => router.push(`/notices/${notice.id}`)}
              >
                {/* 공고 제목 */}
                <h3 className="text-lg font-semibold line-clamp-1">
                  {notice.description}
                </h3>
                {/* 급여 및 근무시간 정보 */}
                <div className="text-sm text-gray-600 mt-2">
                  시급 {notice.hourlyPay.toLocaleString()}원
                  {notice.workhour && <> / 근무시간 {notice.workhour}시간</>}
                </div>
                {/* 시작일 표시 */}
                <div className="text-xs text-gray-400 mt-4">
                  {new Date(notice.startsAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>

          {/* 무한 스크롤 로딩 표시 */}
          {hasMore && (
            <div className="text-center py-4 mt-4">
              <p className="text-gray-500">공고 더 불러오는 중...</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
