import clsx from "clsx";
import { Ref, InputHTMLAttributes, ReactNode } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  ref: Ref<HTMLInputElement>;
  isError?: boolean;
  errorText?: string;
  width?: string;
  suffix?: ReactNode;
}

export default function Input({
  label,
  ref,
  isError,
  errorText,
  width,
  suffix,
  ...rest
}: InputProps) {
  return (
    <div className={clsx(width, "flex flex-col")}>
      <label className="text-black text-normal/[26px] mb-2">{label}</label>
      <div className="relative">
        <input
          ref={ref}
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

// export type InputType = "text" | "password" | "number" | "email";

// interface InputProps {
//   placeholder: string;
//   type: InputType;
//   value: string;
//   onChange: (e: ChangeEvent<HTMLInputElement>) => void;
//   onBlur: (e: FocusEvent<HTMLInputElement>, type: InputType) => void;
// }

// export default function Input({
//   placeholder, //입력하기 전에 placeholder를 전달해주세요
//   type, //input 태그의 타입 속성을 전달해주세요 text | password | number | email 만 가능합니다
//   value, //상태를 전달해주세요
//   onChange, //상태를 변경하는 함수 handleChange => setState(value) 형태로 전달해주세요
//   onBlur, //validation을 진행하는 로직을 전달해주세요
// }: InputProps) {
//   return (
//     <input
//       className="bg-white py-4 px-5 rounded-[6px] w-full border border-gray-30"
//       type={type}
//       placeholder={placeholder}
//       value={value}
//       onChange={onChange}
//       onBlur={(e) => onBlur(e, type)}
//     />
//   );
// }
