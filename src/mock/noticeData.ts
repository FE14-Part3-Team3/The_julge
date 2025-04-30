import { Notice } from "@/components/Notice/NoticeList";

// 확장된 Notice 타입
export interface ExtendedNotice extends Notice {
  userId?: string; // 공고를 등록한 사용자 ID
}

// 임시 시작 날짜 생성 함수 (오늘부터 30일 이내 랜덤 날짜)
const getRandomStartDate = (): string => {
  const today = new Date();
  const randomDays = Math.floor(Math.random() * 30);
  const randomDate = new Date(today);
  randomDate.setDate(today.getDate() + randomDays);
  return randomDate.toISOString();
};

// 무작위 시급 생성 (9,000원 ~ 15,000원)
const getRandomHourlyPay = (): number => {
  return Math.floor(Math.random() * 6000) + 9000;
};

// 무작위 근무시간 생성 (3시간 ~ 8시간)
const getRandomWorkHour = (): number => {
  return Math.floor(Math.random() * 6) + 3;
};

// 공고 설명 목록
const noticeDescriptions = [
  "주방 보조 알바 구합니다",
  "홀 서빙 직원 모집합니다",
  "주말 오전 아르바이트 구함",
  "평일 저녁 픽업 담당자 구함",
  "오픈 직원 모집",
  "마감 직원 모집",
  "설거지 알바생 구합니다",
  "카운터 직원 구함",
  "배달 담당자 구함",
  "포장 담당 알바 구함",
];

// 무작위 설명 가져오기
const getRandomDescription = (): string => {
  const randomIndex = Math.floor(Math.random() * noticeDescriptions.length);
  return noticeDescriptions[randomIndex];
};

// 30개의 공고 데이터 생성
export const mockNotices: ExtendedNotice[] = Array.from(
  { length: 30 },
  (_, index) => ({
    id: `notice-${index + 1}`,
    hourlyPay: getRandomHourlyPay(),
    startsAt: getRandomStartDate(),
    workhour: getRandomWorkHour(),
    description: getRandomDescription(),
    closed: Math.random() > 0.8, // 약 20%의 확률로 마감됨
    userId: "current-user-id", // 현재 사용자 ID
  })
);
