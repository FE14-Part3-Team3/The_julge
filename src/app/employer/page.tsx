"use client";

import React from "react";
import RegisterCard from "@/components/Card/RegisterCard";

export default function EmployerPage() {
  return (
    <RegisterCard
      title="내 가게"
      description="내 가게를 소개하고 공고도 등록해 보세요."
      buttonText="가게 등록하기"
    />
  );
}
