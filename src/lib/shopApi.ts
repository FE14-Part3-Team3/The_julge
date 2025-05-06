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
    // 실제 API 사용
    const res = await requestor.get<{ item: { shop: { item: ShopInfo } } }>(
      `/users/${userId}`
    );

    const shopData = res.data.item.shop?.item;

    if (!shopData) {
      return null;
    }

    return {
      ...shopData,
      location: shopData.address1,
      userId: userId,
    };
  } catch (error) {
    console.error("사용자 가게 정보 조회 실패:", error);
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
    // 실제 API 사용
    const res = await requestor.get<CreateShopResponse>(`/shops/${shopId}`);

    const shopData = res.data.item;

    if (!shopData) {
      return null;
    }

    return {
      ...shopData,
      location: shopData.address1,
      userId: shopData.user?.item?.id || "",
    };
  } catch (error) {
    console.error("가게 정보 조회 실패:", error);
    return null;
  }
}
