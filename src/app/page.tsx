"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PaginatedNoticeList from "@/components/Notice/PaginatedNoticeList";
import RegisterCard from "@/components/Card/RegisterCard";
import { Section } from "@/components/Section/Section";
import { useNoticeList } from "@/hooks/api/useNoticeService";


// 공통 클래스를 변수로 정의

export default function ShopDetailPage() {
  const params = useParams();
  const [query, setQuery] = useState({ offset: 0, limit: 60 });

  const { data: allNotices, isLoading: isLoadingNotices} = useNoticeList(query);

  if (isLoadingNotices) {
    return <div className="text-center py-10">로딩 중...</div>;
  }

  // console.log(allNotices );
  // console.log(            
  //   `notices: ${allNotices} 
  //   count=${allNotices?.count}
  //   limit=${allNotices?.limit}
  //   offset=${allNotices?.offset}`
  // );
  if (!allNotices) {
    return (
      <RegisterCard
        title="전체 공고"
        description="내 가게를 소개하고 공고도 등록해 보세요."
        buttonText="가게 등록하기"
      />
    );
  }

  return (
    <div className="max-w-[964px] mx-auto">
      {/* 내가 등록한 공고 섹션 */}
      <Section name="전체 공고">
          <PaginatedNoticeList   
            data={allNotices}
          />           
      </Section>
    </div>
  );
}
