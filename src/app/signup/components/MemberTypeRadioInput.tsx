import { ChangeEventHandler } from "react";
import RadioButton from "./RadioButton";

export type MemberType = "employee" | "employer";

interface MemberTypeRadioInputProps {
  checkedMemberType: MemberType;
  onChange: (value: MemberType) => void;
}

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
