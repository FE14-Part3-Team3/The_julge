import requestor from "@/lib/axios";
import { LoginRequest, LoginResponse } from "@/types/api/user";
import { useMutation } from "@tanstack/react-query";


export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: async ({ email, password }) => {
      const res = await requestor.post<LoginResponse>('/token', { email, password });
      return res.data;
    },
    onSuccess: (data) => {
      localStorage.setItem('token', data.item.token);   // localStorage 토큰 저장
      window.location.reload();
    },
    onError: (error) => {
      alert('로그인 실패: ' + error.message); 
    },
  });
};