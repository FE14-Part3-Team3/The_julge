"use client";
import React from "react";
import ChevronButton from "./ChevronButton";
import PageButton from "./PageButton";

interface PaginationProps {
    totalItems: number; // 총 아이템 수
    itemsPerPage: number; // 페이지당 아이템 수
    currentPage: number; // 현재 페이지
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    totalItems,
    itemsPerPage,
    currentPage,
    onPageChange,
}) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    const getVisiblePageNumbers = () => {
        if (totalPages <= 7) {
            return pageNumbers;
        }

        let startPage = Math.max(1, currentPage - 3);
        let endPage = Math.min(totalPages, startPage + 6);

        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(1, endPage - 6);
        }

        return pageNumbers.slice(startPage - 1, endPage);
    };

    const visiblePageNumbers = getVisiblePageNumbers();

    return (
        <div className="flex items-center justify-center">
            <div className="mr-5">
                <ChevronButton
                    direction="left"
                    isDisabled={currentPage === 1}
                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                />
            </div>

            <div className="flex space-x-1">
                {visiblePageNumbers.map((pageNumber) => (
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
                    onClick={() =>
                        onPageChange(Math.min(totalPages, currentPage + 1))
                    }
                />
            </div>
        </div>
    );
};

export default Pagination;
