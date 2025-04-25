import React from "react";

export const metadata = {
  title: "내 가게",
};

export default function EmployerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 상단 네비게이션
      <GNB /> */}

      {/* 메인 콘텐츠 */}
      <main className="flex-grow flex justify-center items-start pt-16 px-4">
        {children}
      </main>

      {/* 하단 푸터 */}
      {/* <footer className="bg-gray-100 py-4 px-6 text-center text-sm text-gray-600">
        © 2025 The Julge. All rights reserved.
      </footer> */}
    </div>
  );
}
