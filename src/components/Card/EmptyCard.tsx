"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button/Button";
import { Section } from "../Section/Section";

interface RegisterCardProps {
  description: string;
}
export default function EmptyCard({
  description,
}: RegisterCardProps) {
  
  return (
    <div className="flex flex-col h-[217px] items-center justify-center text-center gap-6 border border-gray-20 rounded-2xl p-6 md:p-8 bg-white">
      <p className="text-[14px] md:text-[16px] text-gray-700">
        {description}
      </p>
    </div>
  );
}
