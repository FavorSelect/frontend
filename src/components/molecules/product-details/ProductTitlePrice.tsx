import Heading from "@/components/atoms/Heading";
import Span from "@/components/atoms/Span";
import { CheckSquare, Flame, Hourglass } from "lucide-react";
import React from "react";

interface Props {
  title: string;
  price: number;
  originalPrice?: number;
  reviews: number;
  description: string;
  tag?: string;
}

const ProductTitlePrice = ({
  title,
  price,
  originalPrice,
  reviews,
  description,
  tag,
}: Props) => {
  return (
    <div className="space-y-2">
      <div className="flex flex-col xs:flex-row gap-3 xs:gap-2">
        <div className="flex gap-x-1 items-center justify-center xs:justify-start bg-[#FFECEC] text-[#FE5E5E] rounded-md font-semibold px-2 py-1 text-sm">
          <Flame className="text-[#FE8800] w-3.5 h-3.5" />
          {tag}
        </div>
        <div className="flex gap-x-1 items-center justify-center xs:justify-start bg-[#FFF6D8] text-[#B98B00] rounded-md font-semibold px-2 py-1 text-sm">
          <Hourglass className="text-[#FE8800] w-3.5 h-3.5" />
          Limited Offer
        </div>
      </div>
      <Heading>{title}</Heading>
      <div className="flex items-center gap-x-1 text-sm text-scarlet-red font-semibold">
        <CheckSquare className="w-4 h-4" />
        <Span className="text-xs sm:text-sm">
          Recommended by 96%, 137 purchases
        </Span>
      </div>

      <div className="text-yellow-500 font-semibold text-sm mt-1">
        {"★".repeat(5)} <Span>{reviews}</Span>
      </div>
      <div className="flex items-center space-x-2 mt-2">
        {originalPrice && originalPrice > price && (
          <Span className="line-through text-gray-500 font-semibold">
            ${originalPrice.toFixed(2)}
          </Span>
        )}
        <Span className="text-red-500 font-bold text-xl">
          ${price.toFixed(2)}
        </Span>
      </div>
      <div>
        <Span className="text-sm sm:text-base">{description}</Span>
      </div>
    </div>
  );
};

export default ProductTitlePrice;
