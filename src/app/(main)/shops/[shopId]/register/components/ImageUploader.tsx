// import Image from "next/image";

// interface ImageUploaderProps {
//   previewImg?: string;
// }

// export default function ImageUploader({
//   previewImg,
//   ...register
// }: ImageUploaderProps) {
//   return (
//     <div className="col-span-2 flex flex-col w-full sm:max-w-[483px] aspect-[3.2/2]">
//       <h2 className="text-black text-normal/[26px] mb-2">가게 이미지</h2>
//       <input
//         type="file"
//         accept="image/*"
//         id="image-uploader"
//         className="hidden"
//         {...register}
//       />
//       <label
//         htmlFor="image-uploader"
//         className="relative w-full aspect-[3.2/2] sm:max-w-[483px] bg-gray-10 border border-gray-30 rounded-md cursor-pointer"
//       >
//         {previewImg ? (
//           <Image
//             src={previewImg}
//             fill
//             alt="프리뷰 이미지"
//             className="object-center object-cover "
//           />
//         ) : (
//           <div className="flex flex-col gap-2 items-center justify-center w-full h-full">
//             <Image
//               alt="이미지 업로드"
//               src="/assets/images/camera.svg"
//               width={32}
//               height={27}
//               priority
//             />
//             <p className="text-gray-40 text-normal/[26px]">이미지 추가하기</p>
//           </div>
//         )}
//       </label>
//     </div>
//   );
// }
import Image from "next/image";
import React from "react"; // React 추가

interface ImageUploaderProps {
  label: string;
  name: string; // react-hook-form 필드 이름
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // 파일 변경 핸들러
  previewUrl?: string; // 외부에서 관리되는 프리뷰 URL
  existingImageUrl?: string; // 수정 시 기존 이미지 URL (삭제 로직 등에 활용 가능)
  onClearImage?: () => void; // 이미지 선택 해제/삭제 핸들러 (선택적)
  error?: string; // 에러 메시지 (선택적)
}

export default function ImageUploader({
  label,
  name,
  onChange,
  previewUrl,
  // existingImageUrl, // 필요에 따라 사용
  // onClearImage, // 필요에 따라 사용
  error,
}: ImageUploaderProps) {
  return (
    <div className="col-span-2 flex flex-col w-full sm:max-w-[483px]">
      <h2 className="text-black text-base font-medium mb-2">{label}</h2>
      <div className="aspect-[3.2/2] w-full">
        {" "}
        {/* 이미지 영역 크기 고정 */}
        <input
          type="file"
          accept="image/*"
          id={name} // id를 name으로 설정 (label htmlFor와 매칭)
          name={name} // name 속성 추가
          className="hidden"
          onChange={onChange} // 부모에서 전달받은 onChange 핸들러 사용
        />
        <label
          htmlFor={name} // id와 매칭
          className={`relative w-full h-full flex items-center justify-center bg-gray-100 border ${
            error ? "border-red-500" : "border-gray-300"
          } rounded-md cursor-pointer overflow-hidden group`} // overflow-hidden 추가
        >
          {previewUrl ? (
            <Image
              src={previewUrl} // 외부에서 전달받은 previewUrl 사용
              fill
              alt="가게 이미지 프리뷰"
              className="object-cover object-center" // object-cover로 이미지 채우기
              sizes="(max-width: 640px) 100vw, 483px" // sizes 속성 추가 (Next/Image 최적화)
              priority={!!previewUrl} // 이미지가 있을 때 우선 로드
            />
          ) : (
            <div className="flex flex-col gap-2 items-center justify-center text-center p-4">
              <Image
                alt="이미지 업로드 아이콘"
                src="/assets/images/camera.svg" // 실제 경로 확인
                width={32}
                height={27}
                priority
              />
              <p className="text-gray-500 text-sm sm:text-base">
                클릭하여 이미지 추가
              </p>
            </div>
          )}
          {/* 이미지 위에 호버 시 보이는 "변경" 텍스트 (선택적 UI 개선) */}
          {previewUrl && (
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-white text-lg font-semibold">
                이미지 변경
              </span>
            </div>
          )}
        </label>
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
