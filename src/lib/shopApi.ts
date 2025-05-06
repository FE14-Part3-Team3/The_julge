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
    if (!userId || userId.trim() === "") {
      return null;
    }

    const token = localStorage.getItem("token");
    const res = await requestor.get<any>(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.data || !res.data.item) {
      return null;
    }

    if (!res.data.item.shop) {
      return null;
    }

    const shopData = res.data.item.shop.item;
    if (!shopData) {
      return null;
    }

    if (!shopData.id) {
      return null;
    }

    return {
      ...shopData,
      location: shopData.address1,
      userId: userId,
    };
  } catch (error) {
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
      return null;
    }

    const token = localStorage.getItem("token");
    const res = await requestor.get<CreateShopResponse>(`/shops/${shopId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.data || !res.data.item) {
      return null;
    }

    const shopData = res.data.item;
    return {
      ...shopData,
      location: shopData.address1,
      userId: shopData.user?.item?.id || "",
    };
  } catch (error: any) {
    // 404 에러일 경우 대체 방법으로 조회 시도
    if (error.response && error.response.status === 404) {
      try {
        const userId = localStorage.getItem("id");
        if (userId) {
          const myShop = await getMyShop(userId);
          if (myShop && myShop.id === shopId) {
            return myShop;
          }
        }
      } catch (fallbackError) {
        // 대체 조회 실패 시 무시
      }
    }
    return null;
  }
}

/**
 * 가게 정보 업데이트
 * @param shopId 가게 ID
 * @param data 업데이트할 가게 정보
 * @returns 성공 여부
 */
export async function updateShop(shopId: string, data: any): Promise<boolean> {
  try {
    if (!shopId) return false;
    const token = localStorage.getItem("token");
    if (!token) return false;

    // 최저시급/최대시급 제한 설정
    const MIN_WAGE = 10030; // 2023년 한국 최저시급
    const MAX_WAGE = 1000000000; // 최대 시급 제한 (10억원)

    // 시급 값 범위 조정
    let wage = Number(data.wage || 0);
    if (wage < MIN_WAGE) {
      console.log(
        `시급이 최저시급(${MIN_WAGE}원) 미만이어서 최저시급으로 조정합니다.`
      );
      wage = MIN_WAGE;
    } else if (wage > MAX_WAGE) {
      console.log(
        `시급이 최대 제한(${MAX_WAGE}원)을 초과하여 최대값으로 조정합니다.`
      );
      wage = MAX_WAGE;
    }

    // API 명세서에 맞는 데이터 구성
    const shopData: Record<string, any> = {
      name: String(data.name || ""),
      category: String(data.category || ""),
      address1: String(data.address1 || ""),
      address2: String(data.address2 || ""),
      description: String(data.description || ""),
      originalHourlyPay: wage,
    };

    // 이미지 필드가 있는 경우 imageUrl로 추가 (API 명세서에 맞게)
    if (typeof data.image === "string" && data.image.trim() !== "") {
      shopData.imageUrl = data.image.trim();
    }

    console.log("API 요청 데이터:", JSON.stringify(shopData));

    // API 호출
    const response = await fetch(
      `https://bootcamp-api.codeit.kr/api/0-1/the-julge/shops/${shopId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shopData),
      }
    );

    // 오류 확인
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API 오류 (${response.status}):`, errorText);
      return false;
    }

    return true;
  } catch (error) {
    console.error("오류 발생:", error);
    return false;
  }
}
