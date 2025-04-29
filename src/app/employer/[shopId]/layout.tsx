import React from "react";

export const metadata = {
  title: "내 가게 정보",
};

export default function ShopDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 메인 콘텐츠 */}
      <main className="flex-grow flex justify-center items-start pt-16 px-4">
        {children}
      </main>
    </div>
  );
}
