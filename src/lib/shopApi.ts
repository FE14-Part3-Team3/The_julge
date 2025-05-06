import { ShopInfo, CreateShopResponse } from "@/types/api/shop";
import requestor from "@/lib/axios";

/**
 * 사용자 ID로 가게 정보 조회 - 실제 API 호출
 * @param userId 사용자 ID
 * @returns 가게 정보 또는 null
 */
export async function getMyShop(
  userId: string
): Promise<(ShopInfo & { location: string; userId: string }) | null> {
  try {
    // 유효성 검사
    if (!userId || userId.trim() === "") {
      console.error("[getMyShop] 유효하지 않은 userId");
      return null;
    }

    // 인증 토큰 가져오기
    const token = localStorage.getItem("token");
    console.log("[getMyShop] API 호출 준비", { userId, hasToken: !!token });

    // API 호출
    console.log("[getMyShop] 요청 URL:", `/users/${userId}`);
    const res = await requestor.get<any>(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("[getMyShop] 응답 상태:", res.status);

    // 응답 데이터 구조 유효성 검사
    if (!res.data || !res.data.item) {
      console.log("[getMyShop] 응답 데이터 없음 또는 item 객체 없음");
      return null;
    }

    // shop 객체 확인
    if (!res.data.item.shop) {
      console.log("[getMyShop] shop 객체 없음 - 가게 미등록 상태");
      return null;
    }

    // shop.item 객체 확인
    const shopData = res.data.item.shop.item;
    if (!shopData) {
      console.log("[getMyShop] shop.item 객체 없음");
      return null;
    }

    // 가게 ID 확인
    if (!shopData.id) {
      console.log("[getMyShop] 가게 ID 없음");
      return null;
    }

    console.log("[getMyShop] 가게 정보 찾음:", shopData);

    // 필요한 데이터 추가하여 반환
    return {
      ...shopData,
      location: shopData.address1,
      userId: userId,
    };
  } catch (error: any) {
    // 오류 상세 로깅
    console.error("[getMyShop] 오류 발생:", error);

    if (error.response) {
      console.error("[getMyShop] 응답 상태:", error.response.status);
      console.error("[getMyShop] 응답 데이터:", error.response.data);
    } else if (error.request) {
      console.error("[getMyShop] 요청 오류 (응답 없음):", error.request);
    } else {
      console.error("[getMyShop] 기타 오류:", error.message);
    }

    return null;
  }
}

/**
 * 가게 ID로 가게 정보 조회 - 실제 API 호출
 * @param shopId 가게 ID
 * @returns 가게 정보 또는 null
 */
export async function getShopById(
  shopId: string
): Promise<(ShopInfo & { location: string; userId: string }) | null> {
  try {
    if (!shopId || shopId.trim() === "") {
      console.error("[getShopById] 유효하지 않은 shopId");
      return null;
    }

    // 인증 토큰 가져오기
    const token = localStorage.getItem("token");
    console.log("[getShopById] API 호출 준비", { shopId, hasToken: !!token });

    // 실제 API 사용
    const res = await requestor.get<CreateShopResponse>(`/shops/${shopId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("[getShopById] 응답 상태:", res.status);

    // 응답 데이터 확인
    if (!res.data || !res.data.item) {
      console.log("[getShopById] 응답 데이터 없음 또는 item 객체 없음");
      return null;
    }

    const shopData = res.data.item;
    console.log("[getShopById] 가게 정보 찾음:", shopData);

    return {
      ...shopData,
      location: shopData.address1,
      userId: shopData.user?.item?.id || "",
    };
  } catch (error: any) {
    console.error("[getShopById] 오류 발생:", error);

    if (error.response) {
      console.error("[getShopById] 응답 상태:", error.response.status);
      console.error("[getShopById] 응답 데이터:", error.response.data);
    }

    return null;
  }
}
