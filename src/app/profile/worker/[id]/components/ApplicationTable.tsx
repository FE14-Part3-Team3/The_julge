"use client";

import RegisterCard from "@/components/Card/RegisterCard";
import Table from "@/components/Table/Table";
import { userApplicationColumns } from "@/components/Table/TableSchemas";
import { useUserApplicationList } from "@/hooks/api/useApplications";
import { UserApplication } from "@/types/api/application";
import { useParams } from "next/navigation";

export default function ApplicationTable() {
  const { id: userId } = useParams() as { id: string };

  const { data } = useUserApplicationList(userId, {
    offset: 0,
    limit: 5,
  });

  const applications = data?.items.map((w) => w.item) ?? [];

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
    <Table<UserApplication>
      data={applications}
      columns={userApplicationColumns}
    />
  );
}
