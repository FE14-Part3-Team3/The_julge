"use client";
// =========================
// [개발용 목업 테스트 버전]
// =========================
import React from "react";
import { useRouter } from "next/navigation";
import RegisterCard from "@/components/Card/RegisterCard";

export default function ShopsIndexPage() {
  const router = useRouter();

  // 간단한 버전: 가게 등록 안내 화면만 표시
  return (
    <div className="max-w-[964px] mx-auto px-6 py-10">
      <RegisterCard
        title="내 가게"
        description="내 가게를 소개하고 공고도 등록해 보세요."
        buttonText="가게 등록하기"
        onClick={() => router.push("/shops/new")} //경로 향후 수정필요
      />
    </div>
  );
}

// 아래는 개발 단계에서 목업 API로 테스트가 필요할 경우 사용할 코드
/*
export default function ShopsIndexPageWithMock() {
  const router = useRouter();
  const userId = "has-shop"; // 또는 "no-shop" 등으로 테스트
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 가게 정보 조회 (목업 API 사용)
    getMyShop(userId).then((result) => {
      if (result) {
        // 가게가 있으면 해당 가게 상세 페이지로 이동
        router.replace(`/shops/${result.id}`);
      } else {
        // 가게가 없으면 로딩 상태 해제
        setLoading(false);
      }
    });
  }, [userId, router]);

  if (loading) return <div className="text-center py-10">로딩 중...</div>;
  
  return (
    <div className="max-w-[964px] mx-auto px-6 py-10">
      <RegisterCard
        title="내 가게"
        description="내 가게를 소개하고 공고도 등록해 보세요."
        buttonText="가게 등록하기"
        onClick={() => router.push("/shops/new")}
      />
    </div>
  );
}
*/

/*
// =========================
// [실제 배포용 버전]
// =========================
import React from "react";
import { useRouter } from "next/navigation";
import RegisterCard from "@/components/Card/RegisterCard";

export default function ShopsIndexPage() {
  const router = useRouter();
  
  // 가게 등록 페이지로 이동하는 버튼만 표시
  // 로그인 확인 및 가게 정보 조회는 login 페이지에서 처리
  return (
    <div className="max-w-[964px] mx-auto px-6 py-10">
      <RegisterCard
        title="내 가게"
        description="내 가게를 소개하고 공고도 등록해 보세요."
        buttonText="가게 등록하기"
        onClick={() => router.push("/shops/new")}
      />
    </div>
  );
}
*/
