"use client";

import ProfileCard from "./components/ProfileCard";
import RegisterCard from "@/components/Card/RegisterCard";
import { useParams } from "next/navigation";
import { useGetUser } from "@/hooks/api/useUserService";
import { SeoulDistrict } from "@/types/common";
import { Section } from "@/components/Section/Section";
import ApplicationTable from "./components/ApplicationTable";

export default function WorkerProfilePage() {
    const params = useParams();
    const userId = params?.id as string;
    const { data } = useGetUser(userId);

    if (!data) return null;

    const { name, phone, address, bio } = data.item;

    return (
        <>
            {name ? (
                <>
                    <div className="flex flex-col sm:flex-row w-full max-w-[964px] mx-auto px-6 py-[60px] gap-[24px] sm:gap-[180px]">
                        <p className="sm:text-[28px] text-black font-spoqa text-[20px] font-bold leading-normal tracking-[0.56px] whitespace-nowrap">
                            내 프로필
                        </p>

                        <ProfileCard
                            name={name ?? ""}
                            phone={phone ?? ""}
                            address={address as SeoulDistrict}
                            bio={bio ?? ""}
                        />
                    </div>

                    <Section name="신청 내역">
                        <ApplicationTable />
                    </Section>
                </>
            ) : (
                <RegisterCard
                    title="내 프로필"
                    description="내 프로필을 등록하고 원하는 가게에 지원해 보세요."
                    buttonText="내 프로필 등록하기"
                />
            )}
            ;
        </>
    );
}
