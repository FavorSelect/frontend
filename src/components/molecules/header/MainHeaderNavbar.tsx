import React, { FC } from "react";
import Link from "next/link";
import Span from "@/components/atoms/Span";
import { cn } from "@/utils/cn";
import { Bell, ShoppingBag, ShoppingCart } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";
import { useGetCartSummaryQuery } from "@/store/api/cartApi";

interface MainHeaderNavbarProps {
  className?: string;
  style?: React.CSSProperties;
}

const MainHeaderNavbar: FC<MainHeaderNavbarProps> = ({ className, style }) => {
  const { data } = useGetCartSummaryQuery();
  const cartCount = data?.cart?.CartItems?.length ?? 0;

  return (
    <div
      className={cn(
        "flex items-center gap-x-3 xl:gap-x-6 text-eerie-black font-montserrat font-semibold text-sm",
        className
      )}
      style={style}
    >
      <Link
        href="/notification"
        className="hidden xl:flex flex-col items-center"
      >
        <Bell className="w-6 h-6" />
        <Span className="mt-1">Notifications</Span>
      </Link>

      <Link
        href="/shop/all"
        className="hidden xl:flex flex-col items-center group"
      >
        <ShoppingBag className="w-6 h-6" />
        <Span className="mt-1">Shop</Span>
      </Link>
      <ProfileDropdown />
      <Link href="/cart" className="flex flex-col items-center group">
        <div className="relative">
          {cartCount !== 0 && (
            <Span
              className={`absolute -top-1.5 -right-2 bg-red-500 text-white text-[10px] font-semibold w-5 h-5 flex justify-center items-center rounded-full leading-none transition-all duration-300 ${
                cartCount > 0 ? "scale-100" : "scale-90 opacity-60"
              }`}
            >
              {cartCount}
            </Span>
          )}
          <ShoppingCart className="w-6 h-6" />
        </div>
        <Span className="mt-1 hidden xl:block">Shopping Cart</Span>
      </Link>
    </div>
  );
};

export default MainHeaderNavbar;
