import IconText from '../IconText/IconText';

export default function ProfileCard() {
  return (
    <div className="w-[665px] h-[256px] p-[32px] bg-[#FFEBE7]">
      <div className="flex flex-col gap-[12px]">
        <h1 className="text-[16px] text-red-50 font-bold leading-[20px]">
          이름
        </h1>
        <p className="text-[28px] text-black font-bold leading-normal tracking-[0.56px]">
          김승우
        </p>
        <IconText iconSrc="/assets/images/phone.svg" text="010-1234-4321" />
        <IconText
          iconSrc="/assets/images/map.svg"
          text="선호 지역: 서울시 도봉구"
        />
      </div>
    </div>
  );
}
