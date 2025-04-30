import { ShopInfo } from "@/types/api/shop";

// 사장님 id로 가게 조회 (mock)
export async function getMyShop(
  userId: string
): Promise<(ShopInfo & { location: string; userId: string }) | null> {
  if (userId === "has-shop") {
    return {
      id: "shop-1",
      name: "도토리 식당",
      category: "식당",
      address1: "서울시 송파구",
      address2: "송파동 123-45",
      description: "알바하기 편한 나구리네 라면집!",
      imageUrl: "/temp-restaurant.jpg",
      originalHourlyPay: 11000,
      location: "서울시 송파구",
      userId: userId,
    };
  }
  return null;
}

// shopId로 가게 조회 (mock)
export async function getShopById(
  shopId: string
): Promise<(ShopInfo & { location: string; userId: string }) | null> {
  if (shopId === "shop-1") {
    return {
      id: "shop-1",
      name: "도토리 식당",
      category: "식당",
      address1: "서울시 송파구",
      address2: "송파동 123-45",
      description: "알바하기 편한 나구리네 라면집!",
      imageUrl: "/temp-restaurant.jpg",
      originalHourlyPay: 11000,
      location: "서울시 송파구",
      userId: "has-shop",
    };
  }
  return null;
}
