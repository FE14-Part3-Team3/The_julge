export const calculateEndDate = (startsAt: string, workhour: number): Date => {
    const startDate = new Date(startsAt);
    return new Date(startDate.getTime() + workhour * 60 * 60 * 1000);
};

// 날짜 및 시간 형식 지정 (YYYY-MM-DD HH:mm)
export const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
};

// 시간만 표시하는 함수 (HH:mm)
export const formatTime = (date: Date): string => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
};

// 시급 차이 계산
export const calculateHourlyPayDiff = (
    hourlyPay: number,
    originalHourlyPay: number
): { isPayDiff: boolean; isPayHigher: boolean; payDiffText: string } => {
    const hourlyPayDiff = (hourlyPay / originalHourlyPay) * 100;
    const isPayDiff = hourlyPayDiff !== 100;
    const isPayHigher = hourlyPayDiff > 100;
    const payDiffText = isPayHigher
        ? `기존 시급보다 ${(hourlyPayDiff - 100).toFixed(0)}% ⬆︎`
        : `기존 시급보다 ${(100 - hourlyPayDiff).toFixed(0)}% ⬇︎`;
    return { isPayDiff, isPayHigher, payDiffText };
};
