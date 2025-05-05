
import Image from "next/image";
import clsx from "clsx";

interface PayBadgeProps {
  payResult: number | false
  closed: boolean
  className: string | boolean
}

export default function PayBadge({ payResult, closed , className}: PayBadgeProps) {
  if (typeof payResult !== "number") return null;

  const badgeClass = clsx(
    "absolute bottom-[2px] right-0 text-xs flex gap-1 sm:rounded-full sm:text-white  sm:px-3 sm:py-2",
    closed ? "xs:text-gray-30 sm:bg-gray-30" : payResult >= 50 ? "xs:text-red-40 sm:bg-red-40" : "xs:text-red-30 sm:bg-red-30"
  );

  return (
    <div className={clsx("xs:relative sm:absolute",badgeClass,className)} >
      {payResult > 999 ? (
        <span>{payResult}%</span>
      ) : (
        <span>기존 시급보다 {payResult}%</span>
      )}
      <div className="xs:hidden sm:block">
        <Image
          src="/assets/images/arrow_up.svg"
          alt={`기존 시급보다 ${payResult}% 상승`}
          width={16}
          height={16}
        />
      </div>
      <div className="xs:block sm:hidden">
        { closed ? 
          <Image
            src="/assets/images/arrow_up_gray.svg"
            alt={`기존 시급보다 ${payResult}% 상승`}
            width={16}
            height={16}
          />
          : payResult >= 50 ?
          <Image
            src="/assets/images/arrow_up_red_40.svg"
            alt={`기존 시급보다 ${payResult}% 상승`}
            width={16}
            height={16}
          />
          :
          <Image
            src="/assets/images/arrow_up_red_30.svg"
            alt={`기존 시급보다 ${payResult}% 상승`}
            width={16}
            height={16}
          />
        }
      </div>
    </div>
  );
}
