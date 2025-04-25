"use client";
import React from "react";
import Pagination from "@/components/Pagination/Pagination";

export default function Home() {
    const [currentPage, setCurrentPage] = React.useState(1); // 현재 페이지 상태
    const totalItems = 100; // 총 아이템 수
    const itemsPerPage = 5; // 페이지당 아이템 수

    const handlePageChange = (page: number) => {
        console.log(`현재 페이지: ${page}`);
        setCurrentPage(page);
    };

    return (
        <div className="bg-white">
            <Pagination
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
}
