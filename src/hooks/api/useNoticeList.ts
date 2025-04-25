
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { GetNoticeListResponse, GetShopNoticesResponse, NoticeFormData } from '@/types/api/notice'
import { GetListQuery, GetShopNoticesQuery } from '@/types/common'
import requestor from '@/lib/axios';
import { NoticeDetail } from '@/types/api/shop';


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

// 공고 목록 조회 아래와 같은 방식
  // const { data, isLoading, isError, error } = useNoticeList(query)

export const useShopsNoticeList = (shop_id:string ,query:GetListQuery ) => { // 가게의 공고 목록 조회
  return useQuery<GetShopNoticesResponse>({  
    queryKey: ['shop-notices', shop_id, query],
    queryFn: async () => {
      const res = await requestor.get<GetShopNoticesResponse>(`/shops/${shop_id}/notices`, {
            params: query,
          });
          console.log(res.data);
        return res.data;
    },
    placeholderData: (prev) => prev, 
  })
}

// 가게의 공고 목록 조회 아래와 같은 방식
// const { data, isLoading, isError, error } = useShopsNoticeList(shop_id,query)

export const usePostShopsNoticeList = () => {
  const mutation = useMutation<GetShopNoticesResponse, Error, { shop_id: string; body: NoticeFormData }>({ // 가게 공고 등록
    mutationFn: async ({ shop_id, body }) => {
      const res = await requestor.post<GetShopNoticesResponse>(
        `/shops/${shop_id}/notices`, body
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

// 가게 공고 등록 아래와 같은 방식
// const { mutate, isError, error, errorMessage } = usePostShopsNoticeList({
//   onSuccess: () => {
//     alert('등록 완료!');
//     등록성공시 행동
//   },
// });

// const handleSubmit = (e: React.FormEvent) => {
//   e.preventDefault();
//   mutate({
//     shop_id: '1234', 
//     body: form,
//   });
// };

export const useShopsNotice = (shop_id:string, notice_id:string) => { // 공고 목록 조회
  return useQuery<NoticeDetail>({
    queryKey: ['shop-notices-detail', shop_id, notice_id],
    queryFn: async () => {
      const res = await requestor.get<NoticeDetail>(`/shops/${shop_id}/notices/${notice_id}`);
      return res.data;
    },
    placeholderData: (prev) => prev,
  });
};

// 공고 목록 조회 아래와 같은 방식
  // const { data, isLoading, isError, error } = useShopsNotice(shop_id, notice_id)

export const useUpdateShop = () => {
  return useMutation<GetShopNoticesResponse, Error, { shopId: string; body: NoticeFormData }>({
    mutationFn: async ({ shopId, body }) => {
      const res = await requestor.put<GetShopNoticesResponse>(`/shops/${shopId}`, body);
      return res.data;
    },
  });
};
// 가게의 특정 공고 수정 아래와 같은 방식
// const { mutate, isError, error, errorMessage } = useUpdateShop({
//   onSuccess: () => {
//     alert('등록 완료!');
//     등록성공시 행동
//   },
// });

// const handleUpdate = (e: React.FormEvent) => {
//   e.preventDefault();
//   mutate({
//     shop_id: '1234', 
//     body: form,
//   });
// };
