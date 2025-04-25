import { Cart, Fire, Heart } from "@/assets/icon";
import Star from "@/assets/icon/Star";
import { Button } from "@/components/atoms/Button";
import Span from "@/components/atoms/Span";
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

const ProductCard: FC<ProductCardProps> = ({
  imageSrc,
  title,
  price,
  originalPrice,
  discount,
  rating,
  badges = [],
}) => {
  return (
    <div className="cursor-pointer space-y-2 font-montserrat group">
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
        <Button className="absolute font-montserrat py-2 bg-[#2E2C2C4F] bottom-0 w-full text-white flex gap-x-1.5 justify-center items-center transition-transform duration-200 ease-in-out transform translate-y-[44px] group-hover:translate-y-0">
          <Cart />
          <Span className="text-base font-semibold">Add to cart</Span>
        </Button>
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
          <Star />
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
            {badge === "Best Seller" && <Fire />}
            <Span className="text-sm text-gray-700">{badge}</Span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
