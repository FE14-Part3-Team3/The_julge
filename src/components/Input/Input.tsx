import clsx from "clsx";
import { Ref, InputHTMLAttributes, ReactNode } from "react";

//input 태그의 표준 속성을 상속받고 주입받을 props의 타입을 정의 합니다.
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  ref: Ref<HTMLInputElement>;
  isError?: boolean;
  errorText?: string;
  width?: string;
  suffix?: ReactNode;
}

export default function Input({
  label, //인풋필드의 이름
  ref, //react-hook-form은 비제어 컴포넌트 형태로 폼을 관리합니다. 따라서 Ref를 전달받아야 합니다.
  isError, //조건부 스타일링을 위한 boolean
  errorText, //에러발생시 렌더링할 에러메시지
  width, //필드의 넓이
  suffix, //원, 아이콘과 같은 인풋필드에 추가 삽입할 것이 있다면 전달해주세요
  ...rest //그 외 input 태그의 표준 속성들
}: InputProps) {
  return (
    <div className={clsx(width, "flex flex-col")}>
      <label className="text-black text-normal/[26px] mb-2">{label}</label>
      <div className="relative">
        <input
          ref={ref} //ref를 전달해서 react-hook-form에서 인풋 값을 관리할 수 있게 합니다.
          className={clsx(
            "w-full px-5 py-4 bg-white border border-gray-30 rounded-md",
            isError && "border-red-40"
          )}
          {...rest}
        />
        {suffix && (
          <span className="absolute right-5 top-1/2 transform -translate-y-1/2">
            {suffix}
          </span>
        )}
      </div>
      {isError && (
        <p className="text-red-40 text-[12px]/[16px] mt-2 pl-2">{errorText}</p>
      )}
    </div>
  );
}