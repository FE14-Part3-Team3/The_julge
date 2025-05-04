"use client";

import React from "react";
import { NoticeItem } from "@/types/api/notice";
import { useApplicationList } from "@/hooks/api/useApplications";
import NoticeCardView from "./NoticeCardView";
import { useRouter } from "next/navigation";

export default function NoticeCard(list: NoticeItem ) {
  const router = useRouter();
  const shopId = list.shop.item.id;
  const noticeId = list.id;
  const query = { offset: 0, limit: 0 };

  const { data: applicationList } = useApplicationList(shopId, noticeId, query);

  return <NoticeCardView list={list} applicationList={applicationList} />;
}