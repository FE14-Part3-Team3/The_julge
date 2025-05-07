"use client";

import Pagination from "@/components/Pagination/Pagination";
import { Section } from "@/components/Section/Section";
import Table from "@/components/Table/Table";
import ShopItem from "@/components/ShopItem/ShopItem";
import { Application } from "@/types/api/application";
import { useApplicationList } from "@/hooks/api/useApplications";
import { useState } from "react";
import { applicationColumns } from "@/components/Table/TableSchemas";
import { Shop, ExtendedNotice } from "@/types/ShopTypes"; // Shop과 ExtendedNotice 타입 가져오기

interface ApplicationTableProps {
    shopId: string;
    noticeId: string;
}

export default function ApplicationTable({
    shopId,
    noticeId,
}: ApplicationTableProps) {
    const [offset, setOffset] = useState(0);
    const limit = 5;

    // 지원자 목록 데이터 가져오기
    const { data } = useApplicationList(shopId, noticeId, {
        offset,
        limit,
    });

    if (!data) return null;

    // 지원자 목록 데이터 가공
    const applications: Application[] =
        data?.items.map((w) => ({
            id: w.item.id,
            status: w.item.status,
            createdAt: w.item.createdAt,
            user: w.item.user,
            shop: w.item.shop,
            notice: w.item.notice,
        })) ?? [];

    // shopData와 noticeData 추출 및 타입 변환
    const shopData: Shop | null = applications[0]?.shop?.item ?? null;
    const noticeData: ExtendedNotice | null =
        applications[0]?.notice?.item ?? null;

    const handlePageChange = ({ offset }: { offset: number }) => {
        setOffset(offset);
    };

    if (applications.length === 0) {
        return <div className="bg-gray-5">아직 신청 내역이 없어요.</div>;
    }

    return (
        <div>
            {/* 가게 상세 정보 */}
            {shopData && noticeData && (
                <Section
                    children={
                        <ShopItem
                            shopId={shopId}
                            noticeId={noticeId}
                            shopData={shopData} // Shop 타입 데이터 전달
                            noticeData={noticeData} // ExtendedNotice 타입 데이터 전달
                        />
                    }
                    subname="식당"
                    name={shopData.name} // 가게 이름 표시
                />
            )}

            {/* 신청자 목록 */}
            <Section
                children={
                    <div className="space-y-6">
                        <Table<Application>
                            data={applications} // 올바른 데이터 구조 전달
                            columns={applicationColumns}
                            pagination={
                                <Pagination
                                    totalItems={data.count}
                                    itemsPerPage={limit}
                                    currentOffset={offset}
                                    onPageChange={handlePageChange}
                                />
                            }
                        />
                    </div>
                }
                name="신청자 목록"
            />
        </div>
    );
}
