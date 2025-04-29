"use client";

import { useState } from "react";
import Table from "@/components/Table/Table";
import { Section } from "@/components/Section/Section";
import dummyApplication from "./dummyApplication";

export default function Home() {
    // 예시 데이터 - 실제 구현 시 props로 받거나 API에서 가져올 수 있습니다
    const [applications, setApplications] = useState(dummyApplication);

    return (
        <Section
            children={<Table application={applications} />}
            subname="예약 현황"
            name="예약 관리"
        />
    );
}
