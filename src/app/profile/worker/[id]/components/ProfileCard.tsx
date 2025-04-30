'use client';

import Button from '@/components/Button/Button';
import IconTextList from '@/components/IconText/IconTextList';
// import { useParams } from 'next/navigation';
import { useGetUser } from '@/hooks/api/useUserService';

// interface ProfileCardProps {
//   name: string;
//   phone: string;
//   region: string;
//   introduction: string;
//   onEdit?: () => void;
// }

export default function ProfileCard() {
  const userId = '83bd130d-e852-4dac-b6f5-b0c9922d6175';
  const { data } = useGetUser(userId);

  if (!data) {
    return null;
  }

  const { name, phone, address, bio } = data.item;

  return (
    <section className="w-full sm:max-w-[665px] min-h-[256px] sm:p-[32px] p-[20px] bg-[#FFEBE7] flex flex-col gap-[12px] justify-between rounded-[12px]">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-[8px]">
          <p className="sm:text-[16px] text-[14px] text-red-50 font-bold leading-[20px]">
            이름
          </p>
          <p className="sm:text-[28px] text-[24px] text-black font-bold leading-normal tracking-[0.56px]">
            {name}
          </p>
        </div>
        <Button
          variant="outline"
          size="md"
          className="w-[108px] h-[37px] sm:w-[169px] sm:h-[48px]"
        >
          편집하기
        </Button>
      </div>

      <IconTextList
        items={[
          { iconSrc: '/assets/images/phone.svg', text: phone ?? '' },
          {
            iconSrc: '/assets/images/map.svg',
            text: `선호지역: ${address}`,
          },
        ]}
      />

      <p className="text-black font-spoqa text-[14px] sm:text-[16px] font-normal leading-[26px]">
        {bio}
      </p>
    </section>
  );
}
