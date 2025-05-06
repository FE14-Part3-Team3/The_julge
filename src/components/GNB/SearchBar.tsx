import clsx from "clsx";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface SearchBarProp {
  className: string;
}

interface SearchFormInput {
  query: string;
}

export default function SearchBar({ className }: SearchBarProp) {
  const { register, handleSubmit, setValue } = useForm<SearchFormInput>();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const currentKeyword = searchParams.get("keyword");
    if (currentKeyword) {
      setValue("query", currentKeyword);
    }
  }, [searchParams, setValue]);

  const onSubmit: SubmitHandler<SearchFormInput> = (data) => {
    const searchTerm = data.query.trim();
    const currentParams = new URLSearchParams(
      Array.from(searchParams.entries())
    );

    if (searchTerm) {
      currentParams.set("keyword", searchTerm);
      currentParams.set("offset", "0");
    } else {
      currentParams.delete("keyword");
    }
    router.push(`/?${currentParams.toString()}`, { scroll: false });
  };

  return (
    <form
      className={clsx("w-full h-[40px] relative", className)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <button
        type="submit"
        className="absolute top-[12px] left-[8px]"
        aria-label="검색"
      >
        <Image
          src={"/assets/icons/search.svg"}
          alt="검색"
          width={16}
          height={16}
        />
      </button>
      <input
        type="search"
        className="bg-gray-10 w-full p-2 pl-[32px] rounded-[10px]"
        placeholder="가게 이름으로 찾아보세요"
        {...register("query")}
        aria-label="검색어 입력"
      />
    </form>
  );
}
