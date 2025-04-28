import { Link, PaginatedResponse, Wrapper } from "../common";
import { NoticeWrapper } from "./notice";
import { ShopWrapper } from "./shop";

export interface ApplicationSummary {
  id: string
  status: 'pending' | 'accepted' | 'rejected' 
}

export interface ApplicationWrapper {
  item: ApplicationSummary
  href: string
}

export interface Notification {
  id: string
  createdAt: string
  result: 'accepted' | 'rejected'
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
  item: Wrapper<Notification>[]
}