import React, { useEffect, useState } from "react";
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
import {
    usePostApplication,
    useUserApplicationList,
} from "@/hooks/api/useApplications";
import requestor from "@/lib/axios"; // 서버 요청을 위한 axios 인스턴스

export default function ShopItem({
    shopId,
    noticeId,
    shopData,
    noticeData,
}: ShopItemProps) {
    const router = useRouter();
    const type = localStorage.getItem("type");
    const apply = usePostApplication();

    const [isApply, setIsApply] = useState(false); // 지원 여부 상태
    const userId = localStorage.getItem("id"); // 로컬 스토리지에서 사용자 ID 가져오기
    const query = { offset: 0, limit: 10 }; // 필요한 쿼리 파라미터 설정

    // 페이지 로드 시 지원 여부 확인
    // const checkApplicationStatus = useUserApplicationList(userId, query);
    // useEffect(() => {
    //     if (checkApplicationStatus.data?.items) {
    //         const appliedItem = checkApplicationStatus.data.items.find(
    //             (item) => item.notice.item.id === noticeId
    //         );

    //         if (appliedItem) {
    //             setIsApply(true);
    //         }
    //     }
    // }, [checkApplicationStatus.data, noticeId]);

    const handleApply = () => {
        apply.mutate(
            { noticeId, shopId },
            {
                onSuccess: () => {
                    setIsApply(true); // 지원 성공 시 상태 업데이트
                    alert("공고 지원이 완료되었습니다!");
                },
                onError: (error) => {
                    console.error("지원 실패:", error);
                    alert("공고 지원에 실패했습니다. 다시 시도해주세요.");
                },
            }
        );
    };

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
            text: `${shopData.address1}`,
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
                    "flex flex-col md:flex-row md:gap-x-6",
                    "md:flex-row p-[24px]"
                )}
            >
                <img
                    src={shopData.imageUrl}
                    alt={shopData.name}
                    className={clsx(
                        "w-full max-w-[550px] h-[200px] object-cover rounded-lg mx-auto", // 모바일 기준
                        "sm:h-[300px]",
                        "md:h-[330px]"
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
                    {type === "employer" ? (
                        <button
                            className="mt-6 w-full py-2 border border-red-50 text-red-50 font-bold rounded-md"
                            onClick={() =>
                                router.push(
                                    `/shops/${shopId}/notices/${noticeId}/edit`
                                )
                            }
                        >
                            공고 편집하기
                        </button>
                    ) : type === "employee" ? (
                        isApply ? (
                            <button
                                className="mt-6 w-full py-2 bg-gray-300 text-white font-bold rounded-md cursor-not-allowed"
                                disabled
                            >
                                지원 완료
                            </button>
                        ) : (
                            <button
                                className="mt-6 w-full py-2 bg-50 text-white font-bold rounded-md"
                                onClick={handleApply}
                            >
                                공고 지원하기
                            </button>
                        )
                    ) : null}
                </div>
            </div>
            <div className="flex flex-col mt-6 bg-gray-10 text-black rounded-lg p-[32px] gap-4">
                <p className="font-bold text-black">공고 설명</p>
                <p className="text-black">{noticeData.description}</p>
            </div>
        </div>
    );
}
