import requestor from "@/lib/axios";
import { CreateShopRequest, CreateShopResponse } from "@/types/api/shop";
import { useMutation, useQuery } from "@tanstack/react-query";

export const usePostShop = () => {
  const mutation = useMutation<CreateShopResponse, Error, { body: CreateShopRequest }>({ // 가게 등록
    mutationFn: async ({ body }) => {
      const token = localStorage.getItem('token');   // localStorage.getItem('token')는 훅 안쪽에서 호출돼야 안전  
      const res = await requestor.post<CreateShopResponse>(
        `/shops`, body,
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
// 가게 공고 등록 아래와 같은 방식
// const { mutate, isError, error, errorMessage } = usePostShop({
//   onSuccess: () => {
//     alert('등록 완료!');
//     등록성공시 행동
//   },
// });

// const handleSubmit = (e: React.FormEvent) => {
//   e.preventDefault();
//   mutate({
//     body: form,
//   });
// };


export const useGetShop = (shopId: string) => { // 가게 정보 조회
  return useQuery<CreateShopResponse>({
    queryKey: ['shops', shopId],
    queryFn: async () => {
      const res = await requestor.get<CreateShopResponse>(`/shops/${shopId}`);
      return res.data;
    },
    enabled: !!shopId,           // shopId가 없으면 실행하지 않도록 조건 설정 (optional)
  });
};

// 공고 목록 조회 아래와 같은 방식
// const { data, isLoading, isError } = useGetShop(query)

  export const useUpdateShop = () => {
    return useMutation<CreateShopResponse, Error, { shopId: string, body:  CreateShopRequest }>({  // 가게의 특정 공고 수정 
      mutationFn: async ({ shopId, body }) => {
        const token = localStorage.getItem('token');
        const res = await requestor.put<CreateShopResponse>(`/shops/${shopId}`, body,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        return res.data;
      },
    });
  };

  export const useUpdateShopInfo = () => {
    const mutation = useMutation<CreateShopResponse, Error, { shopId: string, body: CreateShopRequest }>({ // 가게 공고 수정
      mutationFn: async ({ shopId, body }) => {
        const token = localStorage.getItem('token');   // localStorage.getItem('token')는 훅 안쪽에서 호출돼야 안전  
        const res =  await requestor.put<CreateShopResponse>(`/shops/${shopId}`, body,
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
  
  
  // 가게의 특정 공고 수정 아래와 같은 방식
  // const { mutate, isError, error, errorMessage } = useUpdateShopInfo({
  //   onSuccess: () => {
  //     alert('등록 완료!');
  //     등록성공시 행동
  //   },
  // });
  
  // const handleUpdate = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   mutate({
  //     shopId: '1234', 
  //     noticeId: '1234', 
  //     body: form,
  //   });
  // };
  
  