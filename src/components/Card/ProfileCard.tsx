'use client';

import Button from '../Button/Button';
import IconText from '../IconText/IconText';

export default function ProfileCard() {
  return (
    <div className="w-[665px] h-[256px] p-[32px] bg-[#FFEBE7] flex flex-col gap-[12px] justify-between rounded-[12px]">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-[8px]">
          <p className="text-[16px] text-red-50 font-bold leading-[20px]">
            이름
          </p>
          <p className="text-[28px] text-black font-bold leading-normal tracking-[0.56px]">
            김승우
          </p>
        </div>
        <Button variant="outline" size="md" className="w-[169px] h-[48px]">
          편집하기
        </Button>
      </div>

      <div className="flex flex-col gap-[12px]">
        <IconText iconSrc="/assets/images/phone.svg" text="010-1234-4321" />
        <IconText
          iconSrc="/assets/images/map.svg"
          text="선호 지역: 서울시 도봉구"
        />
      </div>

      <p className="text-black font-spoqa text-[16px] font-normal leading-[26px]">
        열심히 일 하겠습니다
      </p>
    </div>
  );
}
