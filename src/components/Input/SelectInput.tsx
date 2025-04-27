import { useEffect, useRef, useState } from "react";

interface SelectInputProps {
  placeholder: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

export default function SelectInput({
  placeholder, //placeholder를 전달해주세요
  value, //선택한 값을 저장할 상태나 ref를 전달해주세요
  options, //선택할 값들의 list를 전달해주세요
  onChange, //상태 업데이트 로직을 전달해주세요
}: SelectInputProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const handleClickOutside = (e: globalThis.MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div ref={containerRef} className="relative">
        <input
          placeholder={placeholder}
          value={value}
          type="text"
          className="bg-white py-4 px-5 rounded-[6px] w-full border border-gray-30 cursor-pointer caret-transparent focus:outline-none "
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
      </div>
    </>
  );
}
