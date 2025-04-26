import React from "react";

type Direction = "left" | "right";

interface ChevronButtonProps {
    direction: Direction; // 화살표 방향
    isDisabled: boolean; // 버튼 비활성화 여부
    onClick: () => void;
}
// 화살표 버튼 컴포넌트
const ChevronButton: React.FC<ChevronButtonProps> = ({
    direction,
    isDisabled,
    onClick,
}) => {
    const iconSrc = isDisabled
        ? "/assets/icons/chevron/chevron-outline.svg"
        : "/assets/icons/chevron/chevron.svg";

    // 화살표 방향에 따라 회전 클래스 설정
    const rotationClass = direction === "right" ? "rotate-180" : "";

    return (
        <button onClick={onClick} className="rounded" disabled={isDisabled}>
            <img
                src={iconSrc}
                alt={`${direction} chevron`}
                className={`w-4 h-4 ${rotationClass}`}
            />
        </button>
    );
};

export default ChevronButton;
