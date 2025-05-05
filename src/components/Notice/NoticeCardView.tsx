"use client";
import React from "react";
import clsx from "clsx";
import IconTextList from "../IconText/IconTextList";
import PayBadge from "./PayBadge";
import { NoticeItem } from "@/types/api/notice";
import { FallbackImage } from "../FallbackImage/FallbackImage";
import { useRouter } from "next/navigation";

interface Props {
  list: NoticeItem;
  applicationList?: { count: number };
}

export default function NoticeCardView({ list, applicationList }: Props) {

  const router = useRouter();
  const payResult = getPayIncreaseRate( list.hourlyPay, list.shop.item.originalHourlyPay );

  const isClosedCondition =
  new Date(list.startsAt) < new Date() && !list.closed ;

  // 아이콘텍스트 영역 이미지, 텍스트 배열
  const iconTextItems = [
    {
      iconSrc: (list.closed || isClosedCondition) ? "/assets/images/clock_gray.svg" : "/assets/images/clock.svg",
      text: formatWorkTime(list.startsAt, list.workhour),
      className: (list.closed || isClosedCondition) ? "!text-gray-30 !text-[14px]" : "!text-[14px]",
    },{
      iconSrc: (list.closed || isClosedCondition) ? "/assets/images/map_gray.svg" : "/assets/images/map.svg",
      text: list.shop.item.address1,
      className: (list.closed || isClosedCondition) ? "!text-gray-30 !text-[14px]" : "!text-[14px]",
    }
  ];
  const textClass = (base: string) => clsx(base, (list.closed || isClosedCondition)  && "text-gray-30" );
  
  return (
    <div>
      {/* 카드 이미지 영역 */}
      <div className="relative w-full aspect-video rounded-xl overflow-hidden  border border-gray-200">
        {list.closed && (
          <div className="absolute top-0 left-0 text-2xl font-bold text-gray-30 w-full h-full bg-[rgba(0,0,0,0.7)] flex justify-center items-center z-[2]">
            마감 완료
          </div>
        )}        
        {isClosedCondition && (
          <div className="absolute top-0 left-0 text-2xl font-bold text-gray-30 w-full h-full bg-[rgba(0,0,0,0.7)] flex justify-center items-center z-[2]">
            지난 공고
          </div>
        )}
        <FallbackImage
          src={list.shop.item.imageUrl}
          alt={list.shop.item.name}
          className="object-cover rounded-xl"
         />
      </div>
      {/* info 영역 */}
      <div className="relative mt-5 flex flex-col gap-2 px-1">
        <strong className={textClass("text-black font-bold text-xl max-h-7 truncate")}>{list.shop.item.name}</strong>
        <IconTextList items={iconTextItems} className="!gap-1" />
        <strong className={textClass("text-black font-bold mt-1 flex content-center")}>
          <span className={list.hourlyPay > 99999 ? "text-[24px]" : "text-[26px]"}>{list.hourlyPay.toLocaleString()}원</span>
        </strong>
        <PayBadge payResult={payResult} closed={(list.closed || isClosedCondition)} className={list.hourlyPay > 99999 && "scale-90 bottom-0"}  />
      </div>
    </div>
  );
}

// 알바시간 계산 문자열로 리턴
const formatWorkTime = (startsAt: string, workhour: number) => {
  const start = new Date(startsAt.replace(" ", "T"));
  const end = new Date(start);
  end.setHours(start.getHours() + workhour);

  const pad = (n: number) => String(n).padStart(2, "0");

  const date = `${start.getFullYear()}-${pad(start.getMonth() + 1)}-${pad(start.getDate())}`;
  const startTime = `${pad(start.getHours())}:00`;
  const endTime = `${pad(end.getHours())}:00`;

  return `${date} ${startTime}~${endTime} (${workhour}시간)`;
};

// (해당가게의 해당공고 시급 - 해당가게 원래시급) / * 100 퍼센트 구하고 없으면 false 리턴
const getPayIncreaseRate = (hourly: number, original: number): number | false => {
  if (hourly <= original) return false;
  return Math.floor(((hourly - original) / original) * 100);
};