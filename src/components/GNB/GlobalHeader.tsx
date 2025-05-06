"use client";

import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import NotificationPanel from "./NotificationPanel";
import SearchBar from "./SearchBar";
import clsx from "clsx";
import { useUserAlerts } from "@/hooks/api/useAlertService";
import { GetListQuery } from "@/types/common";
import { AlertItemWrapper } from "@/types/api/user";
import { useRouter } from "next/navigation";

export default function GlobalHeader() {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const { logout, isLogin } = useAuth();
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<{
    id: string | null;
    type: string | null;
    token: string | null;
  }>({ id: null, type: null, token: null });

  const [notificationQuery, setNotificationQuery] = useState<GetListQuery>({
    offset: 0,
    limit: 10,
  });

  useEffect(() => {
    if (isLogin) {
      const id = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      const type = localStorage.getItem("type");
      setUserInfo({ id, token, type });
    } else {
      setUserInfo({ id: null, type: null, token: null });
    }
  }, [isLogin]);

  const { data: userNotificationData, refetch: refetchNotification } =
    useUserAlerts(userInfo.id || "", notificationQuery);

  const notifications: AlertItemWrapper[] = userNotificationData?.items || [];

  const toggleOpenNotifications = () => {
    setNotificationOpen((prev) => !prev);
    refetchNotification();
  };

  const handleLogout = () => {
    setNotificationOpen(false);
    logout();
    router.push("/");
  };

  const LinkClasses =
    "font-bold text-[14px]/[14px] sm:text-[16px]/[20px] whitespace-nowrap";

  return (
    <header className="w-full h-[70px] px-5 py-[10px]">
      <div className="flex justify-between sm:justify-center max-w-[1024px] w-full mx-auto sm:gap-8 md:gap-10 items-center">
        {/* 로고 */}
        <div>
          <Link
            href={"/"}
            className="block relative w-[84px] h-[30px] sm:w-[112px] sm:h-[40px] flex-shrink-0"
          >
            <Image
              src={"/assets/images/logo.svg"}
              fill
              alt="로고"
              className="object-contain"
              priority
            />
          </Link>
        </div>

        {/* 태블릿, PC 검색창 */}
        <Suspense>
          <SearchBar className="relative xs:hidden sm:block max-w-[450px]" />
        </Suspense>

        {/* 네비게이션 */}
        <nav
          className={clsx(
            "flex justify-end items-center gap-[16px] sm:gap-[40px]",
            { "sm:gap-3 md:gap-10": isLogin }
          )}
        >
          {isLogin ? (
            <>
              <Link
                className={LinkClasses}
                href={
                  userInfo.type === "employer"
                    ? `/shops/${userInfo.id}`
                    : `/profile/worker/${userInfo.id}`
                }
              >
                {userInfo.type === "employer" ? "내 가게" : "내 프로필"}
              </Link>
              <button
                onClick={handleLogout}
                className={clsx("block", LinkClasses)}
              >
                로그아웃
              </button>
              <button
                onClick={toggleOpenNotifications}
                className="w-5 h-5 relative"
              >
                <Image
                  src={"/assets/icons/notification.svg"}
                  alt="알림 열기"
                  fill
                />
              </button>
              {notificationOpen && (
                <NotificationPanel
                  notifications={notifications}
                  onClose={() => setNotificationOpen(false)}
                />
              )}
            </>
          ) : (
            <>
              <Link href={"/login"} className={LinkClasses}>
                로그인
              </Link>
              <Link href={"/signup"} className={LinkClasses}>
                회원가입
              </Link>
            </>
          )}
        </nav>
      </div>
      <Suspense>
        <SearchBar className="sm:hidden" />
      </Suspense>
    </header>
  );
}
