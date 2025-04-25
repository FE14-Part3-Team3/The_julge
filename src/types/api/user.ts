import { ApplicationStatus, Link, NotificationResult, SeoulDistrict, UserType } from "../common"
import { NoticeWrapper } from "./notice"
import { ShopWrapper } from "./shop"

// 로그인 요청
export interface LoginRequest {
  email: string
  password: string
}

export interface User {  
  id: string
  email: string
  type: UserType
  name?: string
  phone?: string
  address?: string
  bio?: string
}

export interface UserWrapper { 
  item: User
  href: string
}

// 내 정보 응답 구조
export interface UserDetail { // 내 정보 조회 > item
  id: string
  email: string
  type: UserType
  name?: string
  phone?: string
  address?: string
  bio?: string
  shop?: ShopWrapper | null
}

// Response
// 회원가입 응답
export interface SignupResponse {
  item: {
    id: string
    email: string
    type: UserType
  }
  links: Link[]
}

// 로그인 응답
export interface LoginResponse {
  item: {
    token: string
    user: UserWrapper
  }
  links: Link[]
}

export interface GetUserResponse {  // 내 정보 조회
  item: UserDetail
  links: Link[]
}

// Request 
// 회원가입 요청
export interface SignupRequest {
  email: string
  password: string
  type: UserType
}

// 회원수정  
export interface UpdateUserProfileRequest {
  name: string
  phone: string
  address: SeoulDistrict
  bio: string
}

// 개별 알림 항목
export interface ApplicationSummary {
  id: string
  status: ApplicationStatus
}

export interface ApplicationWrapper {
  item: ApplicationSummary
  href: string
}

export interface Notification {  
  id: string
  createdAt: string
  result: NotificationResult
  read: boolean
  application: ApplicationWrapper
  shop: ShopWrapper
  notice: NoticeWrapper
  links: Link[]
}

export interface NotificationItemWrapper {
  item: Notification
  links: Link[]
}

export interface GetNotificationsResponse {
  offset: number
  limit: number
  count: number
  hasNext: boolean
  items: NotificationItemWrapper[]
  links: Link[]
}

export interface GetNotificationsResponse {  // 알림 읽음 처리
  offset: number
  limit: number
  items: {
    item: Notification
    links: Link[]
  }[]
}