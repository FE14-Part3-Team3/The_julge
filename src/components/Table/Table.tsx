import { useState } from "react";
import Pagination from "../Pagination/Pagination";
import ApplyModal, { ApplyModalType } from "../Modal/ApplyModal";

type Status = "normal" | "approved" | "waiting" | "rejected";

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
        useState<Application[]>(initialApplications); // 예약 목록 상태

    const [showModal, setShowModal] = useState(false); // 모달 표시 여부
    const [modalType, setModalType] = useState<ApplyModalType>("approve"); // 모달 타입
    const [selectedApplication, setSelectedApplication] = useState<
        number | null
    >(null); // 선택된 예약 ID

    const handleCloseModal = () => {
        setShowModal(false);
    };

    // 모달에서 확인 버튼 클릭 시 상태 변경
    const handleConfirmModal = () => {
        if (selectedApplication !== null) {
            // 모달 타입에 따라 상태 변경
            setApplications((prevApplications) =>
                prevApplications.map((application) => {
                    if (application.id === selectedApplication) {
                        let newStatus: Status = application.status;

                        if (modalType === "reject") {
                            newStatus = "rejected";
                        } else if (modalType === "approve") {
                            newStatus = "approved";
                        }

                        return { ...application, status: newStatus };
                    }
                    return application;
                })
            );
        }
        setShowModal(false);
    };

    // 거절하기 버튼 클릭 핸들러
    const handleReject = (id: number) => {
        setSelectedApplication(id);
        setModalType("reject");
        setShowModal(true);
    };

    // 승인하기 버튼 클릭 핸들러
    const handleAccept = (id: number) => {
        setSelectedApplication(id);
        setModalType("approve");
        setShowModal(true);
    };

    // 상태에 따른 버튼 렌더링
    const renderStatusButton = (status: Status, id: number) => {
        if (status === "normal") {
            return (
                <div className="flex space-x-2">
                    <button
                        onClick={() => handleReject(id)}
                        className="px-4 py-2 text-red-50 font-bold border border-red-50 rounded-md"
                    >
                        거절하기
                    </button>
                    <button
                        onClick={() => handleAccept(id)}
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
                                    {renderStatusButton(
                                        application.status,
                                        application.id
                                    )}
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
