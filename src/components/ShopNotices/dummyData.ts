import { ExtendedNotice } from "@/types/ShopTypes";

// 테스트 모드 타입 정의
export type TestMode = "normal" | "empty" | "random";

// 상수 정의
export const TEST_MODE_CONFIG = {
  CURRENT_MODE: "random" as TestMode,
  ITEMS_PER_PAGE: 6,
  RANDOM_DATA_COUNT: 100,
};

// 공고 설명을 위한 배열
const descriptions = [
  "오전 주방 알바 구합니다",
  "야간 서빙 알바 구합니다",
  "점심시간 홀 서빙 알바 구합니다",
  "주말 저녁 주방보조 알바 급구",
  "설거지 알바 구합니다",
  "주말 아침 주방 알바 구합니다",
  "평일 오후 카운터 알바 구합니다",
  "야간 주방 보조 알바 급구",
  "주말 전일 서빙 알바 구합니다",
  "오후 배달 알바 구합니다",
  "평일 점심시간 홀 알바 구합니다",
  "저녁 마감 알바 구합니다",
  "주방 보조 알바 구합니다",
  "아침 오픈 알바 구합니다",
  "주말 저녁 홀 알바 구합니다",
  "평일 오전 주방 알바 구합니다",
  "카페 바리스타 알바 구합니다",
  "설거지 파트타임 구합니다",
  "야간 마감 알바 구합니다",
  "주말 주방 알바 급구",
];

// 시급 범위
const hourlyPays = [
  11000, 11500, 12000, 12500, 13000, 13500, 14000, 14500, 15000, 15500,
];

// 근무 시간 범위
const workhours = [3, 4, 5, 6, 7, 8];

// 날짜 생성 함수
const generateRandomDate = (): string => {
  const startDate = new Date("2025-01-01");
  const endDate = new Date("2025-12-31");
  const randomTime =
    startDate.getTime() +
    Math.random() * (endDate.getTime() - startDate.getTime());
  const randomDate = new Date(randomTime);

  // 시간을 6~22시 사이로 설정
  const hour = Math.floor(Math.random() * 17) + 6; // 6~22시
  randomDate.setHours(hour, 0, 0, 0);

  return randomDate.toISOString();
};

// 기본 5개의 고정된 더미 데이터
export const defaultDummyNotices = (shopId: string): ExtendedNotice[] => [
  {
    id: "notice-test-1",
    hourlyPay: 12000,
    startsAt: "2025-04-30T09:00:00Z",
    workhour: 6,
    description: "오전 주방 알바 구합니다",
    closed: false,
    shopId: shopId,
  },
  {
    id: "notice-test-2",
    hourlyPay: 13000,
    startsAt: "2025-05-01T18:00:00Z",
    workhour: 5,
    description: "야간 서빙 알바 구합니다",
    closed: false,
    shopId: shopId,
  },
  {
    id: "notice-test-3",
    hourlyPay: 11500,
    startsAt: "2025-05-02T12:00:00Z",
    workhour: 4,
    description: "점심시간 홀 서빙 알바 구합니다",
    closed: false,
    shopId: shopId,
  },
  {
    id: "notice-test-4",
    hourlyPay: 14000,
    startsAt: "2025-05-03T17:00:00Z",
    workhour: 8,
    description: "주말 저녁 주방보조 알바 급구",
    closed: false,
    shopId: shopId,
  },
  {
    id: "notice-test-5",
    hourlyPay: 15000,
    startsAt: "2025-05-04T08:00:00Z",
    workhour: 7,
    description: "아침 오픈 알바 구합니다",
    closed: true,
    shopId: shopId,
  },
];

// 랜덤 공고 데이터 생성 함수
export function generateDummyNotices(
  shopId: string,
  count: number = 10
): ExtendedNotice[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `notice-${i + 1}`,
    shopId,
    hourlyPay: Math.floor(Math.random() * 10000) + 9000, // 9000원 ~ 19000원
    startsAt: new Date(
      Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
    ).toISOString(), // 현재부터 30일 내
    description: `더미 공고 ${i + 1}: ${
      Math.random() > 0.5 ? "홀 서빙" : "주방 보조"
    } 구합니다`,
    workhour: Math.floor(Math.random() * 8) + 3, // 3 ~ 10시간
    closed: Math.random() > 0.9, // 약 10%의 확률로 마감
    // 추가 필요한 필드가 있다면 여기에 정의
  }));
}
