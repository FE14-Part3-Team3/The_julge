/**
 * 지역(위치) 정보를 IconText 컴포넌트로 보여주는 컴포넌트
 * props: location
 */
import React from "react";
import IconText from "@/components/IconText/IconText";

interface ShopLocationProps {
  location: string;
}

export default function ShopLocation({ location }: ShopLocationProps) {
  return (
    <IconText
      iconSrc="/assets/images/map.svg"
      alt="위치"
      text={location}
      className="my-[10px] leading-[22px] md:leading-normal"
    />
  );
}
