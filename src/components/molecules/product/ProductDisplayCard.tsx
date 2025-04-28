import { Button } from "@/components/atoms/Button";
import Span from "@/components/atoms/Span";
import { Flame, Heart, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import { FC } from "react";

interface ProductCardProps {
  imageSrc: string;
  title: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  rating: number;
  badges?: string[];
  isWishlisted?: boolean;
}

const ProductDisplayCard: FC<ProductCardProps> = ({
  imageSrc,
  title,
  price,
  originalPrice,
  discount,
  rating,
  badges = [],
}) => {
  return (
    <div className="space-y-2 font-montserrat">
      <div className="flex justify-center items-center relative overflow-hidden rounded-lg">
        {discount && (
          <Span className="absolute top-2.5 left-2 bg-red-500 text-white text-base px-2.5 py-1 rounded">
            -{discount}
          </Span>
        )}
        <Button className="absolute h-9 w-9 rounded-full top-2.5 right-2 bg-white">
          <Heart />
        </Button>
        <Image
          src={imageSrc}
          alt={title}
          width={160}
          height={160}
          className="w-full h-auto"
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="space-x-0.5">
          <Span className="text-scarlet-red font-semibold text-xl">
            ${price.toFixed(2)}
          </Span>
          {originalPrice && (
            <Span className="line-through text-[#2E2C2C82] text-xs font-semibold">
              ${originalPrice.toFixed(2)}
            </Span>
          )}
        </div>
        <div
          className="flex gap-x-1
         items-center text-[#2E2C2C] text-sm"
        >
          <Star className="w-4 h-4" />
          <Span>{rating.toFixed(1)}/</Span>
          <Span className="text-xs font-medium text-gray-400">1000</Span>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-[#2E2C2C]">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-x-2.5">
        {badges.map((badge, idx) => (
          <div
            key={idx}
            className="flex gap-x-1 bg-[#FF7D7D36] items-center rounded-full px-2 py-0.5"
          >
            {badge === "Best Seller" && (
              <Flame className="text-[#FE8800] w-4 h-4" />
            )}
            <Span className="text-sm text-gray-700">{badge}</Span>
          </div>
        ))}
      </div>

      <div className="space-y-1.5">
        <Button className="w-full mt-4 py-1.5 flex justify-center items-center gap-x-2 bg-scarlet-red text-white rounded text-sm font-medium">
          <ShoppingCart /> Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductDisplayCard;
