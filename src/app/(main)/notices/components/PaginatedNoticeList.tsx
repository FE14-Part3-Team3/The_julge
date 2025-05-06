"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ItemWrapper } from "@/types/api/notice";
import NoticeCard from "@/components/Notice/NoticeCard";
import clsx from "clsx";
import Pagination from "@/components/Pagination/Pagination";
import { GetShopNoticesQuery, SeoulDistrict, SortOption } from "@/types/common";
import { Section } from "@/components/Section/Section";
import {
  useNoticeService,
  useSetNoticeQuery,
} from "@/hooks/api/useParsedNoticeQuery";
import NoticeSelectInput from "@/components/Input/NoticeSelectInput";
import EmptyCard from "@/components/Card/EmptyCard";
import NoticeFilterPanel from "@/components/FilterPanel/FilterPanel";

export const defaultQuery: GetShopNoticesQuery = {
  offset: 0,
  limit: 6,
  sort: "time",
};

export default function PaginatedNoticeList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [inputQuery, setInputQuery] =
    useState<GetShopNoticesQuery>(defaultQuery);
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const setQueryToURL = useSetNoticeQuery();
  const {
    data: allNotices,
    query,
    isLoading: isLoadingNotices,
  } = useNoticeService(inputQuery, searchParams);

  useEffect(() => {
    setInputQuery((prev) => ({
      ...prev,
      address: selectedDistricts as SeoulDistrict[],
    }));
  }, [selectedDistricts]);

  if (!allNotices) return null;

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputQuery((prev) => ({ ...prev, [name]: value }));
  };

  const handleSortChange = (value: string) => {
    const next = { ...inputQuery, sort: value as SortOption, offset: 0 };
    setInputQuery(next);
    setQueryToURL(next);
  };

  const handleCheckboxChange = (district: string, checked: boolean) => {
    const updatedDistricts = checked
      ? [...selectedDistricts, district]
      : selectedDistricts.filter((d) => d !== district);
    setSelectedDistricts(updatedDistricts);
  };

  const applyFilters = () => {
    const nextQuery = {
      ...inputQuery,
      address: selectedDistricts,
      offset: 0,
    };
    setInputQuery({
      ...nextQuery,
      address: selectedDistricts as SeoulDistrict[],
    });
    setQueryToURL(nextQuery);
  };

  const resetFilters = () => {
    setSelectedDistricts([]);
    setInputQuery(defaultQuery);
    setQueryToURL({ ...defaultQuery });
  };

  const handlePageChange = (newQuery: GetShopNoticesQuery) => {
    const merged = { ...inputQuery, ...newQuery };
    setInputQuery(merged);
    setQueryToURL(merged);
  };

  const OPTIONS = [
    { label: "마감임박순", value: "time" },
    { label: "시급많은순", value: "pay" },
    { label: "시간적은순", value: "hour" },
    { label: "가다나순", value: "shop" },
  ];
  const selectedLabel =
    OPTIONS.find((opt) => opt.value === (inputQuery.sort ?? "time"))?.label ??
    "";

  return (
    <Section name="전체 공고" className="relative">
      {/* 정렬 기준 드롭 다운 */}
      <div
        className="
        flex gap-[10px] 
        xs:relative xs:top-[0px] 
        sm:absolute sm:top-[65px] sm:right-[25px]  
        md:top-[70px]
      "
      >
        <div className="mb-4">
          <NoticeSelectInput
            value={selectedLabel}
            onChange={handleSortChange}
            options={OPTIONS}
            className="w-[132px]"
          />
        </div>

        {/* 필터 패널 드롭 다운 */}
        <NoticeFilterPanel
          selectedDistricts={selectedDistricts}
          setSelectedDistricts={setSelectedDistricts}
          inputQuery={inputQuery}
          handleFilterChange={handleFilterChange}
          applyFilters={applyFilters}
          resetFilters={resetFilters}
        />
      </div>

      {isLoadingNotices && <div className="text-center py-10">로딩 중</div>}

      {/* 공고시작 */}
      {!isLoadingNotices && (
        <ul className="grid gap-4 gap-y-8 xs:grid-cols-2 md:grid-cols-3">
          {allNotices?.items?.map((notice: ItemWrapper) => (
            <li
              key={notice.item.id}
              onClick={() => router.push(`/notices/${notice.item.id}`)}
              className={clsx(
                "p-4 border rounded-xl shadow hover:shadow-md cursor-pointer transition bg-white",
                notice.item.closed && "pointer-events-none"
              )}
            >
              <NoticeCard {...notice.item} />
            </li>
          ))}
        </ul>
      )}
      {/* 공고 끝 */}
      {allNotices?.count === 0 && (
        <EmptyCard description="해당 공고가 없습니다." />
      )}
      <div className="mt-10">
        {/* <Pagination
          totalItems={allNotices?.count}
          itemsPerPage={Number(inputQuery.limit)}
          currentOffset={Number(inputQuery.offset)}
          onPageChange={handlePageChange}
        /> */}
      </div>
    </Section>
  );
}
