"use client";

import React from "react";
import { useRouter } from "next/navigation";
import RegisterCard from "@/components/Card/RegisterCard";

interface NoticeEmptyCardProps {
  shopId: string;
}

export default function NoticeEmptyCard({ shopId }: NoticeEmptyCardProps) {
  const router = useRouter();

  return (
    <div className="max-w-[964px] mx-auto px-6 py-10">
      <RegisterCard
        title="등록한 공고"
        description="아직 등록된 공고가 없습니다."
        buttonText="공고 등록하기"
        onClick={() => router.push(`/shops/${shopId}/notices/new`)}
      />
    </div>
  );
}
