import React, { Suspense } from "react";
import PaginatedNoticeList from "./notices/components/PaginatedNoticeList";
import RecommendedNotices from "./notices/components/RecommendedNotices";

export default async function ShopDetailPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    let hasActiveSearch = false;
    const { keyword } = await searchParams;
    // searchParams와 searchParams.keyword의 존재를 명확히 확인
    if (searchParams && typeof keyword === "string" && keyword.trim() !== "") {
        hasActiveSearch = true;
    }

    // ... (나머지 컴포넌트 코드)
    return (
        <>
            {!hasActiveSearch && (
                <div className="bg-red-10">
                    <RecommendedNotices />
                </div>
            )}
            <Suspense
                fallback={<div className="bg-gray-5">Loading notices...</div>}
            >
                <PaginatedNoticeList />
            </Suspense>
        </>
    );
}
