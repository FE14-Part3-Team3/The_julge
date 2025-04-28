import React from "react";

interface PageButtonProps {
    pageNumber: number; // 페이지 번호
    isActive: boolean; // 선택한 페이지
    onClick: () => void;
}

const PageButton: React.FC<PageButtonProps> = ({
    pageNumber,
    isActive,
    onClick,
}) => {
    const variantClass = isActive
        ? "w-[40px] h-[40px] bg-red-30 text-white"
        : "w-[40px] h-[40px] bg-white text-black";

    return (
        <button
            onClick={onClick}
            className={`${variantClass} rounded focus:outline-none`}
        >
            {pageNumber}
        </button>
    );
};

export default PageButton;
