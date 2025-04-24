'use client'

import { useNoticeList } from "@/hooks/api/useNoticeList"

export default function NoticeListPage() {
  const { data, isLoading, isError, error } = useNoticeList({
    offset: 0,
    limit: 10,
    keyword: '',
  })

  if (isLoading) return <div>로딩 중...</div>
  if (isError) return <div>에러 발생: {error?.message}</div>

  return (
    <ul>
      {data?.items.map((wrapper) => (
        <li key={wrapper.item.id} className="p-4 border-b">
          <h2 className="text-lg font-bold">{wrapper.item.shop.item.name}</h2>
          <p>{wrapper.item.description}</p>
          <span>{wrapper.item.hourlyPay.toLocaleString()}원/시</span>
        </li>
      ))}
    </ul>
  )
}
