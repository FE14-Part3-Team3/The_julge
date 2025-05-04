"use client"; // 클라이언트 컴포넌트로 선언

import React from "react";
import IconTextList from "../IconText/IconTextList";
import clsx from "clsx";
import {
    ShopItemProps,
    calculateEndDate,
    formatDate,
    formatTime,
    calculateHourlyPayDiff,
} from "./ShopItemSchemas";
import { useRouter } from "next/navigation";

export default function ShopItem({
    shopId,
    noticeId,
    shopData,
    noticeData,
}: ShopItemProps) {
    const router = useRouter();

    const startDate = new Date(noticeData.startsAt);
    const endDate = calculateEndDate(noticeData.startsAt, noticeData.workhour);

    const startDateString = formatDate(startDate);
    const endDateString = formatTime(endDate);

    const iconTextItems = [
        {
            iconSrc: "/assets/images/clock.svg",
            text: `${startDateString} ~ ${endDateString} (${noticeData.workhour}시간)`,
        },
        {
            iconSrc: "/assets/images/map.svg",
            text: `${shopData.address1} ${shopData.address2}`,
        },
    ];

    const { isPayDiff, isPayHigher, payDiffText } = calculateHourlyPayDiff(
        noticeData.hourlyPay,
        shopData.originalHourlyPay
    );

    return (
        <div>
            <div
                className={clsx(
                    "p-4 border rounded-lg overflow-hidden",
                    "flex flex-col",
                    "md:flex-row p-[24px]"
                )}
            >
                <img
                    src={shopData.imageUrl}
                    alt={shopData.name}
                    className={clsx(
                        "w-full h-[200px] item-center object-cover rounded-lg",
                        "sm:h-[350px]",
                        "md:w-4/5 md:mx-4 rounded-lg"
                    )}
                />
                <div>
                    <p className="mt-4 text-sm font-bold text-red-50">시급</p>
                    <div className="mt-2 flex flex-row items-center space-x-2">
                        <p className="text-lg font-bold text-black text-[24px] sm:text-[28px]">
                            {noticeData.hourlyPay.toLocaleString()}원
                        </p>
                        {isPayDiff && (
                            <button className="rounded-full bg-red-50 text-white font-bold text-[12px] sm:text-[14px] py-2 px-4">
                                {payDiffText}
                            </button>
                        )}
                    </div>
                    <IconTextList items={iconTextItems} className="mt-4" />
                    <p className="mt-4 text-black">{shopData.description}</p>
                    <button
                        className="mt-6 w-full py-2 border border-red-50 text-red-50 font-bold rounded-md"
                        onClick={() =>
                            router.push(
                                `shops/${shopId}/notices/${noticeId}/edit`
                            )
                        }
                    >
                        공고 편집하기
                    </button>
                </div>
            </div>
            <div className="flex flex-col mt-6 bg-gray-10 text-black rounded-lg p-[32px] gap-4">
                <p className="font-bold text-black">공고 설명</p>
                <p className="text-black">{noticeData.description}</p>
            </div>
        </div>
    );
}
