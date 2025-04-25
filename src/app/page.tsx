'use client'

import { useLogin } from "@/hooks/api/useAuthentication";
import { useNoticeList } from "@/hooks/api/useNoticeService"
import { GetShopNoticesQuery } from "@/types/common"
import { useState } from "react"

export default function NoticeListPage() {

  const token = localStorage.getItem('token');

  const login = useLogin();
  
  const [query, setQuery] = useState<GetShopNoticesQuery>({
    offset: 0,
    limit: 10,
    keyword: '',
  });

  const { data, isLoading, isError, error } = useNoticeList(query);

  if (isLoading) return <div>로딩 중...</div>
  if (isError) return <div>에러 발생: {error?.message}</div>

  return (
    <div>
      <h2>{token}</h2>
      <button onClick={() => login.mutate({ email: 'owner824@gmail.com', password: '123456' })}>사장 로그인</button>
      <button onClick={() => login.mutate({ email: 'test824@gmail.com', password: '123456' })}>일반 로그인</button>
      <ul>
        {data?.items.map(({ item }) => (
          <li key={item.id}>{item.description}</li>
        ))}
      </ul>
    </div>
  )
}
