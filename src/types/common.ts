
// 타입정의가 ... 너무 많은가? ... 이 부분이 필요한가?
// 상속이 너무 많아서 오히려 헷갈림
// 사용하게되면 아래 vscode 개요를 참고하시면 빠릅니다.
// Wrapper ,  Response, Request 네이밍 참고하시면 활용 빠름

export interface Link {
  rel: string
  description: string
  method: string
  href: string
}
// 사용자 정보
export type UserType = 'employer' | 'employee'

export const sortOptions = ["time", "pay", "hour", "shop"] as const;
export type SortOption = typeof sortOptions[number];   

//  ??  이부분... 줄일 수 있는 방법? 그냥 string?
export interface ApplicationStatus {status: 'pending' | 'accepted' | 'rejected' | 'canceled'}  //  가게 공고 상세 버튼에 사용됨   // 유저, 공고상태등 구분
export interface ApplicationRequest {status: 'accepted' | 'rejected' | 'canceled' }

// 알림 결과 상태
export interface NotificationResult {status: 'accepted' | 'rejected'}

export interface PaginatedResponse<T> {      // <T> 제네릭타입을 활용해서 변수적인 부분 기입
  offset: number
  limit: number
  count: number
  hasNext: boolean
  items: T[]
  links: Link[]
}

export interface NoticesPaginatedResponse<T> {      
  offset: number
  limit: number
	count: number // 전체 개수
	hasNext: boolean // 다음 내용 존재 여부
  address?: string[]
	keyword?: string // optional,
  startsAtGte?: string 
  hourlyPayGte?: number
  sort?: SortOption
  items?: T[]
  links?: Link[]
}

export interface Wrapper<T> {
  item: T
  links?: Link[]
  href?: string
}

// Query 타입 정의 
export interface GetShopNoticesQuery {  // 공고 리스트 쿼리
  offset?: number
  limit?: number
  address?: SeoulDistrict[]
  keyword?: string
  startsAtGte?: string 
  hourlyPayGte?: number
  sort?: SortOption
}

export interface GetListQuery { // 가게의 공고 목록 조회  , 유저의 알림 목록 조회 , 가게의 특정 공고의 지원 목록 조회, 유저의 지원 목록
  offset?: number // 조회 시작 기준
  limit?: number  // 조회 개수
}

export const seoulDistricts = [
  '서울시 종로구',
  '서울시 중구',
  '서울시 용산구',
  '서울시 성동구',
  '서울시 광진구',
  '서울시 동대문구',
  '서울시 중랑구',
  '서울시 성북구',
  '서울시 강북구',
  '서울시 도봉구',
  '서울시 노원구',
  '서울시 은평구',
  '서울시 서대문구',
  '서울시 마포구',
  '서울시 양천구',
  '서울시 강서구',
  '서울시 구로구',
  '서울시 금천구',
  '서울시 영등포구',
  '서울시 동작구',
  '서울시 관악구',
  '서울시 서초구',
  '서울시 강남구',
  '서울시 송파구',
  '서울시 강동구' ] as const;
export type SeoulDistrict = typeof seoulDistricts[number]

export const shopCategories = [
  '한식',
  '중식',
  '일식',
  '양식',
  '분식',
  '카페',
  '편의점',
  '기타',
] as const;
export type ShopCategory = typeof shopCategories[number];