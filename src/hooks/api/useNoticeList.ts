
import { useQuery } from '@tanstack/react-query'
import { GetNoticeListResponse, GetShopNoticesResponse, NoticeFormData } from '@/types/api/notice'
import { getNoticeList, getShopsNoticeList, postShopsNoticeList } from '@/lib/services/noticeService'
import { GetListQuery, GetShopNoticesQuery } from '@/types/common'

export const useNoticeList = (query: GetShopNoticesQuery) => {  // 공고 조회

  return useQuery<GetNoticeListResponse>({  // await requestor.get 에도 타입을 지정했지만 각각 따로 타입을 줘야 정확한 타입 추론이 가능하다
    queryKey: ['notices', query],  // react-query 쓰면 queryKey를 기준으로 요청 결과를 저장, 재사용
    queryFn: () => getNoticeList(query),
    placeholderData: (prev) => prev,  // 데이터 로딩할때 화면 깜빡임 줄여줌 (이전 데이터 잠시 유지)
  })
}

export const useShopsNoticeList = (shop_id:string ,query:GetListQuery ) => { // 가게의 공고 목록 조회
  return useQuery<GetShopNoticesResponse>({  
    queryKey: ['shop-notices', shop_id, query],
    queryFn: () => getShopsNoticeList(shop_id, query),
    placeholderData: (prev) => prev, 
  })
}

export const usePostShopsNoticeList = (shop_id: string, body: NoticeFormData) => {
  return useQuery<GetShopNoticesResponse>({
    queryKey: ['shop-notices-post', shop_id, body],
    queryFn: () => postShopsNoticeList(shop_id, body),
    placeholderData: (prev) => prev,
  })
}