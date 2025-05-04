import React from "react";
import IconTextList from "../IconText/IconTextList";
import clsx from "clsx";
import {
    calculateEndDate,
    formatDate,
    formatTime,
    calculateHourlyPayDiff,
} from "./ShopItemSchemas";
import Router from "next/router";

interface ShopItemProps {
    shopId: string; // 가게 ID
    noticeId: string; // 공고 ID
    shopData: {
        id: string;
        name: string;
        category: string;
        address1: string;
        address2: string;
        description: string;
        imageUrl: string;
        originalHourlyPay: number;
    };
    noticeData: {
        id: string;
        hourlyPay: number;
        startsAt: string;
        description: string;
        workhour: number;
        closed: boolean;
    };
}

export default function ShopItem({
    shopId,
    noticeId,
    shopData,
    noticeData,
}: ShopItemProps) {
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
                    "p-4 border rounded-lg",
                    "flex flex-col",
                    "md:flex-row p-[24px]"
                )}
            >
                <img
                    src={shopData.imageUrl}
                    alt={shopData.name}
                    className={clsx(
                        "w-full h-48 object-cover rounded-md",
                        "md:w-2/3"
                    )}
                />
                <div>
                    <p className="mt-4 text-sm font-bold text-red-50">시급</p>
                    <div className="flex flex-row items-center space-x-2">
                        <p className="mt-2 text-lg font-bold text-black text-[28px]">
                            {noticeData.hourlyPay.toLocaleString()}원
                        </p>
                        {isPayDiff && (
                            <button className="rounded-full bg-red-50 text-white font-bold text-[14px] py-2 px-4 mt-4">
                                {payDiffText}
                            </button>
                        )}
                    </div>
                    <IconTextList items={iconTextItems} className="mt-4" />
                    <p className="mt-4 text-black">{shopData.description}</p>
                    <button
                        className="mt-6 w-full py-2 border border-red-50 text-red-50 font-bold rounded-md"
                        onClick={() =>
                            Router.push(
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
