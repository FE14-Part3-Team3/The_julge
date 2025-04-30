import Image from "next/image";
import { UseFormRegister } from "react-hook-form";
import { MyStoreRegisterForm } from "./ShopRegisterForm";

interface ImageUploaderProps {
  register: UseFormRegister<MyStoreRegisterForm>;
  previewImg?: string;
}

export default function ImageUploader({
  register,
  previewImg,
}: ImageUploaderProps) {
  return (
    <div className="col-span-2 flex flex-col">
      <h2 className="text-black text-normal/[26px] mb-2">가게 이미지</h2>
      <input
        type="file"
        accept="image/*"
        id="image-uploader"
        className="hidden"
        {...register("image")}
      />
      <label
        htmlFor="image-uploader"
        className="relative w-[483px] h-[276px] bg-gray-10 border border-gray-30 rounded-md cursor-pointer"
      >
        {previewImg ? (
          <Image
            src={previewImg}
            fill
            alt="프리뷰 이미지"
            className="object-center object-cover "
          />
        ) : (
          <div className="flex flex-col gap-2 items-center justify-center w-full h-full">
            <Image
              alt="이미지 업로드"
              src="/assets/images/camera.svg"
              width={32}
              height={27}
              priority
            />
            <p className="text-gray-40 text-normal/[26px]">이미지 추가하기</p>
          </div>
        )}
      </label>
    </div>
  );
}
