'use client';

import Button from '../../../../../components/Button/Button';
import IconTextList from '../../../../../components/IconText/IconTextList';

interface ProfileCardProps {
  name: string;
  phone: string;
  region: string;
  introduction: string;
  onEdit?: () => void;
}

export default function ProfileCard({
  name,
  phone,
  region,
  introduction,
  onEdit,
}: ProfileCardProps) {
  return (
    <div className="w-[665px] h-[256px] p-[32px] bg-[#FFEBE7] flex flex-col gap-[12px] justify-between rounded-[12px]">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-[8px]">
          <p className="text-[16px] text-red-50 font-bold leading-[20px]">
            이름
          </p>
          <p className="text-[28px] text-black font-bold leading-normal tracking-[0.56px]">
            {name}
          </p>
        </div>
        <Button
          variant="outline"
          size="md"
          className="w-[169px] h-[48px]"
          onClick={onEdit}
        >
          편집하기
        </Button>
      </div>

      <IconTextList
        items={[
          { iconSrc: '/assets/images/phone.svg', text: phone },
          {
            iconSrc: '/assets/images/map.svg',
            text: region,
          },
        ]}
      />

      <p className="text-black font-spoqa text-[16px] font-normal leading-[26px]">
        {introduction}
      </p>
    </div>
  );
}
