// types/api/application.ts

import { ApplicationStatus, Link } from '@/types/common'
import { ShopWrapper } from '@/types/api/shop'
import { UserWrapper } from './user'
import { NoticeWrapper } from './notice'

// 개별 지원서 항목
export interface Application {
  id: string
  status: ApplicationStatus
  createdAt: string
  user: UserWrapper
  shop: ShopWrapper
  notice: NoticeWrapper
}
// 가게의 특정 공고 지원 등록 Responses
export interface ApplicationItemWrapper {  
  item: Application
  links: Link[]
}

// 주인의 승인/거절 응답
export interface UpdateApplicationResponse {
  item: Application
  links: Link[]
}

// 유저의 개별 지원 항목
export interface UserApplication {
  id: string
  status: ApplicationStatus
  createdAt: string
  shop: ShopWrapper
  notice: NoticeWrapper
}

export interface UserApplicationWrapper {
  item: UserApplication
  links: Link[]
}

export interface GetUserApplicationsResponse {
  offset: number
  limit: number
  count: number
  hasNext: boolean
  items: UserApplicationWrapper[]
  links: Link[]
}

// 전체 목록 응답
export interface GetApplicationsResponse {  // 가게의 특정 공고의 지원 목록 조회,
  offset: number
  limit: number
  count: number
  hasNext: boolean
  items: ApplicationItemWrapper[]
  links: Link[]
}