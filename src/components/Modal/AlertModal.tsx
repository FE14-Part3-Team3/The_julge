import Modal from "./Modal";
import ModalButton from "../Button/ModalButton";

export type AlertType =
  | "password"
  | "email"
  | "register"
  | "edit"
  | "signup"
  | "generic";

const AlertMessages: Record<AlertType, string> = {
  password: "비밀번호가 일치하지 않습니다.",
  email: "이미 사용중인 이메일입니다.",
  signup: "가입이 완료되었습니다!",
  register: "등록이 완료되었습니다.",
  edit: "수정이 완료되었습니다.",
  generic: "다시 한 번 시도해주세요",
};

interface AlertModalProps {
  type: AlertType;
  onClose: () => void;
}

export default function AlertModal({ type, onClose }: AlertModalProps) {
  return (
    <>
      <Modal
        description={AlertMessages[type]}
        layout="centered"
        buttonAlign="center"
        width="w-[540px] max-xs:w-[327px]"
        height="h-[250px] max-xs:h-[220px]"
        descriptionSize="text-[18px] max-xs:text-[16px]"
      >
        <div className="flex w-full mt-auto pt-2 justify-center">
          <ModalButton
            label="확인"
            onClick={onClose}
            variant="primary"
            size="md"
            className="w-[100px] h-[40px] max-xs:w-[138px] max-xs:h-[42px]"
          />
        </div>
      </Modal>
    </>
  );
}
