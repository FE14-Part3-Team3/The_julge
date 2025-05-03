import { Column } from "./Table";
import { UserApplication, Application } from "@/types/api/application";
import StatusButton from "./StatusButton";

const formatWorkTime = (startsAt: string, workhour: number) => {
  // RFC 3339 형식 변환 - 2025-05-14 10:00 ~ 15:00 이런 식으로 변환
  const start = new Date(startsAt);
  const startHour = start.getHours().toString().padStart(2, "0");
  const startMinute = start.getMinutes().toString().padStart(2, "0");

  const endHour = (start.getHours() + workhour).toString().padStart(2, "0");

  const date = start.toISOString().slice(0, 10);

  return `${date} ${startHour}:${startMinute} ~ ${endHour}:00 (${workhour}시간)`;
};

export const applicationColumns: Column<Application>[] = [
  // 공고 상세 페이지의 신청자 목록
  { label: "신청자", render: (item) => item.user.item.name },
  { label: "소개", render: (item) => item.user.item.bio },
  { label: "전화번호", render: (item) => item.user.item.phone },
  { label: "상태", render: (item) => String(item.status) },
];

export const userApplicationColumns: Column<UserApplication>[] = [
  // 내 프로필 상세 페이지의 신청 내역
  { label: "가게", render: (item) => item.shop.item.name },
  {
    label: "일자",
    render: (item) =>
      formatWorkTime(item.notice.item.startsAt, item.notice.item.workhour),
  },
  {
    label: "상태",
    render: (item) => (
      <StatusButton
        status={item.status}
        applicationId={Number(item.id)} // string이면 Number로 변환
        onReject={(id) => console.log("거절", id)}
        onAccept={(id) => console.log("승인", id)}
      />
    ),
  },
];
