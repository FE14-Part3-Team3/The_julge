'use client'

import { useNoticeList } from "@/hooks/api/useNoticeList"
import { GetNoticeListResponse } from "@/types/api/notice"
import { GetShopNoticesQuery } from "@/types/common"
import { useState } from "react"

export default function NoticeListPage() {

  const [query, setQuery] = useState<GetShopNoticesQuery>({
    offset: 0,
    limit: 10,
    keyword: '',
  })

  const { data, isLoading, isError, error } = useNoticeList(query)

  const extractQueryFromHref = (href: string): GetShopNoticesQuery => {
    const baseURL = process.env.NEXT_PUBLIC_API_URL
    const url = new URL(href, baseURL)
    return {
      offset: Number(url.searchParams.get('offset')),
      limit: Number(url.searchParams.get('limit')),
    }
  }

  const goTo = (rel: 'next' | 'prev') => {
    const href = data?.links.find(l => l.rel === rel)?.href
    if (!href) return
    console.log(href);
    const nextQuery = extractQueryFromHref(href)
    setQuery(prev => ({ ...prev, ...nextQuery }))
  }
  if (isLoading) return <div>로딩 중...</div>
  if (isError) return <div>에러 발생: {error?.message}</div>

  return (
    <div>
      <ul>
        {data?.items.map(({ item }) => (
          <li key={item.id}>{item.description}</li>
        ))}
      </ul>

      <div className="flex gap-4 mt-4">
        <button onClick={() => goTo('prev')} disabled={!data?.links.some(l => l.rel === 'prev')}>
          이전
        </button>
        <button onClick={() => goTo('next')} disabled={!data?.links.some(l => l.rel === 'next')}>
          다음
        </button>
      </div>
    </div>
  )
}
