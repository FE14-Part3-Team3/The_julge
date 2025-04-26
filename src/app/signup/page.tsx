"use client";

import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import AlertModal, { AlertType } from "@/components/Modal/AlertModal";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import MemberTypeRadioInput, {
  MemberType,
} from "./components/MemberTypeRadioInput";

interface SignUpForm {
  email: string;
  password: string;
  password_confirm: string;
  type: MemberType;
}

export default function LoginPage() {
  const router = useRouter();
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [newUserId, setNewUserId] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<AlertType>("signup");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<SignUpForm>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      password_confirm: "",
      type: "employee",
    },
  });

  const handleClose = () => {
    setIsOpenAlert(false);
    if (newUserId) {
      router.push(newUserId);
    }
  };

  const onSubmit: SubmitHandler<SignUpForm> = async (data) => {
    try {
      const response = await fetch(
        "https://bootcamp-api.codeit.kr/api/0-1/the-julge/users",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw await response.json();
      }

      const result = await response.json();

      setIsOpenAlert(true);
      setAlertType("signup");
      setNewUserId(result.item.id);
    } catch (err: any) {
      if (err.status === 409) setAlertType("email");
      else setAlertType("generic");
      setIsOpenAlert(true);
    }
  };

  return (
    <main className="w-[350px] flex flex-col align-center mt-[73px] sm:mt-[139px] lg:mt-[156px] mx-auto">
      <h1 className="flex justify-center">
        <Link
          href="/"
          className="relative inline-block w-[208px] h-[38px] sm:w-[248px] sm:h-[45px]"
        >
          <Image
            src="/assets/images/logo.svg"
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
        <Input
          label="비밀번호 확인"
          type="password"
          placeholder="입력"
          {...register("password_confirm", {
            required: {
              value: true,
              message: "비밀번호를 다시 한 번 입력해주세요.",
            },
            validate: {
              notMatched: (value) => {
                const { password } = getValues();
                return value === password || "비밀번호가 일치하지 않습니다.";
              },
            },
          })}
          isError={!!errors.password_confirm}
          errorText={errors.password_confirm?.message}
        />
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <MemberTypeRadioInput
              checkedMemberType={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "로딩 중..." : "가입하기"}
        </Button>
      </form>
      {isOpenAlert && <AlertModal type={alertType} onClose={handleClose} />}
    </main>
  );
}
