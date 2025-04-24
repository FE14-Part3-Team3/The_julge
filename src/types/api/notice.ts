import { Link } from "../common"
import { ShopInfo } from "./shop"


// 공고리스트 타입 정의 
export interface NoticeItem {  // 공고 조회 > items /  가게 공고 등록 Response  / 공고 수정 Response
  id: string
  hourlyPay: number
  startsAt: string // RFC3339 시간
  workhour: number
  description: string
  closed: boolean
  shop: {
    item: ShopInfo
    href: string
  }
}
export interface ItemWrapper {
  item: NoticeItem // NOtice 아이템 타입받아옴
  links: Link[]
}

// Notice 정보 (간략한 구조)
export interface Notice {
  id: string
  hourlyPay: number
  description: string
  startsAt: string
  workhour: number
  closed: boolean
}
export interface NoticeWrapper {
  item: Notice
  href: string
}

// Response
export interface GetNoticeListResponse {   //공고 > 공고 조회
  offset: number
  limit: number
  count: number // 전체 개수
  hasNext: boolean // 다음 페이지 여부
  address: string[]
  keyword?: string
  items: ItemWrapper [] // NOticeWrapper 아이템 타입받아옴
  links: Link[]
}

export interface GetShopNoticesResponse {  //공고 > 가게의 공고 목록 조회
  offset: number
  limit: number
  count: number         // 전체 개수
  hasNext: boolean      // 다음 페이지 존재 여부
  items: ItemWrapper []
  links: Link[]       
}


// Request 
export interface NoticeFormData {    // 공고 수정, 공고 조회 샵 정보
  hourlyPay: number
  startsAt: string // 예: "2023-12-23T00:00:00Z" (RFC3339 형식)
  workhour: number
  description: string
}

