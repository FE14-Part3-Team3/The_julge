import Modal from './Modal';
import { useState } from 'react';
import ModalButton from '../Button/ModalButton';

type ApplyModalType = 'cancel' | 'reject' | 'approve';

interface ApplyModalProps {
  type: ApplyModalType;
}

const modalConfig: Record<
  ApplyModalType,
  { description: string; confirmLabel: string }
> = {
  cancel: {
    description: '신청을 취소하시겠어요?',
    confirmLabel: '취소하기',
  },
  reject: {
    description: '신청을 거절하시겠어요?',
    confirmLabel: '거절하기',
  },
  approve: {
    description: '신청을 승인하시겠어요?',
    confirmLabel: '승인하기',
  },
};

export default function ApplyModal({ type }: ApplyModalProps) {
  const [isOpen, setIsOpen] = useState(true);
  const { description, confirmLabel } = modalConfig[type];

  return (
    <>
      {isOpen && (
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
              onClick={() => setIsOpen(false)}
              variant="outline"
              size="sm"
            />
            <ModalButton
              label={confirmLabel}
              onClick={() => setIsOpen(false)}
              variant="primary"
              size="sm"
            />
          </div>
        </Modal>
      )}
    </>
  );
}
