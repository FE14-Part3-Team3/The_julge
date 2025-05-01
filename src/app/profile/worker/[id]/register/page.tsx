"use client";

import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import SelectInput from "@/components/Input/SelectInput";
import requestor from "@/lib/axios";
import { address } from "@/lib/constants/addressOptions";
import {
  GetUserResponse,
  UpdateUserProfileRequest,
  User,
  UserDetail,
} from "@/types/api/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

export default function ProfileRegisterPage() {
  const router = useRouter();
  const { id } = useParams();

  const queryClient = useQueryClient();

  //이미 존재하는 데이터 불러오기
  const {
    data: profileData,
    isLoading: isProfileLoading,
    error: profileError,
  } = useQuery<GetUserResponse, Error, User>({
    queryKey: ["userProfile", id],
    queryFn: async () =>
      await requestor
        .get<GetUserResponse>(`/users/${id}`)
        .then((res) => res.data),
    enabled: !!id,
    select: (data) => data.item,
    retry: false,
  });

  const updateMutation = useMutation<
    GetUserResponse,
    Error,
    UpdateUserProfileRequest
  >({
    mutationFn: async (payload) =>
      requestor
        .put<GetUserResponse>(`/users/${id}`, payload)
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile", id] });
      router.push(`/profile/worker/${id}`);
    },
  });

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<UpdateUserProfileRequest>({ mode: "onSubmit" });

  useEffect(() => {
    if (profileData) {
      const { name, phone, bio, address } = profileData;
      reset({ name, phone, bio, address });
    }
  }, [profileData]);

  const handleClick = () => {
    router.push(`/profile/worker/${id}`);
  };

  const onSubmit: SubmitHandler<UpdateUserProfileRequest> = async (data) => {
    updateMutation.mutate(data);
  };

  return (
    <main className="w-full max-w-[964px] mx-auto mt-[60px]">

      <div className="flex justify-between">
        <h1 className="font-bold text-[28px]/[100%]">내 프로필</h1>
        <button onClick={handleClick}>
          <Image
            src={"/assets/images/vector.svg"}
            width={17.58}
            height={17.58}
            alt="닫기"
          />
        </button>
      </div>
      <form className="mt-[32px]" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-5">
          <Input
            label="이름*"
            placeholder={"입력"}
            {...register("name", {
              required: "이름을 입력해주세요.",
              pattern: {
                value: /^[가-힣]{2,4}$/, // 한글 2~4자
                message: "2~4글자의 한글 이름을 입력해주세요.",
              },
            })}
            isError={!!errors.name}
            errorText={errors.name?.message}
            width="w-1/3"
          />
          <Input
            label="연락처*"
            placeholder="입력"
            {...register("phone", {
              required: "연락처를 입력해주세요.",
              pattern: {
                value: /^01([016789])[-\s]?(\d{3,4})[-\s]?(\d{4})$/,
                message: "유효한 휴대폰 번호 형식으로 입력해주세요.",
              },
            })}
            isError={!!errors.phone}
            errorText={errors.phone?.message}
            width="w-1/3"
          />
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <SelectInput
                label="선호 지역"
                placeholder="선택"
                options={address}
                value={field.value}
                onChange={field.onChange}
                width="w-1/3"
              />
            )}
          />
        </div>
        <div className="mt-6">
          <label className="text-base/[26px]">소개</label>
          <textarea
            className="w-full h-[153px] border border-gray-30 rounded-md px-5 py-4 mt-2 text-normal/[26px] font-normal "
            placeholder="입력"
            {...register("bio", { maxLength: 150 })}
          />
          {!!errors.bio && (
            <p className="text-red-40 text-[12px]/[16px] mt-2 pl-2">
              150자 미만으로 작성해주세요
            </p>
          )}
        </div>
        <Button className="block mx-auto mt-8">등록하기</Button>
      </form>
    </main>
  );
}
