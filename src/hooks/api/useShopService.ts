import requestor from "@/lib/axios";
import { CreateShopRequest, CreateShopResponse } from "@/types/api/shop";
import { useMutation, useQuery } from "@tanstack/react-query";

export const usePostShop = () => {
  const mutation = useMutation<
    CreateShopResponse,
    Error,
    { body: CreateShopRequest }
  >({
    // 가게 등록
    mutationFn: async ({ body }) => {
      const token = localStorage.getItem("token"); // localStorage.getItem('token')는 훅 안쪽에서 호출돼야 안전
      const res = await requestor.post<CreateShopResponse>(`/shops`, body, {
        headers: {
          Authorization: `Bearer ${token}`, // localStorage 토큰만 적용되있음
        },
      });
      return res.data;
    },
  });

  const errorMessage =
    (mutation.error as any)?.response?.data?.message ||
    mutation.error?.message ||
    "";

  return {
    ...mutation,
    errorMessage,
  };
};

export const useGetShop = (shopId: string) => {
  // 가게 정보 조회
  return useQuery<CreateShopResponse>({
    queryKey: ["shops", shopId],
    queryFn: async () => {
      const res = await requestor.get<CreateShopResponse>(`/shops/${shopId}`);
      return res.data;
    },
  });
};

export const useUpdateShopInfo = () => {
  const mutation = useMutation<
    CreateShopResponse,
    Error,
    { shopId: string; body: CreateShopRequest }
  >({
    // 가게 정보 수정
    mutationFn: async ({ shopId, body }) => {
      const token = localStorage.getItem("token"); // localStorage.getItem('token')는 훅 안쪽에서 호출돼야 안전
      const res = await requestor.put<CreateShopResponse>(
        `/shops/${shopId}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`, // localStorage 토큰만 적용되있음
          },
        }
      );
      return res.data;
    },
  });

  const errorMessage =
    (mutation.error as any)?.response?.data?.message ||
    mutation.error?.message ||
    "";

  return {
    ...mutation,
    errorMessage,
  };
};
