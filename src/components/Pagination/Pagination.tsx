"use client";
import React from "react";
import ChevronButton from "./ChevronButton";
import PageButton from "./PageButton";
import { usePagination } from "@/hooks/usePagination";

interface PaginationProps {
  totalItems: number; // 총 아이템 수
  itemsPerPage: number; // 페이지당 아이템 수
  currentOffset: number; // 현재 페이지
  pageRange?: number; // 표시할 페이지 범위
  onPageChange: (query: {
    offset: number;
    limit: number;
    count?: number;
    hasNext?: boolean;
    address?: string[];
    keyword?: string;
    startsAtGte?: string;
    hourlyPayGte?: number;
    sort?: "time" | "pay" | "hour" | "shop";
  }) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentOffset,
  onPageChange,
  pageRange = 7,
}) => {
  // usePagination 훅 사용
  const { currentPage, totalPages, pageList, goToPage, goToNext, goToPrev } =
    usePagination({
      offset: currentOffset,
      limit: itemsPerPage,
      totalCount: totalItems,
      pageRange,
      setQuery: onPageChange,
    });

  // 페이지 클릭 핸들러 - 훅의 goToPage 함수 활용
  const handlePageClick = (pageNumber: number) => {
    goToPage(pageNumber);
  };

  return (
    <div className="flex items-center justify-center">
      {/* 총 페이지가 8 이상일 때만 왼쪽 화살표 표시 */}
      {totalPages >= 8 ? (
        <div className="mr-5">
          <ChevronButton
            direction="left"
            isDisabled={currentPage === 1}
            onClick={goToPrev}
          />
        </div>
      ) : null}

      <div className="flex gap-2">
        {pageList.map((pageNumber) => (
          <PageButton
            key={pageNumber}
            pageNumber={pageNumber}
            isActive={currentPage === pageNumber}
            onClick={() => handlePageClick(pageNumber)}
          />
        ))}
      </div>

      {/* 총 페이지가 8 이상일 때만 오른쪽 화살표 표시 */}
      {totalPages >= 8 ? (
        <div className="ml-5">
          <ChevronButton
            direction="right"
            isDisabled={currentPage === totalPages}
            onClick={goToNext}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Pagination;
