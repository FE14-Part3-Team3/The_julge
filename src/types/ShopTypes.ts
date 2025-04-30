/**
 * 가게 및 공고 관련 데이터 타입 정의
 */

/**
 * 가게 정보 인터페이스
 */
export interface Shop {
  id: string;
  name: string;
  category: string;
  address1: string;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
  location: string;
  userId: string;
}

/**
 * 공고 정보 인터페이스 (확장된 형태)
 */
export interface ExtendedNotice {
  id: string;
  hourlyPay: number;
  startsAt: string;
  description: string;
  workhour: number;
  closed: boolean;
  userId?: string;
  shopId?: string;
}
