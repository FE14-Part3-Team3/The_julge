import React from "react";
import Link from "next/link";
import GNB from "@/components/Header/Header";
// import Footer from '@/components/Footer/Footer'

export const metadata = {
  title: "내 가게",
};

export default function EmployerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* GNB: 노란색 배경, 텍스트 항목 */}
      <GNB />

      {/* 메인 콘텐츠 영역 */}
      <main className="flex-grow bg-white">{children}</main>

      {/* Footer: 회색 배경 */}
      <footer className="bg-gray-30 py-4 px-6 text-center">
        <p className="text-black">© 2025 The Julge. All rights reserved.</p>
      </footer>
    </div>
  );
}
