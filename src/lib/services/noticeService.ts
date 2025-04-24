// services/messageService.ts
import { GetNoticeListResponse} from '@/types/api/notice'
import requestor from '../axios'
import { GetShopNoticesQuery } from '@/types/common';

export const getNoticeList = async (query: GetShopNoticesQuery) => {
  const res = await requestor.get<GetNoticeListResponse>('/notices', {
    params: query,
  })
  console.log(res.data);
  return res.data;
}

export const getShopsNoticeList = async (query: GetShopNoticesQuery) => {
  const res = await requestor.get<GetNoticeListResponse>('/notices', {
    params: query,
  })
  console.log(res.data);
  return res.data;
}

