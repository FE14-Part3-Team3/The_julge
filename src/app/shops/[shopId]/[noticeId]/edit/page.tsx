'use client'

import { useShopsNotice } from "@/hooks/api/useNoticeService";
import NoticeRegisterForm from "../../register-notice/components/NoticeRegisterForm";
import { useParams } from "next/navigation";

export default function EditNoticePage() {
  const { shopId, noticeId } = useParams();
  const { data } = useShopsNotice(shopId, noticeId);

  return <NoticeRegisterForm data={data?.item} noticeId={noticeId}/>;
}
