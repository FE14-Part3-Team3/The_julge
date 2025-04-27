import IconText, { IconTextProps } from './IconText';

interface IconTextListProps {
  items: IconTextProps[];
}

export default function IconTextList({ items }: IconTextListProps) {
  return (
    <div className="flex flex-col gap-[12px]">
      {items.map((item, idx) => (
        <IconText key={idx} {...item} />
      ))}
    </div>
  );
}
