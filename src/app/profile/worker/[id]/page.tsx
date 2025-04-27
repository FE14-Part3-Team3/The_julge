import ProfileCard from './components/ProfileCard';
import RegisterCard from '@/components/Card/RegisterCard';

export default function WorkerProfilePage() {
  return (
    <>
      <div className="flex w-full max-w-[964px] mx-auto px-6 py-[60px] gap-[180px]">
        <p className="text-black font-spoqa text-[28px] font-bold leading-normal tracking-[0.56px] whitespace-nowrap">
          내 프로필
        </p>
        <ProfileCard
          name="김승우"
          phone="010-1234-4321"
          region="서울시 도봉구"
          introduction="열심히 일 하겠습니다"
        />
      </div>
      <RegisterCard
        title="신청 내역"
        description="아직 신청 내역이 없어요."
        buttonText="공고 보러가기"
      />
    </>
  );
}
