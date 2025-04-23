import Modal from './Modal';
import { useState } from 'react';
import ModalButton from '../Button/ModalButton';

export type AlertType = 'password' | 'email' | 'register' | 'edit';

const AlertMessages: Record<AlertType, string> = {
  password: '비밀번호가 일치하지 않습니다.',
  email: '이미 사용중인 이메일입니다.',
  register: '등록이 완료되었습니다.',
  edit: '수정이 완료되었습니다.',
};

interface AlertModalProps {
  type: AlertType;
}

export default function AlertModal({ type }: AlertModalProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {isOpen && (
        <Modal
          description={AlertMessages[type]}
          layout="centered"
          buttonAlign="end"
          width="w-[540px] max-sm:w-[327px]"
          height="h-[250px] max-sm:h-[220px]"
          descriptionSize="text-[18px] max-sm:text-[16px]"
        >
          <div className="flex w-full mt-auto pt-2 justify-end max-sm:justify-center">
            <ModalButton
              label="확인"
              onClick={() => setIsOpen(false)}
              variant="primary"
              size="md"
              className="w-[100px] h-[40px] max-sm:w-[138px] max-sm:h-[42px]"
            />
          </div>
        </Modal>
      )}
    </>
  );
}
