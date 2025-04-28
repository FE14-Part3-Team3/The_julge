import ProfileCard from '@/app/profile/worker/[id]/components/ProfileCard';
import RegisterCard from '@/components/Card/RegisterCard';

export default function WorkerProfilePage() {
  return (
    <>
      <div className="flex flex-col sm:flex-row w-full max-w-[964px] mx-auto px-6 py-[60px] gap-[24px] sm:gap-[180px]">
        <p className="sm:text-[28px] text-black font-spoqa text-[20px] font-bold leading-normal tracking-[0.56px] whitespace-nowrap">
          내 프로필
        </p>
        <ProfileCard
          name="김승우"
          phone="010-1234-4321"
          region="서울시 도봉구"
          introduction="열심히 일 하겠습니다"
        />
      </div>
      <div className="bg-gray-5">
        <RegisterCard
          title="신청 내역"
          description="아직 신청 내역이 없어요."
          buttonText="공고 보러가기"
        />
      </div>
    </>
  );
}
