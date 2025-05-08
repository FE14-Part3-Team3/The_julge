"use client";

import Pagination from "@/components/Pagination/Pagination";
import { Section } from "@/components/Section/Section";
import Table from "@/components/Table/Table";
import { ApplicationItemWrapper } from "@/types/api/application";
import { useApplicationList } from "@/hooks/api/useApplications";
import { useState } from "react";
import { applicationColumns } from "@/components/Table/TableSchemas";

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

    const applications = data?.items.map((w) => w.item) ?? [];

    const handlePageChange = ({ offset }: { offset: number }) => {
        setOffset(offset);
    };

    if (applications.length === 0) {
        return <div className="bg-gray-5">아직 신청 내역이 없어요.</div>;
    }

    return (
        <Section
            children={
                <div className="space-y-6">
                    <Table<ApplicationItemWrapper>
                        data={applications}
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
    );
}
