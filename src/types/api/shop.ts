import { SeoulDistrict, ShopCategory, Wrapper } from "../common"
import { UserWrapper } from "./user"

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

export interface CreateShopRequest {   // 가게 등록, 가게 정보 수정 Request
  name: string
  category: ShopCategory
  address1: SeoulDistrict
  address2: string
  description: string
  imageUrl: string
  originalHourlyPay: number
}

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
export type CreateShopResponse = Wrapper<ShopResponse> //  가게 등록, 가게 정보 수정,가게 정보 조회 Responses
