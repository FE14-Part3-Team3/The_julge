"use client";

import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import SelectInput from "@/components/Input/SelectInput";
import {
  usePostShopsNoticeList,
  useShopsNotice,
} from "@/hooks/api/useNoticeService";
import { NoticeFormData } from "@/types/api/notice";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

export default function NoticeRegisterForm() {
  const { shopId } = useParams();
  const queryClient = useQueryClient();
  const router = useRouter();
  const minDate = new Date().toISOString().slice(0, 16);

  const { mutate } = usePostShopsNoticeList();

  const onSubmit: SubmitHandler<NoticeFormData> = (data) => {
    mutate({ shopId, body: data });
  };

  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NoticeFormData>({ mode: "onSubmit" });

  const handleClick = () => {
    router.back();
  };

  return (
    <main className="w-full max-w-[964px] mx-auto mt-[60px]">
      <div className="flex justify-between">
        <h1 className="font-bold text-[28px]/[100%]">공고 등록</h1>
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
            label="시급*"
            placeholder={"입력"}
            {...register("hourlyPay", {
              required: "시급을 입력해주세요.",
              min: { value: 10030, message: "최저임금은 10030원입니다." },
            })}
            isError={!!errors.hourlyPay}
            errorText={errors.hourlyPay?.message}
            width="w-1/3"
            suffix="원"
          />
          <Input
            label="시작 일시*"
            type="datetime-local"
            value={minDate}
            min={minDate}
            {...register("startsAt", {
              required: "시작 일시를 입력해주세요.",
            })}
            isError={!!errors.startsAt}
            errorText={errors.startsAt?.message}
            width="w-1/3"
          />
          <Input
            label="업무 시간*"
            placeholder="입력"
            {...register("workHour", {
              required: "업무 시간을 입력해주세요",
              min: { value: 1, message: "1시간 이상 입력해주세요." },
              max: { value: 12, message: "12시간 이하로 입력해주세요." },
            })}
            isError={!!errors.workHour}
            errorText={errors.workHour?.message}
            suffix="시간"
            width="w-1/3"
          />
        </div>
        <div className="mt-6">
          <label className="text-base/[26px]">공고 설명</label>
          <textarea
            className="w-full h-[153px] border border-gray-30 rounded-md px-5 py-4 mt-2 text-normal/[26px] font-normal "
            placeholder="입력"
            {...register("description", { maxLength: 150 })}
          />
          {!!errors.description && (
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
