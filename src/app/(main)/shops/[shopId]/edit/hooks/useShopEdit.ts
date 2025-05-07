import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { UseFormWatch, UseFormReset } from "react-hook-form";
import { ShopEditFormData } from "../components/ShopEditForm"; // 수정된 폼 데이터 타입
import { getShopById, updateShop } from "@/lib/shopApi";
import { ShopInfo } from "@/types/api/shop";
import { Category } from "@/lib/constants/foodCategory";
import { AddressOptions } from "@/lib/constants/addressOptions";

/**
 * @interface UseShopEditProps
 * @description useShopEdit 훅에 전달되는 props 타입입니다.
 * @property watch react-hook-form의 watch 함수 (폼 값 감지용)
 * @property reset react-hook-form의 reset 함수 (폼 값 초기화용)
 */
interface UseShopEditProps {
  watch: UseFormWatch<ShopEditFormData>;
  reset: UseFormReset<ShopEditFormData>;
}

/**
 * @interface ShopUpdateRequestData
 * @description 가게 정보 수정을 위해 API에 전달될 데이터의 타입입니다.
 * @property name 가게 이름
 * @property category 가게 분류
 * @property address1 가게 주소 (시/도)
 * @property address2 가게 상세 주소
 * @property description 가게 설명
 * @property image (optional) 가게 이미지 URL (문자열)
 * @property originalHourlyPay 기본 시급 (숫자)
 */
export interface ShopUpdateRequestData {
  name: string;
  category: string;
  address1: string;
  address2: string;
  description: string;
  image?: string; // 이미지가 변경되지 않으면 보내지 않을 수 있음
  originalHourlyPay: number;
}

/**
 * @hook useShopEdit
 * @description 가게 정보 수정 페이지의 로직을 관리하는 커스텀 훅입니다.
 * 로그인 상태 확인, 기존 가게 데이터 로드, 이미지 미리보기, 이미지 업로드, 폼 제출 처리 등의 기능을 수행합니다.
 * @param {UseShopEditProps} props - 훅에 필요한 react-hook-form의 watch와 reset 함수
 * @returns 편집 상태, 로딩 상태, 오류 메시지, 로그인 상태, 이미지 미리보기 URL, 폼 제출 핸들러, 모달 닫기 핸들러, 로그인 리다이렉트 핸들러를 포함하는 객체
 */
export default function useShopEdit({ watch, reset }: UseShopEditProps) {
  const [isEdited, setIsEdited] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();
  const shopId = params.shopId as string;

  // 1. 로그인 상태 확인 및 기존 가게 데이터 로드
  useEffect(() => {
    /**
     * @function checkLoginAndLoadData
     * @description 로그인 상태를 확인하고, 로그인된 경우 기존 가게 정보를 불러와 폼에 설정합니다.
     */
    const checkLoginAndLoadData = async () => {
      setIsLoading(true);
      // 로컬 스토리지에서 사용자 정보 및 토큰 확인
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("id");
      const userType = localStorage.getItem("type");
      const loggedIn = !!(token && userId && userType === "employer");
      setIsLoggedIn(loggedIn);

      if (!loggedIn) {
        setError("로그인이 필요하거나 고용주 권한이 없습니다.");
        setIsLoading(false);
        return;
      }

      if (!shopId) {
        setError("가게 ID가 유효하지 않습니다.");
        setIsLoading(false);
        return;
      }

      try {
        console.log("[useShopEdit] 기존 가게 정보 로드 시작, shopId:", shopId);
        const shopData = await getShopById(shopId);
        if (shopData) {
          console.log("[useShopEdit] 로드된 가게 정보:", shopData);
          reset({
            name: shopData.name || "",
            category: (shopData.category as Category) || "",
            address1: (shopData.address1 as AddressOptions) || "",
            address2: shopData.address2 || "",
            description: shopData.description || "",
            wage: shopData.originalHourlyPay || 0,
            // image 필드는 watch로 별도 관리되므로 reset 시에는 빈 문자열 또는 null로 초기화
            // 실제 FileList가 아니므로 빈 문자열로 설정
            image: "",
          });
          if (shopData.imageUrl) {
            setPreviewImg(shopData.imageUrl);
          }
        } else {
          setError("가게 정보를 불러올 수 없습니다.");
        }
      } catch (err: any) {
        console.error("[useShopEdit] 가게 정보 로드 오류:", err);
        setError(
          err?.message || "가게 정보를 불러오는 중 오류가 발생했습니다."
        );
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginAndLoadData();
  }, [shopId, reset]);

  // 2. 이미지 미리보기 업데이트 (파일 선택 시)
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "image") {
        const imageFile = value.image;
        if (
          imageFile &&
          imageFile instanceof FileList &&
          imageFile.length > 0
        ) {
          setPreviewImg(URL.createObjectURL(imageFile[0]));
        } else if (typeof imageFile === "string" && imageFile === "") {
          // 이미지 필드가 초기화되거나 빈 문자열로 설정된 경우 (예: 기존 이미지 유지 또는 삭제)
          // 이 경우, 초기 로드된 previewImg (shopData.imageUrl)를 유지하거나, 사용자가 이미지를 제거하려 한다면 null로 설정하는 로직이 필요할 수 있음
          // 현재는 새 파일 선택 시에만 previewImg를 변경
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  // 3. 이미지 업로드 함수 (useShopRegister와 동일하게 사용 가능)
  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("로그인이 필요합니다.");

      const presignedResponse = await fetch(
        `https://bootcamp-api.codeit.kr/api/0-1/the-julge/images`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name: file.name }),
        }
      );
      if (!presignedResponse.ok) throw new Error("이미지 URL 생성 실패");
      const presignedData = await presignedResponse.json();
      const presignedUrl = presignedData.item.url;

      await fetch(presignedUrl, { method: "PUT", body: file });
      return presignedUrl.split("?")[0];
    } catch (error) {
      console.error("이미지 업로드 오류:", error);
      setError("이미지 업로드 중 오류가 발생했습니다.");
      return null;
    }
  };

  // 4. 폼 제출 (가게 정보 업데이트)
  const handleSubmit = async (formData: ShopEditFormData) => {
    if (!shopId) {
      setError("가게 ID가 유효하지 않습니다.");
      return;
    }
    if (!isLoggedIn) {
      setError("로그인이 필요합니다.");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const updateData: ShopUpdateRequestData = {
        name: formData.name,
        category: formData.category || "", // 빈 문자열 허용 또는 기본값 설정
        address1: formData.address1 || "",
        address2: formData.address2 || "", // 빈 문자열 기본값 추가
        description: formData.description || "",
        originalHourlyPay: Number(formData.wage) || 0,
      };

      // 이미지가 새로 첨부된 경우에만 업로드 및 imageUrl 업데이트
      if (
        formData.image &&
        formData.image instanceof FileList &&
        formData.image.length > 0
      ) {
        const newImageUrl = await uploadImage(formData.image[0]);
        if (newImageUrl) {
          updateData.image = newImageUrl;
        } else {
          // 이미지 업로드 실패 시, 기존 이미지를 유지할지 또는 오류 처리할지 결정
          // 여기서는 오류를 발생시키고 중단
          setError(
            "이미지 업로드에 실패하여 가게 정보를 업데이트할 수 없습니다."
          );
          setIsLoading(false);
          return;
        }
      } else if (previewImg) {
        // 새 이미지가 없고, 기존 이미지가 있었던 경우 (previewImg에 URL이 있는 경우)
        // imageUrl을 기존 값으로 설정 (사용자가 이미지를 변경하지 않은 경우)
        updateData.image = previewImg;
      }
      // 사용자가 이미지를 "제거"하는 기능은 별도 UI/UX 필요

      console.log("[useShopEdit] 가게 업데이트 요청 데이터:", updateData);
      const success = await updateShop(shopId, updateData);

      if (success) {
        console.log("[useShopEdit] 가게 정보 업데이트 성공");
        setIsEdited(true);
      } else {
        setError(
          "가게 정보 업데이트에 실패했습니다. 서버 응답을 확인해주세요."
        );
      }
    } catch (err: any) {
      console.error("[useShopEdit] 가게 정보 업데이트 오류:", err);
      setError(err?.message || "가게 정보 업데이트 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsEdited(false);
    router.push(`/shops/${shopId}`); // 성공 후 해당 가게 상세 페이지로 이동
  };

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  return {
    isEdited,
    isLoading,
    error,
    isLoggedIn,
    previewImg,
    handleSubmit,
    handleCloseModal,
    handleLoginRedirect,
  };
}
