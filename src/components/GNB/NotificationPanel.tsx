import React from "react";
import type { AlertItem, AlertItemWrapper } from "@/types/api/user";

const NotificationItem = ({ notification }: { notification: AlertItem }) => {
  const isApproved = notification.result === "accepted";
  const statusText = isApproved ? "승인" : "거절";
  const statusTextColor = isApproved ? "text-blue-20" : "text-red-40";
  const statusDotColor = isApproved ? "bg-blue-20" : "bg-red-40";

  return (
    <div className="p-3 border-b border-gray-200 last:border-b-0 flex items-start gap-2.5">
      <div
        className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${statusDotColor}`}
      ></div>
      <div className="flex flex-col text-sm">
        <p className="leading-tight">
          {/* 알림 내용 표시 방식 조정 필요 */}
          {notification.shop.item.name}({notification.notice.item.startsAt})
          공고 지원이{" "}
          <span className={`font-semibold ${statusTextColor}`}>
            {statusText}
          </span>
          되었어요.
        </p>
        <p className="text-xs text-gray-500 mt-1">{notification.createdAt}</p>
      </div>
    </div>
  );
};

// --- 메인 알림 패널 컴포넌트 ---
interface NotificationPanelProps {
  notifications: AlertItemWrapper[]; // 알림 목록
  isLoading?: boolean; // 로딩 상태
  isError?: boolean; // 에러 상태
  onClose: () => void; // 닫기 함수
}

const NotificationPanel = ({
  notifications = [], // 기본값 빈 배열
  onClose,
}: NotificationPanelProps) => {
  const notificationCount = notifications.length;
  // 로딩/에러 상태에 따라 다른 제목 표시 가능
  const title = `알림 ${notificationCount}개`;

  return (
    <div
      className="fixed inset-0 bg-pink-50 z-50 flex flex-col
                 sm:absolute sm:top-16 sm:right-4 sm:w-80 sm:max-w-sm
                 sm:rounded-lg sm:shadow-lg sm:border sm:border-gray-200
                 sm:inset-auto sm:max-h-[calc(100vh-8rem)] sm:h-auto"
      onClick={(e) => e.stopPropagation()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="notification-title"
    >
      {/* 헤더 */}
      <div className="flex justify-between items-center p-4 border-b border-gray-300 flex-shrink-0 bg-pink-50 md:rounded-t-lg">
        <h2
          id="notification-title"
          className="text-lg font-semibold text-gray-800"
        >
          {title}
        </h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-800 text-2xl leading-none p-1 -mr-1"
          aria-label="알림 닫기"
        >
          ×
        </button>
      </div>

      {/* 알림 목록 */}
      <div className="overflow-y-auto flex-grow">
        {notificationCount === 0 && (
          <p className="p-6 text-center text-gray-500">
            새로운 알림이 없습니다.
          </p>
        )}
        {notificationCount > 0 &&
          notifications.map((notif) => (
            <NotificationItem key={notif.item.id} notification={notif.item} />
          ))}
        {/* TODO: '더 보기' 버튼 등 페이지네이션 구현 */}
        {/* {!isLoading && !isError && userAlertsData?.totalCount > notificationCount && (
           <button onClick={() => setAlertQuery(prev => ({...prev, offset: prev.offset + prev.limit}))}>더 보기</button>
        )} */}
      </div>
    </div>
  );
};

export default NotificationPanel;
