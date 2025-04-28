import clsx from 'clsx';
import IconText, { IconTextProps } from './IconText';

interface IconTextListProps {
  items: IconTextProps[]; // 아이콘 + 텍스트 항목 배열
  className?: string; // 추가 스타일링
}

// 여러 개의 IconText를 column으로 나열하는 컴포넌트
export default function IconTextList({ items, className }: IconTextListProps) {
  return (
    <div className={clsx('flex flex-col gap-[12px]', className)}>
      {items.map((item, idx) => (
        <IconText key={idx} {...item} />
      ))}
    </div>
  );
}
