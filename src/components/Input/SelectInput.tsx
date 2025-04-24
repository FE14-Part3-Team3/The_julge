import { MouseEvent, useEffect, useRef, useState } from "react";

interface SelectInputProps {
  placeholder: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

export default function SelectInput({
  placeholder,
  value,
  options,
  onChange,
}: SelectInputProps) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <input
        placeholder={placeholder}
        value={value}
        type="text"
        className="bg-white py-4 px-5 rounded-[6px] w-full border border-gray-30 cursor-pointer"
        onClick={handleClick}
      />
      {open && (
        <ul className="absolute top-full mt-[8px] bg-white border border-gray-20 rounded-[6px] w-full text-center h-[230px] overflow-auto px-[12px] z-10 shadow-input">
          {options.map((opt) => (
            <li
              className="h-1/5 border-b pt-[12px] text-[14px]/[22px] text-black cursor-pointer"
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
