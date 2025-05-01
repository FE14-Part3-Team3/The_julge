
import { useMutation, useQuery } from '@tanstack/react-query'
import { GetNoticeListResponse, GetShopNoticesResponse, ItemWrapper, NoticeFormData } from '@/types/api/notice'
import { GetListQuery, GetShopNoticesQuery } from '@/types/common'
import requestor from '@/lib/axios';
import { ParamValue } from 'next/dist/server/request/params';


export const useNoticeList = (query: GetShopNoticesQuery) => { // 공고 목록 조회
  return useQuery<GetNoticeListResponse>({
    queryKey: ['notices', query],
    queryFn: async () => {
      const res = await requestor.get<GetNoticeListResponse>('/notices', {
        params: query,
      });
      return res.data;
    },
    placeholderData: (prev) => prev,
  });
};

export const useShopsNoticeList = (shopId:string, query:GetListQuery ) => { // 가게의 공고 목록 조회
  return useQuery<GetShopNoticesResponse>({  
    queryKey: ['shop-notices', shopId, query],
    queryFn: async () => {
      const res = await requestor.get<GetShopNoticesResponse>(`/shops/${shopId}/notices`, {
            params: query,
          });
          console.log(res.data);
        return res.data;
    },
    placeholderData: (prev) => prev, 
  })
}

export const usePostShopsNoticeList = () => {
    const mutation = useMutation<GetShopNoticesResponse, Error, { shopId: ParamValue, body: NoticeFormData }>({ // 가게 공고 등록
    mutationFn: async ({ shopId, body }) => {
      const token = localStorage.getItem('token');   // localStorage.getItem('token')는 훅 안쪽에서 호출돼야 안전  
      const res = await requestor.post<GetShopNoticesResponse>(
        `/shops/${shopId}/notices`, body,
        {
          headers: {
            Authorization: `Bearer ${token}`,  // localStorage 토큰만 적용되있음
          },
        }
      );
      return res.data;
    },
    
  });

  const errorMessage =
    (mutation.error as any)?.response?.data?.message ||
    mutation.error?.message ||
    '';

  return {
    ...mutation,
    errorMessage,
  };
};


export const useShopsNotice = (shopId:ParamValue, noticeId:ParamValue) => { // 공고 목록 조회
  return useQuery<ItemWrapper>({
    queryKey: ['shop-notices-detail', shopId, noticeId],
    queryFn: async () => {
      const res = await requestor.get<ItemWrapper>(`/shops/${shopId}/notices/${noticeId}`);
      return res.data;
    },
    placeholderData: (prev) => prev,
  });
};


export const useUpdateShop = () => {
  const mutation = useMutation<GetShopNoticesResponse, Error, { shopId: string, noticeId: string, body: NoticeFormData }>({ // 가게 공고 수정
    mutationFn: async ({ shopId, noticeId, body }) => {
      const token = localStorage.getItem('token');   // localStorage.getItem('token')는 훅 안쪽에서 호출돼야 안전  
      const res =  await requestor.put<GetShopNoticesResponse>(`/shops/${shopId}/notices/${noticeId}`, body,
        {
          headers: {
            Authorization: `Bearer ${token}`,  // localStorage 토큰만 적용되있음
          },
        }
      );
      return res.data;
    },
  });

  const errorMessage =
    (mutation.error as any)?.response?.data?.message ||
    mutation.error?.message ||
    '';

  return {
    ...mutation,
    errorMessage,
  };
};
