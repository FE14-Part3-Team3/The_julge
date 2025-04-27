import Image from 'next/image';

export interface IconTextProps {
  iconSrc: string;
  alt?: string;
  text: string;
  iconSize?: number;
}

export default function IconText({
  iconSrc,
  alt = 'icon',
  text,
  iconSize = 20,
}: IconTextProps) {
  return (
    <div className="flex items-center gap-1.5 text-gray-50 text-[16px] font-normal leading-[26px]">
      <Image
        src={iconSrc}
        alt={alt}
        width={iconSize}
        height={iconSize}
        className="w-[20px] h-[20px]"
      />
      <span>{text}</span>
    </div>
  );
}
