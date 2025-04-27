import Image from "next/image";
import { MemberType } from "./MemberTypeRadioInput";
import clsx from "clsx";
import { ChangeEvent } from "react";

interface RadioButtonProps {
  checkedMemberType: MemberType;
  memberType: MemberType;
  onChange: (value: MemberType) => void;
}

//한글로 변경하기 위한 dict형태의 객체입니다.
const memberToKorean: Record<MemberType, string> = {
  employee: "알바님",
  employer: "사장님",
};

export default function RadioButton({
  checkedMemberType,
  memberType,
  onChange,
}: RadioButtonProps) {
  const isChecked = checkedMemberType === memberType; //현재 선택한 값과 라디오버튼의 value를 비교하는 flag입니다.
  const base = //베이스 디자인을 따로 분리했습니다.
    "py-[13px] pl-[41px] pr-[58px] text-[14px]/[22px] font-normal border rounded-full flex gap-2 whitespace-nowrap";

  //기본 input태그에서 react-hook-form 라이브러리에서 전달하는 onChange함수를 그대로 전달하면 타입에러가 발생해서 타입에러를 방지하기 위해 한 번 감싼 이벤트핸들러입니다.
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(memberType);
    }
  };

  return (
    <label
      className={clsx(base, isChecked ? "border-red-50" : "border-gray-30")}
    >
      <input
        type="radio" //타입을 radio로 작성해야 여러 항목 중 하나만이 선택가능한 라디오 버튼형태로 동작합니다.
        value={memberType}
        id={memberType}
        name="memberType" //라디오 버튼은 같은 name값을 가진 input끼리 중복 선택이 되지 않게 동작합니다.
        className="hidden" //input태그는 화면에 렌더링되지 않게했습니다. 그대신 label로 감싸서 라벨을 클릭하는 경우 해당 값이 선택되도록 했습니다.
        onChange={handleChange}
      />
      {/* 현재는 조건부로 렌더링하는 이미지가 달라지도록 구현했습니다. 후에 svg파일을 컴포넌트 형태로 바꿔 적용할 예정입니다. */}
      <span className="w-5 h-5 inline-block relative">
        {isChecked ? (
          <Image src={"/assets/images/check.svg"} fill alt="체크됨" />
        ) : (
          <Image src={"/assets/images/ellipse.svg"} fill alt="체크안됨" />
        )}
      </span>
      {memberToKorean[memberType]}
    </label>
  );
}
