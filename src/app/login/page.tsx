"use client";

import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import AlertModal from "@/components/Modal/AlertModal";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; //페이지 이동을 위한 라우터
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"; //폼관리를 도와주는 라이브러리

//useForm에 전달하면 타입추론을 지원해주기 때문데 폼의 데이터 타입 정의
interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter(); //라우터 객체를 가져옵니다. 페이지 이동에 사용됩니다.
  const [isOpenAlert, setIsOpenAlert] = useState(false); //모달의 열고/닫힘을 상태를 관리합니다.

  //useForm<LoginForm>으로 사용을 하고 필요한 것들을 구조분해 할당으로 꺼냄
  const {
    register, //폼 제출할 때 데이터 유효성 검증 react-hook-form에 등록하는 함수
    handleSubmit, //폼 제출 시 유효성 검사를 실행, 성공하면 onSubmit 콜백을 호출합니다.
    formState: { errors, isSubmitting }, //폼 상태 객체 입니다. errors: (유효성 검사 에러 객체), isSubmitting: (폼 제출 진행 중 여부 관리)
  } = useForm<LoginForm>({
    mode: "onBlur", //focus가 떠날 때 유효성 검사 실행
    defaultValues: {
      email: "", //이메일 필드의 기본값
      password: "", //비밀번호 필드의 기본값
    },
  });

  //모달의 close이벤트가 발생할때 false로 상태를 업데이트 합니다.
  const handleClose = () => {
    setIsOpenAlert(false);
  };

  //폼이 제출될때 실행될 실행될 콜백함수를 정의합니다.
  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      //네트워크 요청 전송
      const response = await fetch(
        "https://bootcamp-api.codeit.kr/api/0-1/the-julge/token",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      //response의 상태를 감지해 정상 반환 상태코드가 아닌 경우 catch에 반환값을 전달합니다.
      if (!response.ok) {
        throw await response.json();
      }

      //정상 반환의 경우 개인 페이지로 이동합니다.
      const result = await response.json();
      router.push(result.item.user.item.id);
    } catch (err: any) {
      //로그인이 실패했음을 알리는 모달을 엽니다.
      setIsOpenAlert(true);
    }
  };

  return (
    // 로고 부분입니다.
    <main className="w-[350px] flex flex-col mt-[139px] sm:mt-[279px] lg:mt-[312px] mx-auto">
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
      {/* 폼을 생성합니다. */}
      <form
        onSubmit={handleSubmit(onSubmit)} //제출될 때 실행됩니다.
        className="w-full mt-10 flex flex-col gap-7"
      >
        <Input //공통 컴포넌트를 연결합니다.
          label="이메일"
          type="email"
          placeholder="입력"
          {...register("email", {
            //email필드에 값을 등록합니다.
            required: "이메일을 입력해주세요.", //값이 비여있을때 errors.email에 반환되는 메시지입니다.
            pattern: {
              //유효성 검증을 실행할 정규표현식과 메시지를 전달합니다.
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "이메일 형식으로 작성해 주세요.",
            },
          })}
          //Input 컴포넌트에 전달하는 props입니다.
          isError={!!errors.email} //!!연산자를 통해서 메시지가 존재하는 경우 -> !를 통해서 false가 됩니다. -> 한 번 더!를 통해서 true가 반환됩니다.
          errorText={errors.email?.message} //errors.email에 등록된 메시지를 전달합니다.
        />
        <Input //공통 컴포넌트를 연결합니다.
          label="비밀번호"
          type="password"
          placeholder="입력"
          {...register("password", {
            //password필드에 값을 등록합니다.
            required: "비밀번호를 입력해주세요.", //값이 비여있을때 errors.password에 반환되는 메시지입니다.
            minLength: { value: 8, message: "8자 이상 입력해 주세요." }, //최소값을 요구하는 패턴입니다.
          })}
          isError={!!errors.password} //!!연산자를 통해서 메시지가 존재하는 경우 -> !를 통해서 false가 됩니다. -> 한 번 더!를 통해서 true가 반환됩니다.
          errorText={errors.password?.message} //errors.password에 등록된 메시지를 전달합니다.
        />
        <Button type="submit" disabled={isSubmitting}>
          {" "}
          {/* disabled에 isSubmitting을 전달해 요청중에 비활성화 되도록 합니다. */}
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
      {/* 상태를 통해 모달의 열고 닫힘을 관리합니다. */}
      {isOpenAlert && <AlertModal type="password" onClose={handleClose} />}
    </main>
  );
}
