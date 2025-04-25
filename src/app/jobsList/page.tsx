'use client'

import { useNoticeList } from "@/hooks/api/useNoticeList"
import { usePagination } from "@/hooks/api/usePagination"
import { GetShopNoticesQuery } from "@/types/common"
import { useState } from "react"

export default function NoticeListPage() {

  const shopId = 'abc123' // 실제 shop_id로 대체


  const [query, setQuery] = useState<GetShopNoticesQuery>({
    offset: 0,
    limit: 10,
    keyword: '',
  })

  const [form, setForm] = useState({
    hourlyPay: 10000,
    startsAt: new Date().toISOString(),
    workhour: 4,
    description: '테스트 공고입니다',
  })

  const { data, isLoading, isError, error } = useNoticeList(query)

 

  const {
    currentPage,
    totalPages,
    pageList,
    goToPage,
    goToNext,
    goToPrev
  } = usePagination({
    offset: query.offset,
    limit: query.limit,
    totalCount: data?.count,
    setQuery,
    pageRange: 7,
  })

  if (isLoading) return <div>로딩 중...</div>
  if (isError) return <div>에러 발생: {error?.message}</div>

  return (
    <div>

      <ul>
        {data?.items.map(({ item }) => (
          <li key={item.id}>{item.description}</li>
        ))}
      </ul>
      <button onClick={() => goToPrev()}
        disabled={currentPage === 1}
        >Prev</button>
      {pageList.map((page) => (
        <button
          key={page}
          onClick={() => goToPage(page)}
          className={page === currentPage ? 'bg-blue-500 text-grey' : ''}
        >
          {page}
        </button>
      ))}
      <button 
      onClick={() => goToNext()}
        disabled={currentPage === totalPages}
        >
          Next
        </button>
    </div>
  )
}
