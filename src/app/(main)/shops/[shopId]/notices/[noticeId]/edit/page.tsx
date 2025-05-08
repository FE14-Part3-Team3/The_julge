"use client";

import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import {
  usePostShopsNoticeList,
  useShopsNotice,
  useUpdateShop,
} from "@/hooks/api/useNoticeService";
import { useGetUser } from "@/hooks/api/useUserService";
import { NoticeFormData } from "@/types/api/notice";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface NoticeDetailData extends NoticeFormData {
  id: string;
}

export default function NoticeRegisterForm() {
  const params = useParams();
  const userId = params.shopId as string;
  const { data: userDataWrapper } = useGetUser(userId);
  const noticeId = params.noticeId as string | undefined; // noticeId는 없을 수 있음
  const isEditMode = !!noticeId; //noticeId가 존재하면 수정 모드
  const queryClient = useQueryClient();
  const router = useRouter();
  const minDate = new Date().toISOString().slice(0, 16);
  const updateMutation = useUpdateShop(); //공고를 편집하는 변이를 불러옵니다.
  const postMutation = usePostShopsNoticeList(); //공고를 발행하는 변이를 불러옵니다.
  let shopId: string | undefined;
  if (userDataWrapper?.item.shop) {
    shopId = userDataWrapper.item.shop.item.id;
  }

  const { data: noticeDetailWrapper, isLoading: isLoadingNotice } =
    useShopsNotice(shopId, noticeId); //

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<NoticeFormData>({
    mode: "onSubmit",
  });

  useEffect(() => {
    if (isEditMode && noticeDetailWrapper?.item) {
      const noticeData = noticeDetailWrapper.item as NoticeDetailData;
      const { description, hourlyPay, startsAt, workhour } = noticeData;

      const formattedStartsAt = startsAt
        ? new Date(startsAt).toISOString().slice(0, 16)
        : "";
      reset({
        description,
        hourlyPay,
        startsAt: formattedStartsAt,
        workhour,
      });
    }
  }, [isEditMode, noticeDetailWrapper, reset]);

  //prop으로 받는 data가 이미 존재하는 경우와 존재하지 않는 경우를 나눠서 분기점을 잡고 구별합니다.
  const onSubmit: SubmitHandler<NoticeFormData> = (formData) => {
    const formattedDate =
      new Date(formData.startsAt).toISOString().slice(0, 19) + "Z";
    const body = { ...formData, startsAt: formattedDate };

    if (isEditMode) {
      updateMutation.mutate(
        {
          shopId,
          noticeId,
          body,
        },
        {
          onSuccess: (updatedNoticeData) => {
            queryClient.invalidateQueries({
              queryKey: ["shop-notices-detail", shopId, noticeId],
            });
            queryClient.invalidateQueries({
              queryKey: ["shop-notices", shopId],
            });

            router.push(`/shops/${userId}/notices/${noticeId}/applications`);
          },
          onError: (error) => {
            console.error(
              "공고 수정 실패:",
              updateMutation.errorMessage || error.message
            );
            alert(`수정 실패: ${updateMutation.errorMessage || error.message}`);
          },
        }
      );
    } else {
      postMutation.mutate(
        { shopId, body },
        {
          onSuccess: (newNoticeResponseData) => {
            console.log("공고 등록 성공", newNoticeResponseData);

            let newCreatedNoticeId: string | undefined;

            newCreatedNoticeId = newNoticeResponseData.item.id;
            if (newCreatedNoticeId) {
              queryClient.invalidateQueries({
                queryKey: ["shop-notices", shopId],
              });
              router.push(
                `/shops/${userId}/notices/${newCreatedNoticeId}/applications`
              );
            } else {
              console.error(
                "등록 후 새 공고 ID를 찾을 수 없습니다. 응답 데이터:",
                newNoticeResponseData
              );
              router.push(`/shops/${userId}`);
              alert(
                "공고는 등록되었으나, 상세 페이지로 이동 중 ID를 찾지 못했습니다. 목록을 확인해주세요."
              );
            }
          },
          onError: (error) => {
            console.error(
              "공고 등록 실패:",
              postMutation.errorMessage || error.message
            );
            alert(`등록 실패: ${postMutation.errorMessage || error.message}`);
          },
        }
      );
    }
  };

  const handleClick = () => {
    router.back();
  };

  if (isEditMode && isLoadingNotice) {
    return <div>공고 정보를 불러오는 중...</div>;
  }

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
              min: {
                value: 10030,
                message: "최저임금은 10030원입니다.",
              },
            })}
            isError={!!errors.hourlyPay}
            errorText={errors.hourlyPay?.message}
            width="w-1/3"
            suffix="원"
          />
          <Input
            label="시작 일시*"
            type="datetime-local"
            // value={}
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
            {...register("workhour", {
              required: "업무 시간을 입력해주세요",
              min: {
                value: 1,
                message: "1시간 이상 입력해주세요.",
              },
              max: {
                value: 12,
                message: "12시간 이하로 입력해주세요.",
              },
            })}
            isError={!!errors.workhour}
            errorText={errors.workhour?.message}
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
