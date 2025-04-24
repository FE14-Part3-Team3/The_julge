import { ReactNode } from "react";

interface InputFieldProps {
  label: string;
  width: string;
  children: ReactNode;
  isError?: boolean;
  error?: string;
}

export function InputField({
  label, //label을 전달해주세요 ex) 이메일, 분류, 주소...
  width, //field의 width값만 계속 변경되어서 width값을 전달해주면 input의 크기는 알아서 변경됩니다.
  isError, //validate 결과를 boolean으로 전달해주세요
  error, //표시할 에러메시지를 전달해주세요 ex) '잘못된 이메일입니다.'
  children, //input들을 감싸 주세요
}: InputFieldProps) {
  return (
    <div className={`${width} flex-col relative`}>
      <label className="block text-black text-normal/[26px] mb-2">
        {label}
      </label>
      {children}
      {isError && (
        <p className="text-red-50 text-[12px]/[16px] mt-2 pl-2">{error}</p>
      )}
    </div>
  );
}
