"use client";

import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import SelectInput from "@/components/Input/SelectInput";
import AlertModal from "@/components/Modal/AlertModal";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import ImageUploader from "./ImageUploader"; // 동일 경로의 ImageUploader 사용
import { category, Category } from "@/lib/constants/foodCategory";
import { address, AddressOptions } from "@/lib/constants/addressOptions";
import useShopEdit from "../hooks/useShopEdit"; // 수정된 훅 사용

// 폼 데이터 타입 정의
export interface ShopEditFormData {
  name: string;
  category: Category | "";
  address1: AddressOptions | "";
  address2: string;
  description: string;
  image: FileList | string; // 기존 이미지 URL(string) 또는 새 FileList
  wage: number;
}

export default function ShopEditForm() {
  const {
    register,
    handleSubmit: handleFormSubmit, // react-hook-form의 handleSubmit과 훅의 handleSubmit 이름 충돌 방지
    control,
    watch,
    reset, // useShopEdit에서 폼 초기화를 위해 필요
    formState: { errors, isSubmitting }, // isSubmitting은 react-hook-form에서 제공
  } = useForm<ShopEditFormData>({
    mode: "onSubmit",
    // defaultValues는 useShopEdit 훅 내부에서 reset을 통해 설정
  });

  const {
    isEdited,
    isLoading, // 훅에서 제공하는 로딩 상태 (데이터 fetching + 제출 시)
    error,
    isLoggedIn,
    previewImg,
    handleSubmit: onFormSubmit, // 훅에서 가져온 제출 핸들러
    handleCloseModal,
    handleLoginRedirect,
  } = useShopEdit({ watch, reset });

  // 로그인 필요 에러 처리
  if (!isLoading && !isLoggedIn && error) {
    return (
      <div className="p-4 bg-red-100 border border-red-300 text-red-700 rounded mb-6">
        {error}
        <button className="ml-4 underline" onClick={handleLoginRedirect}>
          로그인 페이지로 이동
        </button>
      </div>
    );
  }

  // 데이터 로딩 중 UI
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
        <p className="text-gray-600">가게 정보를 불러오는 중...</p>
      </div>
    );
  }

  // 일반 에러 (데이터 로딩 실패 등, 로그인 에러 제외)
  if (error) {
    return (
      <div className="p-4 bg-red-100 border border-red-300 text-red-700 rounded mb-6">
        {error}
        {/* 여기에 "다시 시도" 버튼을 추가할 수 있습니다. 예: onClick={() => window.location.reload()} */}
      </div>
    );
  }

  // 실제 폼 제출 로직
  const onSubmit: SubmitHandler<ShopEditFormData> = (data) => {
    onFormSubmit(data);
  };

  return (
    <>
      <form
        className="shop-register-form w-full bg-[#FAFAFA] p-6 rounded-lg mt-[32px] grid grid-cols-1 lg:grid-cols-2 gap-x-5 gap-y-6"
        onSubmit={handleFormSubmit(onSubmit)}
      >
        <Input
          label="가게 이름*"
          placeholder="입력"
          {...register("name", {
            required: "가게 이름은 필수 입력 항목입니다.",
          })}
          isError={!!errors.name}
          errorText={errors.name?.message}
        />
        <Controller
          name="category"
          control={control}
          rules={{ required: "분류는 필수 선택 항목입니다." }}
          render={({ field }) => (
            <SelectInput
              label="분류*"
              value={field.value}
              placeholder="선택"
              onChange={field.onChange}
              options={category}
              width="w-full"
              isError={!!errors.category}
              errorText={errors.category?.message}
            />
          )}
        />
        <Controller
          name="address1"
          control={control}
          rules={{ required: "주소는 필수 선택 항목입니다." }}
          render={({ field }) => (
            <SelectInput
              label="주소*"
              placeholder="선택"
              value={field.value}
              onChange={field.onChange}
              options={address}
              width="w-full"
              isError={!!errors.address1}
              errorText={errors.address1?.message}
            />
          )}
        />
        <Input
          label="상세 주소*"
          placeholder="입력"
          {...register("address2", {
            required: "상세 주소는 필수 입력 항목입니다.",
          })}
          isError={!!errors.address2}
          errorText={errors.address2?.message}
        />
        {/* 기본 시급 필드 */}
        <div className="col-span-1">
          <Input
            label="기본 시급*"
            placeholder="입력"
            type="number" // 숫자만 입력 가능하도록
            suffix={"원"}
            {...register("wage", {
              required: "기본 시급은 필수 입력 항목입니다.",
              valueAsNumber: true,
              min: { value: 1, message: "유효한 금액을 입력해주세요." },
            })}
            isError={!!errors.wage}
            errorText={errors.wage?.message}
          />
        </div>

        {/* 데스크탑에서 왼쪽 컬럼에 이미지 업로더 */}
        {/* 빈 셀을 채우기 위한 placeholder - 모바일에선 hidden */}
        <div className="hidden lg:block"></div>
        <div className="col-span-1">
          <ImageUploader
            register={register}
            previewImg={previewImg || undefined}
          />
        </div>

        <div className="col-span-1 lg:col-span-2">
          <label
            htmlFor="description"
            className="text-black text-normal/[26px] mb-2 block"
          >
            가게 설명
          </label>
          <textarea
            id="description"
            className="w-full h-[153px] border border-gray-30 rounded-md px-5 py-4 mt-2 text-normal/[26px] font-normal focus:outline-primary"
            placeholder="입력"
            {...register("description")}
          />
        </div>
        <div className="flex justify-center col-span-1 lg:col-span-2">
          <Button disabled={isSubmitting || isLoading} type="submit">
            {" "}
            {/* isSubmitting은 훅의 로딩 상태와 통합될 수 있음 */}
            {isSubmitting || isLoading ? "저장 중..." : "저장하기"}
          </Button>
        </div>
      </form>
      {isEdited && <AlertModal type="edit" onClose={handleCloseModal} />}
    </>
  );
}
