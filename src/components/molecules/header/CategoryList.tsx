import React from "react";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { GiftIcon, Tag } from "lucide-react";

const featuredLinks = [
  {
    icon: <Tag />,
    label: "Categories",
    bold: true,
  },
  {
    icon: <Tag className="w-5 h-5 text-red-600" />,
    label: "Outlet",
    color: "text-red-600",
  },
  {
    icon: <GiftIcon className="w-5 h-5 text-red-600" />,
    label: "Free gifts with purchase",
    color: "text-red-600",
  },
  { label: "Free gifts with purchase" },
];

const categories = [
  "Watch",
  "Bag",
  "Lotion",
  "Bag",
  "T-Shirt",
  "Sports Accessories",
  "Lotion",
  "Health",
  "T-Shirt",
  "T-Shirt",
  "Sports Accessories",
  "Watch",
];

const CategoryList = () => {
  return (
    <div className="font-montserrat font-normal">
      {/* Featured Links */}
      <div className="flex items-center gap-x-6 mb-2 w-full overflow-x-auto no-scrollbar space-x-1 sm:space-x-4 sm:px-4 md:py-0 py-2.5 ">
        {featuredLinks.map(({ icon, label, bold, color }, i) => (
          <div key={i} className="flex items-center gap-x-1 cursor-pointer">
            {icon}
            <Link
              href="#"
              className={cn(
                "w-max md:w-fit text-sm",
                color,
                bold && "font-semibold"
              )}
            >
              {label}
            </Link>
          </div>
        ))}
      </div>

      {/* Scrollable Category Items */}
      <div className="flex md:flex-wrap gap-x-6 gap-y-1 text-sm text-eerie-black w-full overflow-x-auto no-scrollbar space-x-1 sm:space-x-4 sm:px-4 py-2.5 md:py-0">
        {categories.map((category, i) => (
          <div key={i} className="flex items-center gap-x-1 cursor-pointer">
            <Link
              href="#"
              className="w-max md:w-fit text-sm cursor-pointer hover:underline"
            >
              {category}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
