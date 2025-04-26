import RadioButton from "./RadioButton";

export type MemberType = "employee" | "employer";

interface MemberTypeRadioInputProps {
  checkedMemberType: MemberType;
  onChange: (value: MemberType) => void;
}

//라디오 버튼들을 감싸고 이름을 작성할 래퍼 컴포넌트입니다.
export default function MemberTypeRadioInput({
  checkedMemberType = "employee",
  onChange,
}: MemberTypeRadioInputProps) {
  return (
    <div className="w-full">
      <h3 className="text-black ">회원유형</h3>
      <div className="flex gap-4 mt-2">
        <RadioButton
          checkedMemberType={checkedMemberType}
          memberType="employee"
          onChange={onChange}
        />
        <RadioButton
          checkedMemberType={checkedMemberType}
          memberType="employer"
          onChange={onChange}
        />
      </div>
    </div>
  );
}
