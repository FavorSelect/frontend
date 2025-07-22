import Link from "next/link";
import React from "react";

interface EmptyOrdersProps {
  title: string;
  subtext: string;
}

const EmptyOrders: React.FC<EmptyOrdersProps> = ({ title, subtext }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-fit px-4 text-center">
      {/* Illustration */}
      <div
        className="bg-center bg-no-repeat aspect-video bg-cover rounded-xl w-full max-w-[260px] mb-6"
        style={{
          backgroundImage:
            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCYOYzR3mVwRb1nhFgDNl2NlWD_kDgzStwP85V2FDKO3nMYVpXzLTefTCkB9SFRdBM3tgjDIrK88zNyd_KOV_O6R4lwIvhVxkXw_L7CKOGm7HzNT7koLGhNcHGeQ12ZX9uDJ4kWePq98xFUz7Fj9h2v0gAv7H7pjUNL0Q4wNNLTxguqZWFkYmI8UWB7Oco2mS_JEFpK9i1MNcLgHkZ5uQ")',
        }}
      ></div>

      {/* Text */}
      <div className="flex max-w-[480px] flex-col items-center gap-2 mb-4">
        <p className="text-[#181113] text-lg font-bold tracking-[-0.015em]">
          {title}
        </p>
        <p className="text-[#181113] text-sm font-normal">{subtext}</p>
      </div>

      {/* CTA Button */}
      <Link
        href="/shop/all"
        className="flex min-w-[84px] max-w-[480px] items-center justify-center h-10 px-4 bg-scarlet-red hover:bg-red-500 transition text-white text-sm font-bold rounded-md"
      >
        <span className="truncate">Start Shopping</span>
      </Link>
    </div>
  );
};

export default EmptyOrders;
