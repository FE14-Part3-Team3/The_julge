import React, { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'outline' | 'disabled';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: Variant;
  size?: Size;
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-red-50 text-white cursor-pointer',
  outline: 'bg-white border border-red-50 text-red-50 cursor-pointer',
  disabled: 'bg-gray-40 text-white cursor-not-allowed',
};
const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-2 text-xs/[16px] font-normal ',
  md: 'px-5 py-2.5 text-sm/[16px] font-bold',
  lg: 'px-[136px] py-3.5 text-base/[20px] font-bold',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'lg',
  disabled,
  className,
  ...rest
}: ButtonProps) {
  const base = 'rounded-md';
  const classes = `${base} ${variantClasses[disabled ? 'disabled' : variant]} ${
    sizeClasses[size]
  } ${className ?? ''}`;
  return (
    <button className={classes} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}
