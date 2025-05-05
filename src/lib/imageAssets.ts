
/** 허용된 외부 이미지 도메인 (next.config.ts, 클라이언트 공통 사용) */
export const allowedImageDomains = [
  "bootcamp-project-api.s3.ap-northeast-2.amazonaws.com",
  "encrypted-tbn0.gstatic.com",
  "images.unsplash.com",
  "cdn.pixabay.com",
];

/** 허용된 이미지 확장자 (정규식 검사용) */
export const imageExtensionRegex = /\.(jpe?g|png|webp|gif)$/i;

/** fallback 이미지 경로 */
export const fallbackImage = "/assets/images/placeholder.png";
export const blurDataImage = "/assets/images/blur-placeholder.jpg";