import { Button } from "@/components/atoms/Button";
import React from "react";
import { ShoppingCart, CreditCard } from "lucide-react";
import Link from "next/link";

const ActionBtn = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 font-semibold w-full">
      <Link
        href="/checkout"
        className="whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 cursor-pointer flex items-center justify-center gap-2 flex-1 bg-scarlet-red text-white px-4 py-2 rounded-md transition-all duration-200 ease-in-out hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 active:scale-95"
        aria-label="Buy Now"
      >
        <CreditCard size={18} />
        Buy Now
      </Link>
      <Button
        className="flex items-center justify-center gap-2 flex-1 bg-black text-white px-4 py-2 rounded-md transition-all duration-200 ease-in-out hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 active:scale-95"
        aria-label="Add to Cart"
      >
        <ShoppingCart size={18} />
        Add to Cart
      </Button>
    </div>
  );
};

export default ActionBtn;
