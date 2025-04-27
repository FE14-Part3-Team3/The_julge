interface SectionProps {
  children: React.ReactNode;
  subname?: string; // 주황색 텍스트 서브네임
  name: string; // 메인 타이틀
}

export function Section({ children, subname, name }: SectionProps) {
  return (
    <>
      <div className="flex flex-col w-full max-w-[964px] mx-auto px-6 py-[60px] gap-[8px]">
        {subname && (
          <p className="text-[16px] text-red-50 font-bold leading-[20px]">
            {subname}
          </p>
        )}
        <p className="text-[28px] text-black font-bold leading-normal tracking-[0.56px] whitespace-nowrap mb-[24px]">
          {name}
        </p>

        {children}
      </div>
    </>
  );
}
