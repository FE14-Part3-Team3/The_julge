//"use client";

import axios from "axios";

// 서버 주소
const API_BASE_URL = "https://your-api-server.com"; // 원복필요

// 임시 토큰 리턴 (테스트용)
const getToken = () => {
  // 원복필요
  // if (typeof window !== 'undefined') {
  //   return localStorage.getItem('token');
  // }

  // 삭제필요: 테스트용 임시 토큰
  return "MOCK_TOKEN";
};

// axios 인스턴스 (mock에서는 실제 사용 안 함)
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ mock: 유저 + 가게 정보
export const getUserInfo = async (userId: string) => {
  // 원복필요
  // const response = await apiClient.get(`/users/${userId}`);
  // return response.data.item;

  // 삭제필요: mock 유저 + 가게
  return {
    id: userId,
    email: "mock@employer.com",
    type: "employer",
    name: "모의 사장님",
    shop: {
      id: "shop-mock-1",
      name: "더쥴게 김밥",
      category: "분식",
      address1: "서울시 강남구",
      address2: "역삼동 123-45",
      description: "24시간 운영하는 김밥집",
      imageUrl: "https://via.placeholder.com/400x200.png?text=김밥천국",
      originalHourlyPay: 11000,
      location: "강남역 1번출구",
    },
  };
};

// ✅ mock: 공고 리스트
interface GetNoticesByShopParams {
  shopId: string;
  offset?: number;
  limit?: number;
}

export const getNoticesByShop = async ({
  shopId,
  offset = 0,
  limit = 10,
}: GetNoticesByShopParams) => {
  // 원복필요
  // const response = await apiClient.get(`/shops/${shopId}/notices`, { params: { offset, limit } });
  // return {
  //   notices: response.data.items.map(...),
  //   hasNext: response.data.hasNext,
  //   count: response.data.count,
  // };

  // 삭제필요: mock 공고 데이터
  return {
    notices: [
      {
        id: "notice-1",
        hourlyPay: 12000,
        startsAt: "2025-04-30T09:00:00Z",
        workhour: 6,
        description: "오전 주방 알바 구합니다",
        closed: false,
      },
      {
        id: "notice-2",
        hourlyPay: 13000,
        startsAt: "2025-05-01T18:00:00Z",
        workhour: 5,
        description: "야간 서빙 알바 구합니다",
        closed: false,
      },
    ],
    hasNext: false,
    count: 2,
  };
};
