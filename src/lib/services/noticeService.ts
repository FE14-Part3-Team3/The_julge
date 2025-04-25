// services/messageService.ts
import { GetNoticeListResponse, GetShopNoticesResponse, NoticeFormData} from '@/types/api/notice'
import requestor from '../axios'
import { GetListQuery, GetShopNoticesQuery } from '@/types/common';

export const getNoticeList = async (query: GetShopNoticesQuery) => {  // 공고 조회
  const res = await requestor.get<GetNoticeListResponse>('/notices', {
    params: query,
  })
  console.log(res.data);
  return res.data;
}

export const getShopsNoticeList = async (shop_id:string ,query:GetListQuery ) => { // 가게의 공고 목록 조회
  const res = await requestor.get<GetShopNoticesResponse>(`/shops/${shop_id}/notices`, {
    params: query,
  })
  console.log(res.data);
  return res.data;
}

export const postShopsNoticeList = async (shop_id: string, body: NoticeFormData) => { // 가게의 공고 목록 등록
  const res = await requestor.post<GetShopNoticesResponse>(
    `/shops/${shop_id}/notices`,body
  )
  console.log(res.data)
  return res.data
}