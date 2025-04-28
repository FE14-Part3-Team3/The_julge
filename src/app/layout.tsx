import React from "react";
import "./globals.css";
import Providers from "./providers";    {/* Providers 전역 상태 관리 또는 라이브러리 설정용  */}

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="ko">
        <body>
          <Providers>{children}</Providers>  {/* Providers 전역 상태 관리 또는 라이브러리 설정용  */}
        </body>
      </html>
    );
}
