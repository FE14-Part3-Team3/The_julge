import Modal from "./Modal";
import ModalButton from "../Button/ModalButton";

interface RegisterModalProps {
  onClose: () => void;
}

export default function RegisterModal({ onClose }: RegisterModalProps) {
  return (
    <>
      <Modal
        description="내 프로필을 먼저 등록해 주세요."
        size="compact"
        layout="top"
        buttonAlign="center"
        icon={
          <img
            src="/assets/images/notification.svg"
            alt="알림 아이콘"
            className="w-6 h-6 mb-3"
          />
        }
      >
        <ModalButton
          label="확인"
          variant="outline"
          size="sm"
          onClick={onClose}
        />
      </Modal>
    </>
  );
}
