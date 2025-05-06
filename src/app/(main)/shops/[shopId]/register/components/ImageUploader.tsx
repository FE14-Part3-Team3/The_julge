import Image from "next/image";

interface ImageUploaderProps {
  previewImg?: string;
}

export default function ImageUploader({
  previewImg,
  ...register
}: ImageUploaderProps) {
  return (
    <div className="col-span-2 flex flex-col w-full sm:max-w-[483px] aspect-[3.2/2]">
      <h2 className="text-black text-normal/[26px] mb-2">가게 이미지</h2>
      <input
        type="file"
        accept="image/*"
        id="image-uploader"
        className="hidden"
        {...register}
      />
      <label
        htmlFor="image-uploader"
        className="relative w-full aspect-[3.2/2] sm:max-w-[483px] bg-gray-10 border border-gray-30 rounded-md cursor-pointer"
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
