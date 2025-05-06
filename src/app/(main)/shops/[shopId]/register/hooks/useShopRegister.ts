import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { UseFormWatch } from "react-hook-form";
import { MyStoreRegisterForm } from "../components/ShopRegisterForm";

interface UseShopRegisterProps {
  watch: UseFormWatch<MyStoreRegisterForm>;
  shopId?: string;
}

export interface ShopRequestData {
  name: string;
  category: string;
  address1: string;
  address2: string;
  description: string;
  imageUrl?: string;
  originalHourlyPay: number;
}

export default function useShopRegister({
  watch,
  shopId,
}: UseShopRegisterProps) {
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [previewImg, setPreviewImg] = useState("");
  const router = useRouter();

  // 컴포넌트 마운트 시 로그인 상태 확인
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("id");
      const userType = localStorage.getItem("type");

      // 토큰과 사용자 ID, 유형이 모두 있는지 확인
      const loggedIn = !!(token && userId && userType === "employer");
      console.log("로그인 상태:", loggedIn, "유저 타입:", userType);
      setIsLoggedIn(loggedIn);

      if (!loggedIn) {
        setError(
          "로그인이 필요하거나 고용주 권한이 필요합니다. 로그인 페이지로 이동해주세요."
        );
      }
    };

    checkLoginStatus();
  }, []);

  // 이미지 미리보기 감시
  useEffect(() => {
    const selectedFile = watch("image");
    if (selectedFile && selectedFile.length > 0) {
      setPreviewImg(URL.createObjectURL(selectedFile[0]));
    }
  }, [watch("image")]);

  // 이미지 업로드 함수
  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("로그인이 필요합니다");
      }

      console.log("이미지 업로드 시작 - 토큰:", token.substring(0, 15) + "...");

      // 1. Presigned URL 요청
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

      console.log("Presigned URL 응답 상태:", presignedResponse.status);

      if (!presignedResponse.ok) {
        if (presignedResponse.status === 401) {
          throw new Error("로그인이 만료되었습니다. 다시 로그인해주세요.");
        }
        throw new Error(`이미지 URL 생성 실패 (${presignedResponse.status})`);
      }

      const presignedData = await presignedResponse.json();
      const presignedUrl = presignedData.item.url;

      // 2. S3에 이미지 업로드
      const uploadResponse = await fetch(presignedUrl, {
        method: "PUT",
        body: file,
      });

      if (!uploadResponse.ok) {
        throw new Error(`이미지 업로드 실패 (${uploadResponse.status})`);
      }

      // 3. 실제 이미지 URL 생성 (Presigned URL에서 query string 제거)
      const imageUrl = presignedUrl.split("?")[0];
      return imageUrl;
    } catch (error) {
      console.error("이미지 업로드 오류:", error);
      return null;
    }
  };

  // 폼 제출 처리
  const handleSubmit = async (data: MyStoreRegisterForm) => {
    try {
      setError(null);

      // 토큰 가져오기 및 검증
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("id");
      const userType = localStorage.getItem("type");

      // 로그인 및 사용자 타입 검증
      if (!token || !userId) {
        setError("로그인이 필요합니다. 로그인 페이지로 이동해주세요.");
        return;
      }

      // 고용주 타입 확인
      if (userType !== "employer") {
        setError("고용주 계정으로만 가게를 등록할 수 있습니다.");
        return;
      }

      console.log("가게 등록 요청 전 로그인 상태 확인:", !!token);

      // API 요청 데이터 준비
      const requestData: ShopRequestData = {
        name: data.name,
        category: data.category || "한식",
        address1: data.address1 || "",
        address2: data.address2,
        description: data.description || "",
        originalHourlyPay: Number(data.wage) || 0,
      };

      // 이미지가 있으면 업로드
      if (data.image && data.image.length > 0) {
        const imageUrl = await uploadImage(data.image[0]);
        if (imageUrl) {
          requestData.imageUrl = imageUrl;
        } else {
          // 이미지 업로드 실패 시 기본 이미지를 사용하거나 오류 메시지 표시
          console.warn("이미지 업로드 실패, 이미지 없이 진행합니다.");
        }
      }

      console.log("가게 등록 요청 데이터:", requestData);
      console.log("인증 토큰:", token.substring(0, 15) + "...");

      // 가게 등록 API 호출
      const response = await fetch(
        `https://bootcamp-api.codeit.kr/api/0-1/the-julge/shops`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestData),
        }
      );

      console.log("가게 등록 API 응답 상태:", response.status);

      // 응답 처리 - JSON 파싱 오류 대응
      if (!response.ok) {
        let errorMessage = `가게 등록 실패 (${response.status})`;

        if (response.status === 401) {
          errorMessage = "인증이 만료되었습니다. 다시 로그인해주세요.";
          localStorage.removeItem("token"); // 토큰 삭제
          localStorage.removeItem("id"); // 사용자 ID 삭제
          localStorage.removeItem("type"); // 사용자 타입 삭제
          setIsLoggedIn(false);
        }

        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (jsonError) {
          // JSON 파싱 오류가 발생하면 기본 오류 메시지 사용
          console.error("응답 처리 오류:", jsonError);
        }

        throw new Error(errorMessage);
      }

      // 성공 처리
      console.log("가게 등록 성공");
      setIsRegistered(true);
    } catch (err: any) {
      console.error("가게 등록 오류:", err);
      setError(err?.message || "가게 등록 중 오류가 발생했습니다.");
    }
  };

  const handleClose = () => {
    setIsRegistered(false);
    router.push(`/shops/${shopId}`);
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return {
    isRegistered,
    error,
    isLoggedIn,
    previewImg,
    handleSubmit,
    handleClose,
    handleLogin,
  };
}
