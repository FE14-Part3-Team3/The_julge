import clsx from 'clsx';

interface SectionProps {
  children: React.ReactNode;
  subname?: string; // 주황색 텍스트 서브네임
  name: string; // 메인 타이틀
  className?: string; // 추가 스타일링
}

// 제목(서브네임, 메인 타이틀)과 내용을 세로로 배치하는 섹션 컴포넌트
export function Section({ children, subname, name, className }: SectionProps) {
  return (
    <div
      className={clsx(
        'flex flex-col w-full max-w-[964px] mx-auto px-6',
        'sm:pt-[60px] pt-[40px]',
        'sm:pb-[60px] pb-[80px]',
        'gap-[8px]',
        className
      )}
    >
      {subname && (
        <p className="text-[14px] sm:text-[16px] text-red-50 font-bold leading-[20px]">
          {subname}
        </p>
      )}
      <p className="text-[20px] sm:text-[28px] text-black font-bold leading-normal tracking-[0.56px] whitespace-nowrap mb-[16px] sm:mb-[24px]">
        {name}
      </p>

      {children}
    </div>
  );
}
