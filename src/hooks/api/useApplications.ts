import requestor from "@/lib/axios";
import { GetApplicationsResponse, GetUserApplicationsResponse, UpdateApplicationResponse } from "@/types/api/application";
import { ApplicationRequest, GetListQuery } from "@/types/common";
import { useMutation, useQuery } from "@tanstack/react-query";


export const useApplicationList = (shopId:string, noticeId:string, query: GetListQuery) => { // 가게의 특정 공고의 지원 목록 조회
  return useQuery<GetUserApplicationsResponse>({
    queryKey: ['Applications', shopId, noticeId, query],
    queryFn: async () => {
      const res = await requestor.get<GetUserApplicationsResponse>(`/shops/${shopId}/notices/${noticeId}/applications`, {
        params: query,
      });
      return res.data;
    },
    placeholderData: (prev) => prev,
  });
};

export const usePostApplication = () => {
  const mutation = useMutation<GetUserApplicationsResponse, Error, { shopId:string, noticeId:string }>({ // 가게의 특정 공고 지원 등록
  mutationFn: async ({  shopId, noticeId }) => {
    const token = localStorage.getItem('token');   
    const res = await requestor.post<GetUserApplicationsResponse>(
      `/shops/${shopId}/notices/${noticeId}/applications`, 
      {
        headers: {
          Authorization: `Bearer ${token}`,  
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

export const useUpdateApplication = () => {
  const mutation = useMutation<UpdateApplicationResponse, Error, 
  { shopId: string, noticeId: string, applicationId: string , body:ApplicationRequest} // 가게의 특정 공고 지원 승인, 거절 또는 취소
  >({ 
    mutationFn: async ({ shopId, noticeId, applicationId, body }) => {
      const token = localStorage.getItem('token');   // localStorage.getItem('token')는 훅 안쪽에서 호출돼야 안전  
      const res =  await requestor.put<UpdateApplicationResponse>(`/shops/${shopId}/notices/${noticeId}`, body,
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

export const useUserApplicationList = (userId:string, query: GetListQuery) => { // 가게의 특정 공고의 지원 목록 조회
  return useQuery<GetApplicationsResponse>({
    queryKey: ['User-applications', userId,  query],
    queryFn: async () => {
      const token = localStorage.getItem('token');   
      const res = await requestor.get<GetApplicationsResponse>(`/users/${userId}/applications`, {
        params: query,
        headers: {
          Authorization: `Bearer ${token}`,  // localStorage 토큰만 적용되있음
        },
      });
      return res.data;
    },
    placeholderData: (prev) => prev,
  });
};

// 아래와 같이 활용 
