"use client";

import { useState } from "react";
import Table from "@/components/Table/Table";
import { Section } from "@/components/Section/Section";
import dummyReservations from "./dummkyReservation";

export default function Home() {
    // 예시 데이터 - 실제 구현 시 props로 받거나 API에서 가져올 수 있습니다
    const [reservations, setReservations] = useState(dummyReservations);

    return (
        <Section
            children={<Table reservations={reservations} />}
            subname="예약 현황"
            name="예약 관리"
        />
    );
}
