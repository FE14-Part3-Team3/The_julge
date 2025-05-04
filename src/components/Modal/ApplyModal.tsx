import Modal from "./Modal";
import ModalButton from "../Button/ModalButton";
import Image from "next/image";

export type ApplyModalType = "cancel" | "reject" | "approve";

interface ApplyModalProps {
    type: ApplyModalType; // 모달 타입 ("cancel" | "reject" | "approve")
    onClose: () => void;
    onConfirm: () => void; // 확인 버튼 클릭 시 호출되는 함수
}

// 모달 타입별로 description과 버튼 문구 정의
const modalConfig: Record<
    ApplyModalType,
    { description: string; confirmLabel: string }
> = {
    cancel: {
        description: "신청을 취소하시겠어요?",
        confirmLabel: "취소하기",
    },
    reject: {
        description: "신청을 거절하시겠어요?",
        confirmLabel: "거절하기",
    },
    approve: {
        description: "신청을 승인하시겠어요?",
        confirmLabel: "승인하기",
    },
};

export default function ApplyModal({
    type,
    onClose,
    onConfirm,
}: ApplyModalProps) {
    const { description, confirmLabel } = modalConfig[type];

    return (
        <>
            <Modal
                size="compact"
                layout="top"
                buttonAlign="center"
                description={description}
                icon={
                    <Image
                        src="/assets/images/check.svg"
                        alt="아이콘"
                        width={24}
                        height={24}
                        className="mb-3"
                    />
                }
            >
                <div className="flex gap-2">
                    <ModalButton
                        label="아니오"
                        onClick={onClose}
                        variant="outline"
                        size="sm"
                    />
                    <ModalButton
                        label={confirmLabel}
                        onClick={onConfirm}
                        variant="primary"
                        size="sm"
                    />
                </div>
            </Modal>
        </>
    );
}
