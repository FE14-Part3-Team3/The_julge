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
  const router = useRouter(); //라우터 객체를 가져옵니다.
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [newUserId, setNewUserId] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<AlertType>("signup"); //상황에 따라 모달의 다른 메시지를 불러옵니다.
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    getValues, //폼의 필드에 입력된 값을 불러오는 함수 입니다.
  } = useForm<SignUpForm>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      password_confirm: "", //비밀번호 확인을 저장하는 필드입니다.
      type: "employee",
    },
  });

  //모달이 닫히는 경우를 가정하고 저장된 새로운 UserId가 있는 경우 해당 페이지로 이동합니다.
  const handleClose = () => {
    setIsOpenAlert(false);
    if (newUserId) {
      router.push(newUserId);
    }
  };

  const onSubmit: SubmitHandler<SignUpForm> = async (data) => {
    //네트워크 요청
    try {
      const response = await fetch(
        "https://bootcamp-api.codeit.kr/api/0-1/the-julge/users",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      //오류시 반환데이터를 throw
      if (!response.ok) {
        throw await response.json();
      }

      const result = await response.json();
      localStorage.setItem("token", result.item.token);

      setIsOpenAlert(true);
      setAlertType("signup"); //회원가입이 성공했음을 알리는 모달타입으로 변경
      setNewUserId(result.item.id);
      //throw한 반환 데이터를 받아 상세한 에러처리
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
            //로그인 페이지의 로직과 동일합니다. 로그인 페이지 참고
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
            //상동
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
              //커스텀 유효성 검사 함수를 받을 수 있는 validate속성입니다.
              notMatched: (value) => {
                const { password } = getValues(); //현재 password 필드의 값을 구조분해 할당을 통해 가져옵니다.
                return value === password || "비밀번호가 일치하지 않습니다."; //value에 현재 register가 참조하는 필드의 입력값이 호출되고 Password값과 비교하게 됩니다.
              },
            },
          })}
          isError={!!errors.password_confirm}
          errorText={errors.password_confirm?.message}
        />
        <Controller //커스텀 인풋을 다룰 때 사용하는 패턴입니다.
          name="type"
          control={control}
          render={(
            { field } //render패턴을 이용해 컨트롤하고 싶은 컴포넌트를 직접 선언해서 사용할 수 있습니다.
          ) => (
            <MemberTypeRadioInput //Controller컴포넌트의 설계자체가 render프롭을 통해 커스텀 컴포넌트를 받을 수 있게 설계되어 있습니다.
              checkedMemberType={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "로딩 중..." : "가입하기"}
        </Button>
      </form>
      <p className="text-center mt-4 sm:mt-5 text-black text-normal ">
        이미 가입하셨나요?{" "}
        <Link
          href="/signup"
          className="text-[#5534DA] underline underline-offset-4"
        >
          로그인하기
        </Link>
      </p>
      {isOpenAlert && <AlertModal type={alertType} onClose={handleClose} />}
    </main>
  );
}
