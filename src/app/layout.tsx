"use client";

import React from "react";
import "./globals.css";
import Providers from "./providers";
import { QueryClientProvider } from "@tanstack/react-query";
import { createQueryClient } from "@/lib/react-query";
{
  /* Providers 전역 상태 관리 또는 라이브러리 설정용  */
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const queryClient = createQueryClient();

  return (
    <html lang="ko">
      <body>
        <QueryClientProvider client={queryClient}>
          <Providers>{children}</Providers>{" "}
          {/* Providers 전역 상태 관리 또는 라이브러리 설정용  */}
        </QueryClientProvider>
      </body>
    </html>
  );
}
