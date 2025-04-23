'use client';

import { useState } from 'react';
import AlertModal from '@/components/Modal/AlertModal';
import ApplyModal from '@/components/Modal/ApplyModal';
import RegisterModal from '@/components/Modal/RegisterModal';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <RegisterModal />
      <AlertModal type="edit" /> /* 수정이 완료되었습니다. */
      <AlertModal type="email" /> /* 이미 사용중인 이메일입니다. */
      <AlertModal type="password" /> /* 비밀번호가 일치하지 않습니다. */
      <AlertModal type="register" /> /* 등록이 완료되었습니다. */
      <ApplyModal type="cancel" /> /* 신청을 취소하시겠어요? */
      <ApplyModal type="approve" /> /* 신청을 승인하시겠어요? */
      <ApplyModal type="reject" /> /* 신청을 거절하시겠어요? */
    </>
  );
}
