import { QueryClient } from "@tanstack/react-query";

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // 기본 리패치·재시도 정책 설정
        staleTime: 1000 * 60 * 5, // 5분 동안 fresh
        gcTime: 1000 * 60 * 30,
        retry: 1, // 실패 시 1번 재시도
        refetchOnWindowFocus: false,
        // 창 포커스 복귀 시 리패치 안 함
      },
      mutations: {
        // 낙관적 업데이트나 에러 처리 글로벌 설정 가능
      },
    },
  });
}
