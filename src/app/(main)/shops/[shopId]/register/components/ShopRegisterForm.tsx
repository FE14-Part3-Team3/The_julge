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

export interface MyStoreRegisterForm {
  name: string;
  category: Category | "";
  address1: AddressOptions | "";
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
  image?: FileList;
}

export default function ShopRegisterForm() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MyStoreRegisterForm>({
    mode: "onSubmit",
  });
  const [isRegistered, setIsRegistered] = useState(false);
  const router = useRouter();
  const { shopId } = useParams() as { shopId: string };
  const [previewImg, setPreviewImg] = useState("");
  const { data, isLoading } = useGetShop(shopId);

  useEffect(() => {
    if (data) {
      const {
        name,
        address1,
        address2,
        category,
        description,
        imageUrl,
        originalHourlyPay,
      } = data.item;
      reset({
        name,
        address1,
        address2,
        category,
        description,
        imageUrl,
        originalHourlyPay,
      });

      if (imageUrl) {
        setPreviewImg(imageUrl);
      }
    }
  }, [data, reset]);

  useEffect(() => {
    const imageFile = watch("image");
    if (imageFile && imageFile.length > 0) {
      const file = imageFile[0];
      setPreviewImg(URL.createObjectURL(file));
    }
  }, [watch("image")]);

  // 이미지 업로드 함수
  const uploadImage = async (file: File): Promise<string> => {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("로그인이 필요합니다");
    }

    try {
      console.log("이미지 업로드 시작 - 파일명:", file.name);

      // 1. Presigned URL 생성 요청 - 절대 경로 사용
      const presignedResponse = await fetch(
        "https://bootcamp-api.codeit.kr/api/0-1/the-julge/images",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name: file.name }),
        }
      );

      if (!presignedResponse.ok) {
        console.error("Presigned URL 생성 실패:", presignedResponse.status);
        throw new Error(
          `Presigned URL 생성에 실패했습니다 (${presignedResponse.status})`
        );
      }

      const presignedData = await presignedResponse.json();
      console.log("Presigned URL 응답:", presignedData);

      if (!presignedData?.item?.url) {
        throw new Error("Presigned URL을 찾을 수 없습니다.");
      }

      const presignedUrl = presignedData.item.url;
      console.log("Presigned URL:", presignedUrl);

      // 2. Presigned URL을 사용하여 이미지 업로드
      const uploadResponse = await fetch(presignedUrl, {
        method: "PUT",
        headers: {
          // Content-Type 헤더를 명시적으로 설정하지 않음
        },
        body: file,
      });

      if (!uploadResponse.ok) {
        console.error("이미지 업로드 실패:", uploadResponse.status);
        throw new Error(
          `이미지 업로드에 실패했습니다 (${uploadResponse.status})`
        );
      }

      // 3. 이미지 URL은 presignedUrl에서 쿼리 파라미터 제외
      const imageUrl = presignedUrl.split("?")[0];
      console.log("최종 이미지 URL:", imageUrl);
      return imageUrl;
    } catch (error) {
      console.error("이미지 업로드 오류:", error);
      throw error;
    }
  };

  const onSubmit: SubmitHandler<MyStoreRegisterForm> = async (formData) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      let imageUrl = formData.imageUrl;

      // 새 이미지가 있으면 업로드하고 URL 받아오기
      if (formData.image && formData.image.length > 0) {
        try {
          imageUrl = await uploadImage(formData.image[0]);
          console.log("업로드 성공, 이미지 URL:", imageUrl);
        } catch (imageError) {
          console.error("이미지 업로드 중 오류가 발생했습니다:", imageError);
          alert("이미지 업로드에 실패했습니다. 다시 시도해 주세요.");
          return; // 이미지 업로드 실패 시 폼 제출 중단
        }
      }

      // 최종 데이터 준비 (image 필드 제외)
      const shopData = {
        name: formData.name,
        category: formData.category,
        address1: formData.address1,
        address2: formData.address2,
        description: formData.description,
        imageUrl: imageUrl,
        originalHourlyPay: Number(formData.originalHourlyPay), // 숫자로 변환 확실히
      };

      console.log("가게 등록 데이터:", shopData);

      const response = await fetch(
        `https://bootcamp-api.codeit.kr/api/0-1/the-julge/shops`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(shopData),
        }
      );

      // 응답 결과 로깅
      console.log("가게 등록 응답 상태:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("가게 등록 오류:", response.status, errorText);

        try {
          // 텍스트가 JSON인 경우 파싱
          const errorJson = JSON.parse(errorText);
          alert(
            `가게 등록에 실패했습니다: ${errorJson.message || response.status}`
          );
        } catch {
          alert(`가게 등록에 실패했습니다: ${response.status}`);
        }
        return;
      }

      setIsRegistered(true);
    } catch (err: any) {
      console.error("가게 등록 중 예외 발생:", err);
      alert("가게 등록 중 오류가 발생했습니다.");
    }
  };

  const handleClose = () => {
    setIsRegistered(false);
    router.push(`/shops/${shopId}`);
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
        <ImageUploader {...register("image")} previewImg={previewImg} />
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
