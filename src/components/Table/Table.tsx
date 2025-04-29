import { useState } from "react";
import Pagination from "../Pagination/Pagination";

type Status = "normal" | "completed" | "waiting" | "canceled";

export interface Reservation {
    id: number; // 예약 ID
    place: string; // 가게 이름
    date: string; // 예약 날짜 및 시간
    price: string; // 가격
    status: Status; // 예약 상태
}

interface ReservationProps {
    reservations: Reservation[];
}

const Table: React.FC<ReservationProps> = ({ reservations }) => {
    // 상태에 따른 버튼 렌더링
    const renderStatusButton = (status: Status) => {
        if (status === "normal") {
            return (
                <div className="flex space-x-2">
                    <button className="px-4 py-2 text-red-50 font-bold border border-red-50 rounded-md">
                        거절하기
                    </button>
                    <button className="px-4 py-2 text-blue-20 font-bold border border-blue-20 rounded-md">
                        승인하기
                    </button>
                </div>
            );
        } else if (status === "completed") {
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
        } else if (status === "canceled") {
            return (
                <div className="px-4 py-2 text-red-50 bg-red-10 rounded-full font-bold text-center inline-block">
                    거절
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full border border-gray-20 bg-white rounded-lg overflow-hidden">
            <table className="w-full border-collapse">
                {/* 테이블 헤더 */}
                <thead>
                    <tr className="bg-red-10 text-black">
                        <th className="w-1/4 p-4 text-left font-medium">
                            가게
                        </th>
                        <th className="w-1/3 p-4 text-left font-medium">
                            일자
                        </th>
                        <th className="w-1/6 p-4 text-left font-medium">
                            시급
                        </th>
                        <th className="w-1/4 p-4 text-left font-medium">
                            상태
                        </th>
                    </tr>
                </thead>
                {/* 테이블 내용 */}
                <tbody className="bg-white">
                    {reservations.map((reservation) => (
                        <tr key={reservation.id} className="border-b">
                            <td className="w-1/4 p-4">{reservation.place}</td>
                            <td className="w-1/3 p-4">{reservation.date}</td>
                            <td className="w-1/6 p-4">{reservation.price}</td>
                            <td className="w-1/4 p-4">
                                {renderStatusButton(reservation.status)}
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot className="bg-white">
                    <tr>
                        <td colSpan={4} className="py-2">
                            <Pagination
                                totalItems={reservations.length}
                                itemsPerPage={5}
                                currentPage={1}
                                onPageChange={(page) => console.log(page)}
                            />
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default Table;
