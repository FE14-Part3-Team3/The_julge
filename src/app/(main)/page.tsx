"use client";

import React, { Suspense } from "react";
import { useParams } from "next/navigation";
import PaginatedNoticeList from "./notices/components/PaginatedNoticeList";
import RecommendedNotices from "./notices/components/RecommendedNotices";

// 공통 클래스를 변수로 정의

export default function ShopDetailPage() {
    const params = useParams();

    return (
        <>
            {/* 맞춤공고 */}
            <div className="bg-red-10">
                <RecommendedNotices />
            </div>
            {/* 전체공고 */}
            <Suspense fallback={<div className="bg-gray-5">Loading...</div>}>
                <PaginatedNoticeList />
            </Suspense>
        </>
    );
}
