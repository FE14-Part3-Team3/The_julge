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
    mutationFn: async (payload) => {
      const token = localStorage.getItem("token");
      return await requestor
        .put<GetUserResponse>(`/users/${id}`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.data);
    },
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
    <main className="w-full h-screen pt-[40px] sm:pt-[60px] px-[12px] sm:px-[32px] bg-gray-5">
      <div className="w-full max-w-[964px] mx-auto">
        <div className="flex justify-between">
          <h1 className="font-bold text-[20px]/[100%] sm:text-[28px]/[100%]">
            내 프로필
          </h1>
          <button
            onClick={handleClick}
            className="relative block w-[13px] h-[13px] sm:w-[17px] sm:h-[17px]"
          >
            <Image src={"/assets/images/vector.svg"} fill alt="닫기" />
          </button>
        </div>
        <form className="mt-[32px]" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5 sm:flex-row sm:flex-wrap">
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
              width="w-full sm:w-[calc(50%-0.625rem)] md:w-[calc(33.333%-0.833rem)]"
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
              width="w-full sm:w-[calc(50%-0.625rem)] md:w-[calc(33.333%-0.833rem)]"
            />
            <Controller
              name="address"
              control={control}
              rules={{
                required: "주소지를 선택해주세요",
              }}
              render={({ field }) => (
                <SelectInput
                  label="선호 지역"
                  placeholder="선택"
                  options={address}
                  value={field.value}
                  onChange={field.onChange}
                  width="w-full sm:w-[calc(50%-0.625rem)] md:w-[calc(33.333%-0.833rem)]"
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
          <Button className="block mx-auto mt-8 w-full sm:max-w-[312px] whitespace-nowrap">
            등록하기
          </Button>
        </form>
      </div>
    </main>
  );
}
