import { seoulDistricts } from "@/types/common";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";

interface NoticeFilterPanelProps {
  selectedDistricts: string[];
  setSelectedDistricts: (districts: string[]) => void;
  inputQuery: Record<string, any>;
  handleFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  applyFilters: () => void;
  resetFilters: () => void;
  width?: string;
  className?: string;
}

export default function NoticeFilterPanel({
  selectedDistricts,
  setSelectedDistricts,
  inputQuery,
  handleFilterChange,
  applyFilters,
  resetFilters,
  className
}: NoticeFilterPanelProps) {
  const handleCheckboxChange = (district: string, checked: boolean) => {
    const updated = checked
      ? [...selectedDistricts, district]
      : selectedDistricts.filter((d) => d !== district);
    setSelectedDistricts(updated);
  };

 const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick =  (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); 
    e.preventDefault();   
    setOpen(!open);
  };

  const filterCount = getActiveFilterCount(inputQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    
    <div className={clsx("flex flex-col", className)}>
      <div ref={containerRef} className="sm:relative">
        <button
          className="flex justify-between items-center px-5 rounded-[6px] text-white h-9 w-auto bg-red-30 cursor-pointer focus:outline-none"
          onClick={handleClick}
        >
          <span>상세 필터 {filterCount > 0 && `(${filterCount})`}</span>
        </button>
        {open && (
          <div className="
          right-0  py-6 px-5 bg-white text-left overflow-auto z-20 
          xs:fixed xs:w-full xs:h-full xs:top-0
          sm:absolute sm:border sm:border-gray-20 sm:rounded-[10px] sm:h-auto sm:w-96 sm:top-full   sm:mt-[8px]
          ">
            
            <strong className="block font-bold text-xl text-black mb-6">상세 필터</strong>

            <button className="absolute top-6 right-5 cursor-pointer"
              onClick={() => { setOpen(false); }}>         
              <Image src="/assets/images/close.svg" alt="창닫기" width="10" height="10" className="w-[24px] h-[24px]" />
            </button>

            <div className="mb-3 text-base text-black">위치</div>
            <div className="border-b border-gray-20 pb-6 mb-6">
              <div className="border border-gray-20 max-h-64 overflow-y-auto py-5 px-7 flex flex-wrap">  
                {seoulDistricts.map((district) => (
                  <label key={district} 
                    className={clsx(
                      "flex-1 min-w-[50%] leading-[40px] cursor-pointer",
                      selectedDistricts.includes(district) && "font-bold "
                      )}>
                    <input
                      className="hidden"
                      type="checkbox"
                      checked={selectedDistricts.includes(district)}
                      onChange={(e) => handleCheckboxChange(district, e.target.checked)}
                    />
                    {district}
                  </label>
                ))}
              </div>
              {selectedDistricts.length > 0 && (
                <ul className="flex flex-wrap gap-2 mt-4">
                  {selectedDistricts.map((add) => (
                    <li key={add} className="flex items-center font-bold bg-red-10 text-red-50 px-[10px] py-[6px] rounded-full text-sm">
                      <span>{add}</span>
                      <Image
                        src="/assets/images/delete_red.svg"
                        alt="삭제"
                        width={16}
                        height={18}
                        className="ml-2 cursor-pointer"
                        onClick={() => {
                          const updated = selectedDistricts.filter((item) => item !== add);
                          setSelectedDistricts(updated);
                        }}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            <div className="border-b border-gray-20 pb-6 mb-6">
              <Input
                ref={inputRef}
                label="시작일"
                placeholder={"입력"}
                type="datetime-local"
                name="startsAtGte"
                width="w-full"
                className="border px-2 py-1 rounded h-[58px] w-full"
                onChange={(e) =>
                  handleDateChange(e, (rfc3339) =>
                    handleFilterChange({
                      target: {
                        name: "startsAtGte",
                        value: rfc3339,
                      },
                    } as React.ChangeEvent<HTMLInputElement>)
                  )
                }
              />
            </div>
            <div className="pb-6 flex gap-3 items-end">
              <Input
                ref={inputRef}
                label="금액"
                name="hourlyPayGte"
                suffix="원"
                className="flex border px-4 py-1 rounded h-[58px]"
                width="w-full"
                onChange={handleFilterChange}
              />
              <span className="flex flex-col min-w-[40%] h-[58px]">
                <span className="flex items-center flex-1">이상부터</span>
              </span>
            </div>
            <div className="flex w-full gap-2">
              <Button 
                variant="outline" size="lg" 
                className="!px-0 w-full text-center whitespace-nowrap font-normal" 
                onClick={resetFilters} >
                  <span>초기화</span>
              </Button>
              <Button 
                variant="primary" size="lg" 
                className="!px-0 w-full min-w-[70%] text-center  font-normal whitespace-nowrap" 
                onClick={applyFilters} >
                  <span>적용하기</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>

  );
}

function getActiveFilterCount(query: {
  address?: string[];
  startsAtGte?: string;
  hourlyPayGte?: number;
}): number {
  let count = 0;

  // 위치 필터 (복수 선택 가능)
  if (query.address && query.address.length > 0) {
    count += query.address.length;
  }

  // 시작일 필터
  if (query.startsAtGte && query.startsAtGte.trim() !== "") {
    count += 1;
  }

  // 시급 필터
  if (query.hourlyPayGte && query.hourlyPayGte > 0) {
    count += 1;
  }

  return count;
}

const handleDateChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  onValidDate: (value: string) => void
) => {
  const dateStr = e.target.value;
  if (!dateStr) return;

  const selected = new Date(dateStr);
  const now = new Date();

  if (selected <= now) {
    alert("시작일은 오늘 이후로 선택해주세요.");
    return;
  }

  const rfc3339 = new Date(dateStr).toISOString();
  onValidDate(rfc3339);
};