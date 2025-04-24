"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button/Button";

interface RegisterCardProps {
  title: string;
  description: string;
  buttonText: string;
  onClick?: () => void;
}

export default function RegisterCard({
  title,
  description,
  buttonText,
  onClick,
}: RegisterCardProps) {
  const router = useRouter();

  // 모바일 여부 판단
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // 초기 실행
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full px-3 sm:px-10 md:px-[32px] py-60 max-w-[964px] mx-auto ui-simple-layout_container">
      <h1 className="text-[22px] sm:text-[28px] font-bold text-start mb-6 ui-simple-layout_title">
        {title}
      </h1>

      <div className="flex flex-col items-center justify-center text-center gap-6 border border-gray-20 rounded-2xl p-8 bg-white ui-register-layout_wrapper">
        <p className="text-[14px] sm:text-[16px] text-gray-700 ui-register-layout_text">
          {description}
        </p>
        <div className="ui-register-layout_buttonWrapper">
          <Button
            onClick={onClick ?? (() => router.push("/shops/register"))}
            variant="primary"
            size={isMobile ? "sm" : "lg"}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
}
