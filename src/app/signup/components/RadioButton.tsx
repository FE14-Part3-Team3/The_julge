import Image from "next/image";
import { MemberType } from "./MemberTypeRadioInput";
import clsx from "clsx";
import { ChangeEvent } from "react";

interface RadioButtonProps {
  checkedMemberType: MemberType;
  memberType: MemberType;
  onChange: (value: MemberType) => void;
}

const memberToKorean: Record<MemberType, string> = {
  employee: "알바님",
  employer: "사장님",
};

export default function RadioButton({
  checkedMemberType,
  memberType,
  onChange,
}: RadioButtonProps) {
  const isChecked = checkedMemberType === memberType;
  const base =
    "py-[13px] pl-[41px] pr-[58px] text-[14px]/[22px] font-normal border rounded-full flex gap-2 whitespace-nowrap";

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
        type="radio"
        value={memberType}
        id={memberType}
        name="memberType"
        className="hidden"
        onChange={handleChange}
      />
      <span className="w-5 h-5 inline-block relative">
        {checkedMemberType === memberType ? (
          <Image src={"/assets/images/check.svg"} fill alt="체크됨" />
        ) : (
          <Image src={"/assets/images/ellipse.svg"} fill alt="체크됨" />
        )}
      </span>
      {memberToKorean[memberType]}
    </label>
  );
}
