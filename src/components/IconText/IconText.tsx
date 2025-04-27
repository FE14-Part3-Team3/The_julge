import clsx from 'clsx';
import Image from 'next/image';

export interface IconTextProps {
  iconSrc: string; // 아이콘 이미지 경로
  alt?: string; // 아이콘 대체 텍스트 (기본값: "icon")
  text: string; // 아이콘 옆에 표시할 텍스트
  iconSize?: number; // 아이콘 크기 설정 (기본값: 20)
  className?: string; // 추가 스타일링
}

// 아이콘 + 텍스트를 나란히 보여주는 컴포넌트
export default function IconText({
  iconSrc,
  alt = 'icon',
  text,
  iconSize = 20,
  className,
}: IconTextProps) {
  return (
    <div
      className={clsx(
        'flex items-center gap-1.5 text-gray-50 text-[16px] font-normal leading-[26px]',
        className
      )}
    >
      {/* 아이콘 이미지 */}
      <Image
        src={iconSrc}
        alt={alt}
        width={iconSize}
        height={iconSize}
        className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px]"
      />

      {/* 텍스트 */}
      <span className="text-gray-50 font-spoqa text-[14px] sm:text-[16px] font-normal leading-[26px]">
        {text}
      </span>
    </div>
  );
}
