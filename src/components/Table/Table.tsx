import { useState } from "react";
import Pagination from "../Pagination/Pagination";
import ApplyModal from "../Modal/ApplyModal";
import StatusButton from "./StatusButton";
import { useApplyModal } from "../Modal/useApplyModal";

export type Status = "normal" | "approved" | "waiting" | "rejected";

export interface Application {
    id: number; // 예약 ID
    place: string; // 가게 이름
    date: string; // 예약 날짜 및 시간
    price: string; // 가격
    status: Status; // 예약 상태
}

interface ApplicationProps {
    application: Application[];
}

const Table: React.FC<ApplicationProps> = ({
    application: initialApplications,
}) => {
    const [applications, setApplications] =
        useState<Application[]>(initialApplications);

    // 모달에서 확인 시 상태 변경 처리
    const handleStatusChange = (id: number, newStatus: Status) => {
        setApplications((prevApplications) =>
            prevApplications.map((application) => {
                if (application.id === id) {
                    return { ...application, status: newStatus };
                }
                return application;
            })
        );
    };

    // 모달 상태와 로직을 관리하는 커스텀 훅 사용
    const {
        showModal,
        modalType,
        handleCloseModal,
        handleConfirmModal,
        openRejectModal,
        openApproveModal,
    } = useApplyModal(handleStatusChange);

    return (
        <>
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
                        {applications.map((application) => (
                            <tr key={application.id} className="border-b">
                                <td className="w-1/4 p-4">
                                    {application.place}
                                </td>
                                <td className="w-1/3 p-4">
                                    {application.date}
                                </td>
                                <td className="w-1/6 p-4">
                                    {application.price}
                                </td>
                                <td className="w-1/4 p-4">
                                    <StatusButton
                                        status={application.status}
                                        applicationId={application.id}
                                        onReject={openRejectModal}
                                        onAccept={openApproveModal}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot className="bg-white">
                        <tr>
                            <td colSpan={4} className="py-2">
                                <Pagination
                                    totalItems={applications.length}
                                    itemsPerPage={5}
                                    currentPage={1}
                                    onPageChange={(page) => console.log(page)}
                                />
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            {/* 모달 컴포넌트 렌더링 */}
            {showModal && (
                <ApplyModal
                    type={modalType}
                    onClose={handleCloseModal}
                    onConfirm={handleConfirmModal}
                />
            )}
        </>
    );
};

export default Table;
