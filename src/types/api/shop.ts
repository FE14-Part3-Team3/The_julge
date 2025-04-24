import { Link, SeoulDistrict, ShopCategory, UserType } from "../common"
import { UserWrapper } from "./auth"

// 가게 정보
export interface ShopInfo { // Shop인포
  id: string
  name: string
  category: string
  address1: string
  address2: string
  description: string
  imageUrl: string
  originalHourlyPay: number
}

// 가게 공고 정보
export interface ShopNoticesInfo { // ShopNotice  인포  closed 
  id: string
  hourlyPay: number
  startsAt: string // ISO 8601 / RFC3339 날짜 문자열
  workhour: number
  description: string
  closed: boolean
}

export interface ShopWrapper {
  item: ShopInfo,
  links: Link[]
}

// Response
export interface CreateShopResponse {
  item: ShopResponse
  links: Link[]
}

// 가게 응답 (등록 성공 시)
export interface ShopResponse {
  id: string
  name: string
  category: ShopCategory
  address1: SeoulDistrict
  address2: string
  description: string
  imageUrl: string
  originalHourlyPay: number
  user: UserWrapper
}

// Request
// 가게 등록 요청
export interface CreateShopRequest {
  name: string
  category: ShopCategory
  address1: SeoulDistrict
  address2: string
  description: string
  imageUrl: string
  originalHourlyPay: number
}