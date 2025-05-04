import { useQuery } from "@tanstack/react-query";
import requestor from "@/lib/axios";
import type { GetUserResponse } from "@/types/api/user";

export const useGetUser = (userId: string) => {
  // 유저 정보 조회
  return useQuery<GetUserResponse>({
    queryKey: ["users", userId],
    queryFn: async () => {
      const res = await requestor.get<GetUserResponse>(`/users/${userId}`);
      return res.data;
    },
    enabled: !!userId,
    refetchOnWindowFocus: false,
  });
};
