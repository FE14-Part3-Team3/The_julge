import React from "react";
import { NoticeItem } from "@/types/api/notice";
import Image from "next/image";
import clock from "@/public/assets/images/clock.svg";
import map from "@/public/assets/images/map.svg";
import IconTextList from "../IconText/IconTextList";

type NoticeCardProps = {
  item: NoticeItem;
};
interface IconTextProps {
  icon:  string; // 또는 string 타입의 아이콘 이름일 수도 있음
  text: string;
}
export default function NoticeCard( 
  item : NoticeCardProps,   
) {

  const card = item.item;
  console.log(item);

  const iconTextItems = [
    {
      iconSrc: "/assets/images/clock.svg",
      text: "서울특별시 강남구 테헤란로 123",
    },
    {
      iconSrc: "/assets/images/map.svg",
      text: "02-1234-5678",
    },
  ];

  return (
    <>
      <div>
        <div className="relative w-full  aspect-video rounded-xl overflow-hidden border border-gray-200">
          {card.closed === true ? (
            <div className="absolute top-0 left-0 text-2xl font-bold text-gray-30 w-full h-full bg-[rgba(0,0,0,0.7)] flex justify-center items-center z-10">마감완료</div>
          ) : (
            null
          )} 
              <Image
                src={card.shop.item.imageUrl}
                alt={card.shop.item.name}
                fill
                className="object-cover"
              />
          </div>
          <strong>{card.shop.item.name}</strong>
          <IconTextList items={iconTextItems}/>
          <strong>{card.hourlyPay}</strong>
      </div>
    </>
  )
}
