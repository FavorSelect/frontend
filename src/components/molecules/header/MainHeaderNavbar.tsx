import React, { FC } from "react";
import Link from "next/link";
import { Notification, Profile, Order, Cart } from "@/assets/icon";
import Span from "@/components/atoms/Span";
import { cn } from "@/utils/cn";

interface MainHeaderNavbarProps {
  className?: string;
  style?: React.CSSProperties;
}

const MainHeaderNavbar: FC<MainHeaderNavbarProps> = ({ className, style }) => {
  return (
    <div
      className={cn(
        "flex items-center gap-x-6 text-eerie-black font-montserrat font-semibold text-sm",
        className
      )}
      style={style}
    >
      <Link href="/notifications" className="flex flex-col items-center">
        <Notification className="w-6 h-6" />
        <Span className="mt-1">Notifications</Span>
      </Link>

      <Link href="/profile" className="flex flex-col items-center group">
        <Profile className="w-6 h-6" />
        <Span className="mt-1">Profile</Span>
      </Link>

      <Link href="/orders" className="flex flex-col items-center group">
        <Order className="w-6 h-6" />
        <Span className="mt-1">My Orders</Span>
      </Link>

      <Link href="/cart" className="flex flex-col items-center group">
        <div className="relative">
          <Span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[10px] font-semibold w-5 h-5 flex justify-center items-center rounded-full leading-none">
            20
          </Span>
          <Cart className="w-6 h-6" />
        </div>
        <Span className="mt-1">Shopping Cart</Span>
      </Link>
    </div>
  );
};

export default MainHeaderNavbar;
