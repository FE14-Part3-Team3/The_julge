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

export interface MyStoreRegisterForm {
  name: string;
  category: Category | "";
  address1: AddressOptions | "";
  address2: string;
  description: string;
  image: FileList;
  wage: number;
}

export default function ShopRegisterForm() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<MyStoreRegisterForm>({
    mode: "onSubmit",
  });
  const [isRegistered, setIsRegistered] = useState(false);
  const router = useRouter();
  const { shopId } = useParams();
  const [previewImg, setPreviewImg] = useState("");

  useEffect(() => {
    const selectedFile = watch("image");
    if (selectedFile && selectedFile.length > 0) {
      setPreviewImg(URL.createObjectURL(selectedFile[0]));
    }
  }, [watch("image")]);

  const onSubmit: SubmitHandler<MyStoreRegisterForm> = async (data) => {
    const token = localStorage.getItem("token");
    try {
      //1.이미지 업로드 선행해서 반환받은 url로 데이터 세팅 다시 하기
      const response = await fetch(
        `https://bootcamp-api.codeit.kr/api/0-1/the-julge/shops`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, //토큰 첨부해서 보내기
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw await response.json();
      }

      setIsRegistered(true); //
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleClose = () => {
    setIsRegistered(false);
    router.push(`/shops/${shopId}`);
  };

  return (
    <>
      <form
        className="mt-[32px] w-full grid grid-cols-2 gap-x-5 gap-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input label="가게 이름*" placeholder="입력" {...register("name")} />
        <Controller
          name="category"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <SelectInput
              label="분류"
              value={field.value}
              placeholder="선택"
              onChange={field.onChange}
              options={category}
              width="w-full"
            />
          )}
        />
        <Controller
          name="address1"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <SelectInput
              label="주소*"
              placeholder="선택"
              value={field.value}
              onChange={field.onChange}
              options={address}
              width="w-full"
            />
          )}
        />
        <Input
          label="상세 주소*"
          placeholder="입력"
          {...register("address2")}
        />
        <div className="col-span-1">
          <Input
            label="기본 시급*"
            placeholder="입력"
            suffix={"원"}
            {...register("wage")}
          />
        </div>
        <ImageUploader register={register} previewImg={previewImg} />
        <div className="col-span-2">
          <label htmlFor="description">가게 설명</label>
          <textarea
            className="w-full h-[153px] border border-gray-30 rounded-md px-5 py-4 mt-2 text-normal/[26px] font-normal "
            placeholder="입력"
          />
        </div>
        <div className="flex justify-center col-span-2">
          <Button disabled={isSubmitting}>
            {isSubmitting ? "로딩 중..." : "등록하기"}
          </Button>
        </div>
      </form>
      {isRegistered && <AlertModal type="register" onClose={handleClose} />}
    </>
  );
}
