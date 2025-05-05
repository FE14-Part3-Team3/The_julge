"use client";

import Pagination from "@/components/Pagination/Pagination";
import { Section } from "@/components/Section/Section";
import Table from "@/components/Table/Table";
import { ApplicationItemWrapper } from "@/types/api/application";
import { useApplicationList } from "@/hooks/api/useApplications";
import { useParams } from "next/navigation";
import { useState } from "react";
import { ApplicationRequest } from "@/types/common";
import { applicationColumns } from "@/components/Table/TableSchemas";

export default function ApplicationsPage() {
    const { shopId, noticeId } = useParams() as {
        shopId: string;
        noticeId: string;
    };
    const [offset, setOffset] = useState(0);
    const limit = 5;

    const { data } = useApplicationList(shopId, noticeId, {
        offset,
        limit,
    });
    const applications = data?.items.map((w) => w.item) ?? [];
    const handlePageChange = ({ offset }: { offset: number }) => {
        setOffset(offset);
    };
    if (!data) return null;
    if (applications.length === 0) {
        return <div className="bg-gray-5">아직 신청 내역이 없어요.</div>;
    }

    return (
        <Section
            children={
                <div className="space-y-6">
                    <Table<ApplicationItemWrapper>
                        data={data.items.map((w) => w.item)}
                        columns={applicationColumns}
                    />
                    <Pagination
                        totalItems={data.count}
                        itemsPerPage={limit}
                        currentOffset={offset}
                        onPageChange={handlePageChange}
                    />
                </div>
            }
            name="신청자 목록"
        />
    );
}
