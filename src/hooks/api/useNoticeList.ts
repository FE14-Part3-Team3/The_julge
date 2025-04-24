
import { useQuery } from '@tanstack/react-query'
import { GetNoticeListResponse } from '@/types/api/notice'
import { getNoticeList } from '@/lib/services/noticeService'
import { GetShopNoticesQuery } from '@/types/common'

export const useNoticeList = (query: GetShopNoticesQuery) => {
  return useQuery<GetNoticeListResponse>({  // await requestor.get 에도 타입을 지정했지만 각각 따로 타입을 줘야 정확한 타입 추론이 가능하다
    queryKey: ['notices', query],  // queryKey를 기준으로 요청 결과를 저장, 재사용
    queryFn: () => getNoticeList(query),
    placeholderData: (prev) => prev,  // 데이터 로딩할때 화면 깜빡임 줄여줌 (이전 데이터 잠시 유지)
  })
}
