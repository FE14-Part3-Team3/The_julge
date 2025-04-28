import requestor from "@/lib/axios";
import { GetUserAlertsResponse, PutAlertItemResponse } from "@/types/api/user";
import { GetListQuery } from "@/types/common";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useUserAlerts(userId: string, query: GetListQuery) { // 유저의 알림 목록 조회
  return useQuery<GetUserAlertsResponse>({
    queryKey: ['user-alerts', userId, query],
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
