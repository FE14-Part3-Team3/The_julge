import requestor from "@/lib/axios";
import { GetUserAlertsResponse, PutAlertItemResponse } from "@/types/api/user";
import { GetListQuery } from "@/types/common";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useUserAlerts(userId: string, query: GetListQuery) { // 유저의 알림 목록 조회
  return useQuery<GetUserAlertsResponse>({
    queryKey: ['user-alerts', userId, query],
    // queryFn: async () => {
    //   return {
    //     offset: query.offset,
    //     limit: query.limit,
    //     count: 1,
    //     hasNext: false,
    //     items: [
    //       {
    //         item: {
    //           id: 'alert-123',
    //           createdAt: new Date().toISOString(),
    //           result: 'accepted',
    //           read: false,
    //           application: {
    //             item: {
    //               id: 'application-1',
    //               status: 'pending',
    //             },
    //             href: '',
    //           },
    //           shop: {
    //             item: {
    //               id: 'shop-1',
    //               name: '테스트 가게',
    //               category: '한식',
    //               address1: '서울시 강남구',
    //               address2: '1층',
    //               description: '맛있는 집',
    //               imageUrl: '',
    //               originalHourlyPay: 10000,
    //             },
    //             href: '',
    //           },
    //           notice: {
    //             item: {
    //               id: 'notice-1',
    //               hourlyPay: 10000,
    //               description: '알바 공고 설명',
    //               startsAt: new Date().toISOString(),
    //               workhour: 8,
    //               closed: false,
    //             },
    //             href: '',
    //           },
    //           links: [],
    //         },
    //         links: [],
    //       },
    //     ],
    //     links: [], 
    //   } as GetUserAlertsResponse;
    // },
    queryFn: async () => {
      const token = localStorage.getItem('token');
      const res = await requestor.get<GetUserAlertsResponse>(`/users/${userId}/alerts`, {
        params: query,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
    placeholderData: (prev) => prev,
  });
}

export const useReadAlert = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<PutAlertItemResponse, Error, { userId: string, alertId: string }>({ // 알림 읽음 처리
    mutationFn: async ({ userId, alertId }) => {
      const token = localStorage.getItem('token');  
      const res =  await requestor.put<PutAlertItemResponse>(`/users/${userId}/alerts/${alertId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,  
          },
        }
      );
      return res.data;
    },
    onSuccess: () => {      // 읽음 처리되면 해당 데이터 새로고침 
      queryClient.invalidateQueries({queryKey: ['user-alerts']});
    }
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
