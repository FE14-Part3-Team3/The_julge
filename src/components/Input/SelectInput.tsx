import clsx from "clsx";
import {
  InputHTMLAttributes,
  ReactNode,
  Ref,
  useEffect,
  useRef,
  useState,
} from "react";

interface SelectInputProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  isError?: boolean;
  errorText?: string;
  width?: string;
  suffix?: ReactNode;
}

export default function SelectInput({
  label,
  placeholder, //placeholder를 전달해주세요
  value, //선택한 값을 저장할 상태나 ref를 전달해주세요
  onChange,
  options, //선택할 값들의 list를 전달해주세요
  isError,
  errorText,
  width,
  suffix,
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
      <div className={clsx("w-[472px] flex flex-col", width)}>
        <label className="text-black text-base/[26px] mb-2">{label}</label>
        <div ref={containerRef} className="relative">
          <input
            placeholder={placeholder}
            value={value}
            type="text"
            readOnly
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
      </div>
    </>
  );
}
