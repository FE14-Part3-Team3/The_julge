"use client";

import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import AlertModal from "@/components/Modal/AlertModal";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface LoginForm {
  email: String;
  password: String;
}

export default function LoginPage() {
  const router = useRouter();
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      const response = await fetch(
        "https://bootcamp-api.codeit.kr/api/0-1/the-julge/token",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        setIsOpenAlert(true);
      }

      const result = await response.json();
      console.log("로그인 성공", result);

      //토큰 저장
      localStorage.setItem("token", result.item.token);

      router.push("/dashboard");
    } catch (err: any) {
      console.error("로그인 실패", err);
    }
  };

  return (
    <main className="w-[350px] flex flex-col align-center mt-[139px] sm:mt-[279px] lg:mt-[312px] mx-auto">
      <h1 className="flex justify-center">
        <Link
          href="/"
          className="relative inline-block w-[208px] h-[38px] sm:w-[248px] sm:h-[45px]"
        >
          <Image
            src="/assets/images/logo.png"
            alt="더줄게 로고"
            fill
            priority
            sizes="(max-width: 640px) 208px, 248px"
            className="object-contain"
          />
        </Link>
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full mt-10 flex flex-col gap-7"
      >
        <Input
          label="이메일"
          type="email"
          placeholder="입력"
          {...register("email", {
            required: "이메일을 입력해주세요.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "이메일 형식으로 작성해 주세요.",
            },
          })}
          isError={!!errors.email}
          errorText={errors.email?.message}
        />
        <Input
          label="비밀번호"
          type="password"
          placeholder="입력"
          {...register("password", {
            required: "비밀번호를 입력해주세요.",
            minLength: { value: 8, message: "8자 이상 입력해 주세요." },
          })}
          isError={!!errors.password}
          errorText={errors.password?.message}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "로딩 중..." : "로그인 하기"}
        </Button>
      </form>
      <p className="text-center mt-4 sm:mt-5 text-black text-normal ">
        회원이 아니신가요?{" "}
        <Link
          href="/signup"
          className="text-[#5534DA] underline underline-offset-4"
        >
          회원가입하기
        </Link>
      </p>
      {isOpenAlert && (
        <AlertModal type="password" onClose={() => setIsOpenAlert(false)} />
      )}
    </main>
  );
}
