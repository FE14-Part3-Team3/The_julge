import React from "react";
import { Application } from "./Table";

interface StatusButtonProps {
    status: Application["status"];
    applicationId: number;
    onReject: (id: number) => void;
    onAccept: (id: number) => void;
}

// 신청 상태에 따라 다른 버튼/표시기를 렌더링하는 컴포넌트
const StatusButton: React.FC<StatusButtonProps> = ({
    status,
    applicationId,
    onReject,
    onAccept,
}) => {
    if (status === "normal") {
        return (
            <div className="flex space-x-2">
                <button
                    onClick={() => onReject(applicationId)}
                    className="px-4 py-2 text-red-50 font-bold border border-red-50 rounded-md"
                >
                    거절하기
                </button>
                <button
                    onClick={() => onAccept(applicationId)}
                    className="px-4 py-2 text-blue-20 font-bold border border-blue-20 rounded-md"
                >
                    승인하기
                </button>
            </div>
        );
    } else if (status === "approved") {
        return (
            <div className="px-4 py-2 text-blue-20 bg-blue-10 rounded-full font-bold text-center inline-block">
                승인 완료
            </div>
        );
    } else if (status === "waiting") {
        return (
            <div className="px-4 py-2 text-green-20 bg-green-10 rounded-full font-bold text-center inline-block">
                대기중
            </div>
        );
    } else if (status === "rejected") {
        return (
            <div className="px-4 py-2 text-red-50 bg-red-10 rounded-full font-bold text-center inline-block">
                거절
            </div>
        );
    }
    return null;
};

export default StatusButton;
