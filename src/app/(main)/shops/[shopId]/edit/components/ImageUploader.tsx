import Image from "next/image";
import { UseFormRegister } from "react-hook-form";
import { ShopEditFormData } from "./ShopEditForm"; // 수정된 폼 데이터 타입 임포트

interface ImageUploaderProps {
  register: UseFormRegister<ShopEditFormData>;
  previewImg?: string; // previewImg는 문자열 URL을 받도록 유지
}

export default function ImageUploader({
  register,
  previewImg,
}: ImageUploaderProps) {
  return (
    // col-span-2는 모바일에서, lg:col-span-1는 데스크탑에서 적용 (ShopEditForm.tsx에서 관리)
    // 여기서는 내부 요소의 스타일과 구조만 정의
    <div className="flex flex-col col-span-2 lg:col-span-1">
      <h2 className="text-black text-normal/[26px] mb-2">가게 이미지</h2>
      <input
        type="file"
        accept="image/*"
        id="image-uploader" // id는 고유해야 함 (페이지 내에서)
        className="hidden"
        {...register("image")} // react-hook-form 등록
      />
      <label
        htmlFor="image-uploader"
        // w-full을 사용하여 부모의 col-span에 맞추고, max-w-[483px]로 최대 너비 제한
        // mx-auto sm:mx-0 는 page.tsx의 동적 CSS와 연계하여 반응형 중앙/좌측 정렬 처리
        className="relative w-full max-w-[483px] h-[276px] bg-gray-10 border border-gray-30 rounded-md cursor-pointer mx-auto sm:mx-0 flex items-center justify-center"
      >
        {previewImg ? (
          <Image
            src={previewImg}
            fill
            alt="가게 이미지 미리보기"
            className="object-cover rounded-md" // object-cover와 rounded-md 적용
          />
        ) : (
          <div className="flex flex-col gap-2 items-center justify-center w-full h-full">
            <Image
              alt="이미지 추가하기 아이콘"
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
