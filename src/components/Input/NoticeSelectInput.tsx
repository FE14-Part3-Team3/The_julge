import clsx from "clsx";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface Option {
  label: string;
  value: string;
}
interface SelectInputProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  width?: string;
  className?: string;
}

export default function NoticeSelectInput({   // options의 label부분이 필요해서 NoticeSelectInput 추가했습니다.
  value,
  onChange,
  options,
  className
}: SelectInputProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick =  (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); 
    e.preventDefault();   
    setOpen(!open);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
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
    <div className={clsx("flex flex-col", className)}>
      <div ref={containerRef} className="relative">
        <button
          className="flex justify-between items-center px-5 font-bold rounded-[6px] h-9 w-full border-none leading-8 bg-gray-10 cursor-pointer focus:outline-none"
          onClick={handleClick}
        >
          <span>{value}</span>
          <Image
            src="/assets/images/select_arrow.svg"
            alt={value} width="10" height="10"
            className="w-[10px] h-[10px]  shadow-input"
          />
        </button>
        {open && (
          <ul className="absolute top-full mt-[8px] py-1 bg-white border border-gray-20 rounded-[6px] w-full text-center h-auto overflow-auto z-10 shadow-input">
            {options.map((opt) => (
              <li
                key={opt.value}
                className="border-b py-[6px] text-[14px]/[22px] text-black cursor-pointer last:border-b-0"
                onClick={() => { 
                  onChange(opt.value);
                  setOpen(false);
                }}
              >
                {opt.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
