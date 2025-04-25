import { ApplicationStatus, Link, NotificationResult, PaginatedResponse, Wrapper } from "../common";
import { ShopWrapper } from "./application";
import { NoticeWrapper } from "./notice";

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

export type NotificationItemWrapper = Wrapper<Notification>
export type GetNotificationsResponse = PaginatedResponse<NotificationItemWrapper>  // 유저의 알림 목록 조회  Responses

export interface MarkNotificationsAsReadResponse {  // 알림 읽음 처리  Responses
  offset: number
  limit: number
  items: Wrapper<Notification>[]
}