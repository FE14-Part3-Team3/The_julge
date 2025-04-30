'use client';

import ProfileCard from '@/app/profile/worker/[id]/components/ProfileCard';
import RegisterCard from '@/components/Card/RegisterCard';
import { useParams } from 'next/navigation';
import { useGetUser } from '@/hooks/api/useUserService';

export default function WorkerProfilePage() {
  const params = useParams();
  const userId = params?.id as string;
  const { data } = useGetUser(userId);

  if (!data) {
    return <div>Loading...</div>;
  }

  const { name, phone, address, bio } = data.item;

  return (
    <>
      <div className="flex flex-col sm:flex-row w-full max-w-[964px] mx-auto px-6 py-[60px] gap-[24px] sm:gap-[180px]">
        <p className="sm:text-[28px] text-black font-spoqa text-[20px] font-bold leading-normal tracking-[0.56px] whitespace-nowrap">
          내 프로필
        </p>
        <ProfileCard
          name={name ?? ''}
          phone={phone ?? ''}
          address={address ?? ''}
          bio={bio ?? ''}
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
