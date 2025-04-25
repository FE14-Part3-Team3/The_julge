import { LoginRequest, LoginResponse } from "@/types/api/user";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: async ({ email, password }) => {
      const res = await axios.post<LoginResponse>('/token', { email, password });
      return res.data;
    },
  });
};