'use client';

import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';

type ModalSize = 'compact' | 'wide';

interface ModalProps {
  description: string; // 모달 본문 텍스트
  icon?: ReactNode; // 모달 아이콘
  children?: ReactNode; // 하단 버튼 요소
  size?: ModalSize; // 모달 사이즈 ("compact" | "wide") , 기본값은 "wide"
  width?: string; // 너비
  height?: string; // 높이
  descriptionSize?: string; // 본문 텍스트 사이즈
  buttonAlign?: 'start' | 'center' | 'end'; // 버튼 정렬 위치 , 기본값: "end"
  layout?: 'centered' | 'top'; // 컨텐츠 배치 방식, 기본값: "centered"
}

export default function Modal({
  description,
  icon,
  children,
  size = 'wide',
  width,
  height,
  descriptionSize,
  buttonAlign = 'end',
  layout = 'centered',
}: ModalProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const widthClass = width ?? (size === 'compact' ? 'w-[298px]' : 'w-[540px]');
  const heightClass =
    height ?? (size === 'compact' ? 'h-[184px]' : 'h-[250px]');
  const textSizeClass =
    descriptionSize ?? (size === 'compact' ? 'text-[16px]' : 'text-[18px]');

  return createPortal(
    <div className="fixed inset-0 z-50 bg-black/50">
      <div
        className={clsx(
          'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
          'bg-white rounded-xl shadow-notification flex flex-col justify-between p-7',
          'font-sans',
          widthClass,
          heightClass
        )}
      >
        {layout === 'centered' ? (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            {icon && <div className="mb-3">{icon}</div>}
            <p
              className={clsx(
                'text-black text-center font-medium leading-none whitespace-nowrap',
                textSizeClass
              )}
            >
              {description}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-start">
            {icon && <div className="mb-3">{icon}</div>}
            <p
              className={clsx(
                'text-black text-center font-medium leading-none',
                textSizeClass
              )}
            >
              {description}
            </p>
          </div>
        )}

        {children && (
          <div
            className={clsx(
              'flex mt-auto pt-6',
              buttonAlign === 'center'
                ? 'justify-center'
                : buttonAlign === 'start'
                ? 'justify-start'
                : 'justify-end'
            )}
          >
            {children}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
