"use client";

import RegisterCard from "@/components/Card/RegisterCard";
import Table from "@/components/Table/Table";
import { userApplicationColumns } from "@/components/Table/TableSchemas";
import { useUserApplicationList } from "@/hooks/api/useApplications";
import { UserApplication } from "@/types/api/application";
import { useParams } from "next/navigation";
import { useState } from "react";
import Pagination from "@/components/Pagination/Pagination";

export default function ApplicationTable() {
  const { id: userId } = useParams() as { id: string };
  const [offset, setOffset] = useState(0);
  const limit = 5;

  const { data } = useUserApplicationList(userId as string, {
    offset,
    limit,
  });

  if (!data) return null;

  const applications = data?.items.map((w) => w.item) ?? [];

  const handlePageChange = ({ offset }: { offset: number }) => {
    setOffset(offset);
  };

  if (applications.length === 0) {
    return (
      <div className="bg-gray-5">
        <RegisterCard
          title="신청 내역"
          description="아직 신청 내역이 없어요."
          buttonText="공고 보러가기"
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Table<UserApplication>
        data={applications}
        columns={userApplicationColumns}
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
  );
}
