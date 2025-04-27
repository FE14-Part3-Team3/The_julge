import clsx from 'clsx';

type Variant = 'primary' | 'outline'; // 버튼 스타일 타입
type Size = 'sm' | 'md' | 'lg'; // 버튼 크기 타입

interface ModalButtonProps {
  label: string; // 버튼 텍스트
  onClick: () => void; // 버튼 클릭 핸들러
  variant?: Variant; // 버튼 스타일 (기본값: 'primary')
  size?: Size; // 버튼 크기 (기본값: 'md')
  className?: string; // 외부에서 전달할 추가 클래스
}

// variant에 따라 버튼 스타일을 정의
const variantStyles: Record<Variant, string> = {
  primary: 'bg-red-50 text-white cursor-pointer',
  outline: 'bg-white font-sans text-red-50 border border-red-50 cursor-pointer',
};

// size에 따라 width/height/font-size를 정의
const sizeStyles: Record<Size, string> = {
  sm: 'w-[80px] h-[38px] text-[14px]',
  md: 'w-[120px] h-[48px] text-[16px]',
  lg: 'w-[160px] h-[52px] text-[18px]',
};

export default function ModalButton({
  label,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
}: ModalButtonProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'font-bold rounded-[8px] flex items-center justify-center', // 공통 스타일
        variantStyles[variant], // 스타일별 적용
        sizeStyles[size], // 사이즈별 적용
        className // 외부 className 추가
      )}
    >
      {label}
    </button>
  );
}
