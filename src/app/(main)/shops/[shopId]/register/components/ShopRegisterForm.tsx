"use client";

import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import SelectInput from "@/components/Input/SelectInput";
import AlertModal from "@/components/Modal/AlertModal";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import ImageUploader from "./ImageUploader";
import { category, Category } from "@/lib/constants/foodCategory";
import { address, AddressOptions } from "@/lib/constants/addressOptions";
import { useGetShop } from "@/hooks/api/useShopService";
import { useGetUser } from "@/hooks/api/useUserService";
import { useUploadImage } from "@/hooks/api/useImageUpload";

export interface MyStoreRegisterForm {
  name: string;
  category: Category | "";
  address1: AddressOptions | "";
  address2: string;
  description: string;
  image?: FileList;
  originalHourlyPay: number;
}

export interface ShopPayload extends Omit<MyStoreRegisterForm, "image"> {
  imageUrl?: string; // 업로드된 이미지 URL 또는 기존 URL
}

export default function ShopRegisterForm() {
  const params = useParams();
  const userId = params.shopId as string;
  const { data: userDataWrapper } = useGetUser(userId);
  const router = useRouter();
  const isEditMode = !!userDataWrapper?.item.shop;
  const { upload } = useUploadImage();
  let shopId: string;
  if (userDataWrapper?.item.shop) {
    shopId = userDataWrapper.item.shop.item.id;
  }

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<MyStoreRegisterForm>({
    mode: "onSubmit",
  });

  const [isRegistered, setIsRegistered] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
  const [existingImageUrl, setExistingImageUrl] = useState<string | undefined>(
    undefined
  );

  const { data: shopDataWrapper, isLoading: isLoadingShop } = useGetShop(
    shopId,
    isEditMode
  );

  useEffect(() => {
    if (isEditMode && shopDataWrapper?.item) {
      const {
        name,
        address1,
        address2,
        category,
        description,
        imageUrl, // 서버의 이미지 URL
        originalHourlyPay,
      } = shopDataWrapper.item;

      reset({
        // image 필드는 reset에서 제외하거나, FileList가 아니므로 다른 방식으로 처리
        name,
        address1: address1 as AddressOptions, // 타입 단언 또는 데이터 변환 필요
        address2,
        category: category as Category, // 타입 단언 또는 데이터 변환 필요
        description,
        originalHourlyPay,
        // image: undefined, // FileList가 아니므로 초기화 시 FileList를 넣지 않음
      });
      if (imageUrl) {
        setPreviewUrl(imageUrl); // 기존 이미지를 프리뷰로 설정
        setExistingImageUrl(imageUrl); // 기존 이미지 URL 저장
      }
    }
  }, [isEditMode, shopDataWrapper, reset]);

  const watchedImage = watch("image"); // FileList | undefined
  useEffect(() => {
    if (watchedImage && watchedImage.length > 0) {
      const file = watchedImage[0];
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      // 메모리 누수 방지를 위해 cleanup 함수 사용
      return () => URL.revokeObjectURL(objectUrl);
    } else if (!isEditMode || !existingImageUrl) {
      // 수정 모드가 아니거나, 수정 모드인데 기존 이미지가 없었고, 새 파일도 선택 안 한 경우
      // 또는 이미지 선택 취소 시 (watchedImage가 undefined/empty가 될 때)
      // setPreviewUrl(undefined); // 이 부분은 이미지 삭제 기능 추가 시 고려
    }
  }, [watchedImage, isEditMode, existingImageUrl]);

  const onSubmit: SubmitHandler<MyStoreRegisterForm> = async (formData) => {
    const token = localStorage.getItem("token"); // 실제로는 Auth Context 등에서 관리
    let uploadedImageUrl: string | undefined = existingImageUrl; // 기본값은 기존 이미지 URL
    try {
      // 1. 새 이미지가 선택되었는지 확인
      if (formData.image && formData.image.length > 0) {
        const imageFile = formData.image[0];
        // 실제 이미지 업로드 로직 (예시: FormData 사용)

        const uploadedImageUrl = upload(imageFile);
        return uploadedImageUrl;
      }
      const payload: ShopPayload = {
        name: formData.name,
        category: formData.category,
        address1: formData.address1,
        address2: formData.address2,
        description: formData.description,
        originalHourlyPay: formData.originalHourlyPay,
        imageUrl: uploadedImageUrl, // 최종 이미지 URL
      };

      console.log("제출할 데이터:", payload);

      let responseData;
      if (isEditMode && shopId) {
        // 수정 로직 (PUT 요청)
        // responseData = await updateShopMutation.mutateAsync({ shopId, body: payload });
        const response = await fetch(
          `https://bootcamp-api.codeit.kr/api/0-1/the-julge/shops/${shopId}`, // shopId 사용
          {
            method: "PUT", // 수정은 PUT
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
          }
        );
        if (!response.ok) throw await response.json();
        responseData = await response.json();
      } else {
        // 등록 로직 (POST 요청)
        // responseData = await registerShopMutation.mutateAsync(payload);
        const response = await fetch(
          `https://bootcamp-api.codeit.kr/api/0-1/the-julge/shops`, // 등록 시에는 shopId 없음
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
          }
        );
        if (!response.ok) throw await response.json();
        responseData = await response.json();
      }
      setIsRegistered(true);
      console.log("서버 응답:", responseData);
    } catch (err: any) {
      console.error("폼 제출 오류:", err);
    }
  };

  const handleClose = () => {
    setIsRegistered(false);
    router.push(`/shops/${userId}`);
  };

  return (
    <>
      <form
        className="mt-[24px] flex flex-col gap-5 sm:mt-[32px] w-full sm:grid sm:grid-cols-2 sm:gap-x-5 sm:gap-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          label="가게 이름*"
          placeholder="입력"
          {...register("name", { required: "가게 이름을 입력해주세요." })}
          isError={!!errors.name}
          errorText={errors.name?.message}
        />
        <Controller
          name="category"
          control={control}
          rules={{ required: "분류를 선택해주세요." }}
          defaultValue=""
          render={({ field }) => (
            <SelectInput
              label="분류"
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
          rules={{ required: "주소를 선택해주세요." }}
          defaultValue=""
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
          {...register("address2", { required: "상세 주소를 입력해주세요." })}
        />
        <div className="col-span-1">
          <Input
            label="기본 시급*"
            placeholder="입력"
            suffix={"원"}
            {...register("originalHourlyPay", {
              required: "기본 시급을 입력해주세요.",
            })}
          />
        </div>
        <ImageUploader
          label="가게 이미지"
          name="image" // RHF 필드 이름
          onChange={(e) =>
            setValue("image", e.target.files, {
              shouldValidate: true,
              shouldDirty: true,
            })
          } // setValue로 파일 업데이트
          previewUrl={previewUrl}
          existingImageUrl={existingImageUrl}
          onClearImage={() => {
            // 이미지 제거 핸들러 (선택적)
            setValue("image", undefined, { shouldDirty: true });
            setPreviewUrl(isEditMode ? existingImageUrl : undefined); // 수정 모드면 기존 이미지로, 아니면 비움
          }}
        />
        <div className="col-span-2">
          <label htmlFor="description">가게 설명</label>
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
        <div className="flex justify-center col-span-2 pb-[60px]">
          <Button
            disabled={isSubmitting}
            className="w-full sm:max-w-[312px] whitespace-nowrap"
          >
            {isSubmitting ? "로딩 중..." : "등록하기"}
          </Button>
        </div>
      </form>
      {isRegistered && <AlertModal type="register" onClose={handleClose} />}
    </>
  );
}
