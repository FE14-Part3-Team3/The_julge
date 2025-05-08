"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ItemWrapper } from "@/types/api/notice";
import NoticeCard from "@/components/Notice/NoticeCard";
import clsx from "clsx";
import { GetShopNoticesQuery } from "@/types/common";
import { Section } from "@/components/Section/Section";
import EmptyCard from "@/components/Card/EmptyCard";
import { useNoticeList } from "@/hooks/api/useNoticeService";

const defaultQuery: GetShopNoticesQuery = {
  offset: 0,
  limit: 3,
  sort: "time",
  startsAtGte: getTimeNow(),
};

export default function RecommendedNotices() {
  const router = useRouter();
  const { data: recommendNotices, isLoading: isLoadingNotices } =
    useNoticeList(defaultQuery);

  if (!recommendNotices) return null;

  return (
    <Section name="맞춤 공고" className="relative">
      {isLoadingNotices && <div className="text-center py-10">로딩 중</div>}
      {/* 공고시작 */}
      <div className="w-full overflow-x-auto">
        {!isLoadingNotices && (
          <ul className="grid grid-cols-3 gap-4 gap-y-8 xs:w-[215%] sm:w-[145%] md:w-full">
            {recommendNotices?.items?.map((notice: ItemWrapper) => (
              <li
                key={notice.item.id}
                onClick={() =>
                  router.push(
                    `/shops/${notice.item.shop.item.id}/notices/${notice.item.id}/applications`
                  )
                }
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
      </div>

      {/* 공고 끝 */}
      {recommendNotices?.count === 0 && (
        <EmptyCard description="해당 공고가 없습니다." />
      )}
    </Section>
  );
}
function getTimeNow(): string {
  const now = new Date();
  const future = new Date(now.getTime() + 5 * 60 * 1000); // 5분 뒤

  const year = future.getFullYear();
  const month = String(future.getMonth() + 1).padStart(2, "0");
  const date = String(future.getDate()).padStart(2, "0");
  const hours = String(future.getHours()).padStart(2, "0");
  const minutes = String(future.getMinutes()).padStart(2, "0");
  const seconds = String(future.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${date}T${hours}:${minutes}:${seconds}+09:00`;
}
