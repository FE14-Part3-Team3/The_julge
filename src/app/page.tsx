'use client'

import { useReadAlert, useUserAlerts } from '@/hooks/api/useAlertService';
import { useLogin } from '@/hooks/api/useAuthentication';
import { useEffect, useState } from 'react';

export default function ReadAlertTestPage() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);


  const login = useLogin();
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  const userId = 'a7b8d355-8031-43ef-9c41-c2c6a0452a5f'; 
  const [query, setQuery] = useState({ offset: 0, limit: 10 }); // 기본 페이징

  const { data: alertsData, isLoading, isError } = useUserAlerts(userId, query);
  const { mutate: readAlert, isError: isReadError, errorMessage: readErrorMessage } = useReadAlert();

  const handleReadAlert = (alertId: string) => {
    readAlert({ userId, alertId }, {
      onSuccess: () => {
        alert('알림 읽음 처리 완료!');
      },
      onError: () => {
        alert('알림 읽음 처리 실패!');
      }
    });
  };

  if (isLoading) return <p>로딩 중...</p>;
  if (isError) return <p>에러 발생</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">🔔 알림 목록 테스트</h1>

      <h2>Token: {token}</h2><br/><br/>
      <button className="px-4 py-2 bg-blue-500 text-white rounded"  onClick={() => login.mutate({ email: 'owner824@gmail.com', password: '123456' })}>사장 로그인</button><br/>
      <button className="px-4 py-2 bg-blue-500 text-white rounded"  onClick={() => login.mutate({ email: 'test824@gmail.com', password: '123456' })}>일반 로그인</button><br/><br/>
      <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={handleLogout}>
          로그아웃
        </button>
 
      <ul className="space-y-4">
        {alertsData?.items.map((alertWrapper: any) => (
          <li key={alertWrapper.item.id} className="border p-4 flex justify-between items-center">
            <div>
              <p><strong>알림 ID:</strong> {alertWrapper.item.id}</p>
              <p><strong>생성일:</strong> {alertWrapper.item.createdAt}</p>
              <p><strong>읽음 여부:</strong> {alertWrapper.item.read ? '읽음' : '안 읽음'}</p>
            </div>
            {!alertWrapper.item.read && (
              <button
                onClick={() => handleReadAlert(alertWrapper.item.id)}
                className="px-3 py-1 bg-blue-500 text-white rounded"
              >
                읽음 처리
              </button>
            )}
          </li>
        ))}
      </ul>

      {isReadError && <p className="text-red-500">읽음 처리 에러: {readErrorMessage}</p>}
    </div>
  );
}
