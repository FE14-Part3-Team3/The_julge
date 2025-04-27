"use client";
import React, { useState, useEffect } from "react";
import Pagination from "@/components/Pagination/Pagination";

// 테스트용 더미 데이터 생성 함수
const generateDummyData = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        title: `항목 ${i + 1}`,
        description: `이것은 항목 ${i + 1}에 대한 설명입니다.`,
    }));
};

export default function PaginationTestPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(100);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // 더미 데이터 생성
    const allItems = generateDummyData(totalItems);

    // 현재 페이지에 표시할 항목들
    const currentItems = allItems.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page: number) => {
        console.log(`페이지 변경: ${page}`);
        setCurrentPage(page);
        // 페이지 맨 위로 스크롤
        window.scrollTo(0, 0);
    };

    // 설정값 변경 핸들러
    const handleTotalItemsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value > 0) {
            setTotalItems(value);
            if (currentPage > Math.ceil(value / itemsPerPage)) {
                setCurrentPage(1);
            }
        }
    };

    const handleItemsPerPageChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const value = parseInt(e.target.value);
        setItemsPerPage(value);
        setCurrentPage(1); // 페이지당 항목 수 변경 시 첫 페이지로 이동
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white">
            <h1 className="text-green-20 text-2xl font-bold mb-6">
                페이지네이션 테스트
            </h1>

            {/* 설정 패널 */}
            <div className="bg-gray-10 p-4 rounded-lg mb-8">
                <h2 className="text-black text-lg font-semibold mb-4">
                    페이지네이션 설정
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-black block text-sm font-medium mb-1">
                            총 항목 수:
                        </label>
                        <input
                            type="number"
                            min="1"
                            value={totalItems}
                            onChange={handleTotalItemsChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="text-black block text-sm font-medium mb-1">
                            페이지당 항목 수:
                        </label>
                        <select
                            value={itemsPerPage}
                            onChange={handleItemsPerPageChange}
                            className="w-full px-3 py-2 border rounded"
                        >
                            <option value="5">5개</option>
                            <option value="10">10개</option>
                            <option value="20">20개</option>
                            <option value="50">50개</option>
                        </select>
                    </div>
                </div>
                <div className="mt-4">
                    <p className="text-sm">
                        총 {totalItems}개 항목,{" "}
                        {Math.ceil(totalItems / itemsPerPage)}개 페이지, 현재{" "}
                        {currentPage} 페이지 (
                        {(currentPage - 1) * itemsPerPage + 1}-
                        {Math.min(currentPage * itemsPerPage, totalItems)}번
                        항목 표시)
                    </p>
                </div>
            </div>

            {/* 현재 페이지 항목 목록 */}
            <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4">현재 페이지 항목</h2>
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    {currentItems.length > 0 ? (
                        <ul className="divide-y divide-gray-200">
                            {currentItems.map((item) => (
                                <li
                                    key={item.id}
                                    className="p-4 hover:bg-gray-50"
                                >
                                    <h3 className="font-medium">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {item.description}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="p-4 text-center text-gray-500">
                            항목이 없습니다.
                        </p>
                    )}
                </div>
            </div>

            {/* 페이지네이션 컴포넌트 */}
            <div className="my-8">
                <Pagination
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>

            {/* 디버그 정보 */}
            <div className="bg-gray-100 p-4 rounded-lg">
                <h2 className="text-black text-lg font-semibold mb-2">
                    페이지네이션 디버그 정보
                </h2>
                <pre className="bg-gray-800 text-white p-3 rounded text-sm overflow-x-auto">
                    {JSON.stringify(
                        {
                            totalItems,
                            itemsPerPage,
                            currentPage,
                            totalPages: Math.ceil(totalItems / itemsPerPage),
                            displayedItems: {
                                from: (currentPage - 1) * itemsPerPage + 1,
                                to: Math.min(
                                    currentPage * itemsPerPage,
                                    totalItems
                                ),
                                count: currentItems.length,
                            },
                        },
                        null,
                        2
                    )}
                </pre>
            </div>
        </div>
    );
}
