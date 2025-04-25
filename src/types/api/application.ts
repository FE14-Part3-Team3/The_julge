// types/api/application.ts

import { ApplicationStatus, PaginatedResponse, Wrapper } from '@/types/common'
import { UserWrapper } from './user'
import { NoticeWrapper } from './notice'
import { ShopInfo } from './shop';


export type ShopWrapper = Wrapper<ShopInfo>;

// 개별 지원서 항목
export interface Application {
  id: string
  status: ApplicationStatus
  createdAt: string
  user: UserWrapper
  shop: ShopWrapper
  notice: NoticeWrapper
}

// 유저의 개별 지원 항목
export interface UserApplication {
  id: string
  status: ApplicationStatus
  createdAt: string
  shop: ShopWrapper
  notice: NoticeWrapper
}

export type ApplicationItemWrapper = Wrapper<Application>
export type UserApplicationWrapper = Wrapper<UserApplication>
export type UpdateApplicationResponse = Wrapper<Application>  //  가게의 특정 공고 지원 승인, 거절 또는 취소

export type GetUserApplicationsResponse = PaginatedResponse<UserApplicationWrapper> // 가게의 특정 공고의 지원 목록 조회,
export type GetApplicationsResponse = PaginatedResponse<ApplicationItemWrapper>  // 유저의 지원 목록