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
import { useParams } from "next/navigation";
import RegisterCard from "@/components/Card/RegisterCard";

export default function NoticeListPage() {
  const [offset, setOffset] = useState(0);
  const limit = 5;
  const params = useParams();
  const shopId = params?.shopId as string;
  const noticeId = params?.noticeId as string;

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

  return (
    <div>
      {shopData && noticeData && (
        <Section subname="식당" name={shopData.name}>
          <ShopItem
            shopId={shopId}
            noticeId={noticeId}
            shopData={shopData}
            noticeData={noticeData}
          />
        </Section>
      )}

      {applications.length === 0 ? (
        <RegisterCard
          title="신청 내역"
          description="아직 신청자가 없어요."
          buttonText="내 가게 보러가기"
        />
      ) : (
        <Section name="신청자 목록">
          <div className="space-y-6">
            <Table<Application>
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
        </Section>
      )}
    </div>
  );
}
