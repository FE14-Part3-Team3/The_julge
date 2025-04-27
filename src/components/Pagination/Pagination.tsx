"use client";
import React from "react";
import ChevronButton from "./ChevronButton";
import PageButton from "./PageButton";

interface PaginationProps {
    totalItems: number; // 총 아이템 수
    itemsPerPage: number; // 페이지당 아이템 수
    currentPage: number; // 현재 페이지
    onPageChange: (page: number) => void;
    pageRange?: number; // 표시할 페이지 범위 (기본값: 5)
}

const Pagination: React.FC<PaginationProps> = ({
    totalItems,
    itemsPerPage,
    currentPage,
    onPageChange,
    pageRange = 5,
}) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // 현재 페이지 그룹의 시작 페이지 계산 (usePagination 훅과 일치하도록)
    const pageGroupStart =
        Math.floor((currentPage - 1) / pageRange) * pageRange + 1;

    // 페이지 목록 생성
    const getPageList = () => {
        const end = Math.min(pageGroupStart + pageRange - 1, totalPages);
        return Array.from(
            { length: end - pageGroupStart + 1 },
            (_, i) => pageGroupStart + i
        );
    };

    const pageList = getPageList();

    // 이전/다음 페이지 그룹으로 이동 (usePagination 훅의 로직과 일치)
    const goToPrev = () => {
        const prevPage = currentPage - pageRange;
        if (prevPage < 1) {
            onPageChange(1); // 첫 페이지로
        } else {
            onPageChange(prevPage);
        }
    };

    const goToNext = () => {
        const nextPage = currentPage + pageRange;
        if (nextPage > totalPages) {
            onPageChange(totalPages); // 마지막 페이지로
        } else {
            onPageChange(nextPage);
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div className="mr-5">
                <ChevronButton
                    direction="left"
                    isDisabled={currentPage === 1}
                    onClick={goToPrev}
                />
            </div>

            <div className="flex gap-2">
                {pageList.map((pageNumber) => (
                    <PageButton
                        key={pageNumber}
                        pageNumber={pageNumber}
                        isActive={currentPage === pageNumber}
                        onClick={() => onPageChange(pageNumber)}
                    />
                ))}
            </div>

            <div className="ml-5">
                <ChevronButton
                    direction="right"
                    isDisabled={currentPage === totalPages}
                    onClick={goToNext}
                />
            </div>
        </div>
    );
};

export default Pagination;
