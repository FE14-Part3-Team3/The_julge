"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button/Button";
import { Section } from "../Section/Section";

interface RegisterCardProps {
  title: string;
  description: string;
  buttonText: string;
  onClick?: () => void;
}

export default function RegisterCard({
  description,
  buttonText,
  onClick,
}: RegisterCardProps) {
  const router = useRouter();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768); // 모바일 감지
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Section name="내 가게">
      <div className="flex flex-col h-[217px] items-center justify-center text-center gap-6 border border-gray-20 rounded-2xl p-6 md:p-8 bg-white">
        <p className="text-[14px] md:text-[16px] text-gray-700">
          {description}
        </p>
        <Button
          onClick={onClick ?? (() => router.push("/shops/register"))}
          variant="primary"
          size={isMobile ? "sm" : "lg"}
        >
          {buttonText}
        </Button>
      </div>
    </Section>
  );
}
