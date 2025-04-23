import clsx from 'clsx';

type Variant = 'primary' | 'outline';
type Size = 'sm' | 'md' | 'lg';

interface ModalButtonProps {
  label: string;
  onClick: () => void;
  variant?: Variant;
  size?: Size;
  className?: string;
}

export default function ModalButton({
  label,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
}: ModalButtonProps) {
  const variantStyles: Record<Variant, string> = {
    primary: 'bg-[#ea3c12] text-white cursor-pointer',
    outline:
      'bg-white font-sans text-[#ea3c12] border border-[#ea3c12] cursor-pointer',
  };

  const sizeStyles: Record<Size, string> = {
    sm: 'w-[80px] h-[38px] text-[14px]',
    md: 'w-[120px] h-[48px] text-[16px]',
    lg: 'w-[160px] h-[52px] text-[18px]',
  };

  return (
    <button
      onClick={onClick}
      className={clsx(
        'font-bold rounded-[8px] flex items-center justify-center',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {label}
    </button>
  );
}
