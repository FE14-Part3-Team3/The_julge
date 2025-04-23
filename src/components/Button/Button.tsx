import React, { ReactNode } from "react";

type Variant = "solid" | "outline" | "disabled";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  variant?: Variant;
  size?: Size;
}

const variantClasses: Record<Variant, string> = {
  solid: "bg-[#ea3c12] text-white cursor-pointer",
  outline: "border text-[#ea3c12] cursor-pointer",
  disabled: "bg-[#a4a1aa] text-white cursor-not-allowed",
};
const sizeClasses: Record<Size, string> = {
  sm: "px-3 py-2 text-xs/[16px] font-normal ",
  md: "px-5 py-2.5 text-sm/[16px] font-bold",
  lg: "px-[136px] py-3.5 text-base/[20px] font-bold",
};

export default function Button({
  children,
  variant = "solid",
  size = "lg",
  disabled,
  ...rest
}: ButtonProps) {
  const base = "rounded-md";
  const classes = `${base} ${variantClasses[disabled ? "disabled" : variant]} ${
    sizeClasses[size]
  }`;
  return (
    <button className={classes} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}
