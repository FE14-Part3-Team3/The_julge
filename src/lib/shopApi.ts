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
 * 가게 정보 업데이트 - 실제 API 호출
 * @param shopId 가게 ID
 * @param data 업데이트할 가게 정보
 * @returns 성공 여부
 */
export async function updateShop(shopId: string, data: any): Promise<boolean> {
  try {
    if (!shopId || shopId.trim() === "") {
      return false;
    }

    const token = localStorage.getItem("token");

    // 이미지 처리
    let imageUrl = "";
    if (data.image instanceof FileList && data.image.length > 0) {
      const formData = new FormData();
      formData.append("image", data.image[0]);

      const imageResponse = await fetch(
        "https://bootcamp-api.codeit.kr/api/0-1/the-julge/upload/image",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (imageResponse.ok) {
        const imageData = await imageResponse.json();
        imageUrl = imageData.item?.url || "";
      }
    }

    // 업데이트할 데이터 준비
    const updateData = {
      name: data.name,
      category: data.category,
      address1: data.address1,
      address2: data.address2,
      description: data.description,
      image: imageUrl || undefined,
      originalHourlyPay: data.wage,
    };

    const apiUrl = `/shops/${shopId}`;

    // 여러 API 요청 방식 시도
    try {
      // PATCH 요청 시도
      const res = await requestor.patch(apiUrl, updateData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      return res.status >= 200 && res.status < 300;
    } catch (patchError: any) {
      // PATCH 실패 시 PUT 요청 시도
      if (patchError.response && patchError.response.status === 404) {
        try {
          const putRes = await requestor.put(apiUrl, updateData, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          return putRes.status >= 200 && putRes.status < 300;
        } catch (putError) {
          // PUT 실패 시 대체 엔드포인트 시도
          try {
            const altUrl = `/shop-details/${shopId}`;
            const postRes = await requestor.post(altUrl, updateData, {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            });

            return postRes.status >= 200 && postRes.status < 300;
          } catch (postError) {
            // 모든 시도 실패
            return false;
          }
        }
      } else {
        // 404가 아닌 다른 오류는 그대로 실패 처리
        return false;
      }
    }
  } catch (error) {
    return false;
  }
}
