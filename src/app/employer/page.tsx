"use client";

import React from "react";
import Button from "@/components/Button/Button";
import "@/styles/employer.css";
import { useRouter } from "next/navigation";

export default function EmployerPage() {
  const router = useRouter();

  const handleRegisterClick = () => {
    router.push("/shops/register");
  };

  return (
    <div className="employerContainer">
      <h1 className="employerTitle">내 가게</h1>
      <div className="employerCard">
        <p className="employerText">내 가게를 소개하고 공고도 등록해 보세요.</p>
        <Button onClick={handleRegisterClick}>가게 등록하기</Button>
      </div>
    </div>
  );
}
