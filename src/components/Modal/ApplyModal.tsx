import Modal from "./Modal";
import ModalButton from "../Button/ModalButton";

type ApplyModalType = "cancel" | "reject" | "approve";

interface ApplyModalProps {
  type: ApplyModalType;
  onClose: () => void;
}

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

export default function ApplyModal({ type, onClose }: ApplyModalProps) {
  const { description, confirmLabel } = modalConfig[type];

  return (
    <>
      <Modal
        size="compact"
        layout="top"
        buttonAlign="center"
        description={description}
        icon={
          <img
            src="/assets/images/check.svg"
            alt="아이콘"
            className="w-6 h-6 mb-3"
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
            onClick={onClose}
            variant="primary"
            size="sm"
          />
        </div>
      </Modal>
    </>
  );
}
