import { NoticesPaginatedResponse, PaginatedResponse, Wrapper } from "../common"
import { UserApplication } from "./application";
import { ShopInfo } from "./shop"


export interface NoticeItem {
  id: string
  hourlyPay: number
  startsAt: string
  workhour: number
  description: string
  closed: boolean
  shop: {
    item: ShopInfo
    href: string
  }
  currentUserApplication?: {
    item: UserApplication[]
  }
}

export interface Notice {
  id: string
  hourlyPay: number
  description: string
  startsAt: string
  workhour: number
  closed: boolean
}

export type NoticeWrapper = {
  item: Notice
  href: string
};

export interface NoticeFormData {    // 가게 공고 등록, 가게의 특정 공고 수정 Request body
  hourlyPay: number
  startsAt: string
  workhour: number
  description: string
}

export type ItemWrapper = Wrapper<NoticeItem>  // 가게 공고 등록 , 가게의 특정 공고 조회, 가게의 특정 공고 수정 Responses


export type GetNoticeListResponse = NoticesPaginatedResponse<ItemWrapper> 

export type GetShopNoticesResponse = PaginatedResponse<ItemWrapper> // 가게의 공고 목록 조회
