import { useState } from "react";
import { Application } from "../Table/Table";

export type ApplyModalType = "cancel" | "reject" | "approve";

// 신청 모달 상태와 로직을 관리하는 커스텀 훅
export function useApplyModal(
    onStatusChange: (id: number, status: Application["status"]) => void
) {
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<ApplyModalType>("approve");
    const [selectedApplicationId, setSelectedApplicationId] = useState<
        number | null
    >(null);

    // 모달 닫기
    const handleCloseModal = () => {
        setShowModal(false);
    };

    // 모달에서 확인 버튼 클릭 시 처리
    const handleConfirmModal = () => {
        if (selectedApplicationId !== null) {
            let newStatus: Application["status"] = "normal";

            if (modalType === "reject") {
                newStatus = "rejected";
            } else if (modalType === "approve") {
                newStatus = "approved";
            }

            // 부모 컴포넌트에 상태 변경 알림
            onStatusChange(selectedApplicationId, newStatus);
        }
        setShowModal(false);
    };

    // 거절 모달 열기
    const openRejectModal = (id: number) => {
        setSelectedApplicationId(id);
        setModalType("reject");
        setShowModal(true);
    };

    // 승인 모달 열기
    const openApproveModal = (id: number) => {
        setSelectedApplicationId(id);
        setModalType("approve");
        setShowModal(true);
    };

    return {
        showModal,
        modalType,
        handleCloseModal,
        handleConfirmModal,
        openRejectModal,
        openApproveModal,
    };
}
