
import React from "react";
import { useRouter } from "next/navigation";
import { GetNoticeListResponse, ItemWrapper } from "@/types/api/notice";
import NoticeCard from "./NoticeCard";


type PaginatedNoticeListProps = {
  data: GetNoticeListResponse;
};

export default function PaginatedNoticeList( 
  { data } : PaginatedNoticeListProps,    //구조 분해 안하면  const notices = data.data?.items; 이렇게 됨?
) {
  
  const notices = data?.items;
  const router = useRouter();

  console.log(notices);
  return (
    // <></>
        <div>
          <ul className="grid grid-cols-3 gap-4 gap-y-8">
            {notices?.map((notice:ItemWrapper) => (
              <li
                key={notice.item.id}
                className="p-4 border rounded-xl shadow hover:shadow-md cursor-pointer transition"
                onClick={() => router.push(`/notices/${notice.item.id}`)}
              >
                <NoticeCard item={notice.item} />
              </li>
            ))}
          </ul>
        </div>
  )
}
