// types/api/application.ts

import { ApplicationStatus, Link } from '@/types/common'
import { ShopWrapper } from '@/types/api/shop'
import { UserWrapper } from './auth'
import { Notice, NoticeWrapper } from './notice'



// 개별 지원서 항목
export interface Application {
  id: string
  status: ApplicationStatus
  createdAt: string
  user: UserWrapper
  shop: ShopWrapper
  notice: NoticeWrapper
}

export interface ApplicationItemWrapper {
  item: Application
  links: Link[]
}

// 전체 목록 응답
export interface GetApplicationsResponse {
  offset: number
  limit: number
  count: number
  hasNext: boolean
  items: ApplicationItemWrapper[]
  links: Link[]
}

