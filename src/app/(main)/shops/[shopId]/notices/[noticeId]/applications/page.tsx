"use client";

import { Section } from "@/components/Section/Section";
import ShopItem from "@/components/ShopItem/ShopItem";

export default function ApplicationsPage() {
    // 더미 데이터 생성
    const dummyShopData = {
        id: "1",
        name: "도토리 식당",
        category: "한식",
        address1: "서울시 송파구",
        address2: "잠실동",
        description:
            "알바하기 편한 너구리네 라면집! 라면 올려두고 끓이기만 하면 되어서 쉬운 편에 속하는 가게입니다. ",
        imageUrl:
            "https://images.unsplash.com/photo-1526318896980-cf78c088247c?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        originalHourlyPay: 12000,
    };

    const dummyNoticeData = {
        id: "101",
        hourlyPay: 15000,
        startsAt: "2025-05-05 12:00",
        description: "라면 조리 및 서빙 업무",
        workhour: 3,
        closed: false,
    };

    return (
        <div>
            <Section
                children={
                    <ShopItem
                        shopId={dummyShopData.id}
                        noticeId={dummyNoticeData.id}
                        shopData={dummyShopData} // 더미 가게 데이터 전달
                        noticeData={dummyNoticeData} // 더미 공고 데이터 전달
                    />
                }
                subname="식당"
                name={dummyShopData.name} // 가게 이름 표시
            />
        </div>
    );
}
