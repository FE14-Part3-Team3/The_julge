/**
 * 가게 정보를 보여주는 카드 컴포넌트
 * props: shop
 */
import React from "react";
import ShopImage from "./ShopImage";
import ShopCategory from "./ShopCategory";
import ShopName from "./ShopName";
import ShopDescription from "./ShopDescription";
import ShopLocation from "./ShopLocation";
import ShopAction from "./ShopAction";
import { Shop } from "@/types/ShopTypes";

interface ShopInfoCardProps {
  shop: Shop;
}

export default function ShopInfoCard({ shop }: ShopInfoCardProps) {
  return (
    <div className="bg-[#FFEBE7] rounded-lg p-6 w-[351px] h-[449.71px] md:w-[680px] md:h-[677px] lg:w-[964px] lg:h-[356px] mx-auto">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex justify-center">
          <ShopImage imageUrl={shop.imageUrl} alt={shop.name} />
        </div>
        <div className="flex-1 flex flex-col">
          <ShopCategory category={shop.category} />
          <ShopName name={shop.name} />
          <ShopLocation location={shop.location} />
          <ShopDescription description={shop.description} />
          <div className="mt-auto mb-[20px] md:mb-[24px] lg:mb-0">
            <ShopAction shopId={shop.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
