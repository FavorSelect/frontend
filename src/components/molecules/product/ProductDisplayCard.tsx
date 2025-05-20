import { Button } from "@/components/atoms/Button";
import Span from "@/components/atoms/Span";
import { Flame, Heart, ShoppingCart, Star, View } from "lucide-react";
import Image from "next/image";
import { FC } from "react";
import { Product } from "@/types/Product";
import Link from "next/link";

interface ProductDisplayCardProps extends Product {
  viewMode?: "grid" | "list";
}

const ProductDisplayCard: FC<ProductDisplayCardProps> = ({
  id,
  title,
  price,
  discountPercentage,
  rating,
  thumbnail: imageSrc,
  tags,
  viewMode = "grid",
}) => {
  // Calculate the original price and discount
  const originalPrice =
    discountPercentage > 0 ? price / (1 - discountPercentage / 100) : undefined;
  const discount =
    discountPercentage > 0 ? `-${discountPercentage}%` : undefined;

  // Only adjust the layout for the list view
  const isListView = viewMode === "list";

  return (
    <div
      className={`${
        isListView
          ? "flex items-center gap-6 p-4 rounded-lg bg-white shadow-sm"
          : "flex flex-col justify-between h-full space-y-2 font-montserrat"
      }`}
    >
      {/* Image + Wishlist + Discount */}
      <div
        className={`relative overflow-hidden rounded-lg border border-[#fee1e1] bg-white ${
          isListView
            ? "w-36 h-36 flex-shrink-0"
            : "h-48 flex justify-center items-center"
        }`}
      >
        {discount && (
          <Span className="absolute top-2.5 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded">
            {discount}
          </Span>
        )}
        <Button className="absolute h-8 w-8 p-1 rounded-full top-2.5 right-2 bg-white shadow">
          <Heart className="w-4 h-4" />
        </Button>
        <Image
          src={imageSrc}
          alt={title}
          width={160}
          height={160}
          className="object-contain max-h-full select-none"
          loading="lazy"
        />
      </div>

      {/* Product Info */}
      <div className={isListView ? "flex-1" : ""}>
        {/* Title */}
        <h3 className="text-base font-semibold text-gray-900 mb-1 line-clamp-2">
          {title.slice(0, 18)}
        </h3>

        {/* Price + Rating */}
        <div className="flex items-center justify-between mb-2">
          <div className="space-x-1">
            <Span className="text-scarlet-red font-semibold text-base">
              ${price.toFixed(2)}
            </Span>
            {originalPrice && (
              <Span className="line-through text-gray-400 text-xs font-medium">
                ${originalPrice.toFixed(2)}
              </Span>
            )}
          </div>
          <div className="flex items-center gap-x-1 text-gray-700 text-sm">
            <Star className="w-4 h-4 text-scarlet-red" />
            <Span>{rating.toFixed(1)}</Span>
            <Span className="text-xs text-gray-400">/ 1000</Span>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-1.5 mb-2">
          {tags.map((tag, idx) => (
            <div
              key={idx}
              className="flex gap-x-1 items-center bg-[#FF7D7D36] rounded-full px-2 py-0.5"
            >
              {tag === "Best Seller" && (
                <Flame className="text-[#FE8800] w-3.5 h-3.5" />
              )}
              <Span className="text-xs text-gray-700">{tag}</Span>
            </div>
          ))}
        </div>

        <div className="space-y-2.5">
          {/* Add to Cart Button */}
          <Button className="w-full py-1.5 flex justify-center items-center gap-x-2 transition-colors bg-scarlet-red hover:bg-red-600/100 text-white text-sm font-medium rounded">
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </Button>
          <Link
            href={`/shop/${id}`}
            className="w-full py-1.5 flex justify-center items-center gap-x-2 bg-gray-900 transition-colors hover:bg-gray-800 text-white text-sm font-medium rounded"
          >
            <View className="w-4 h-4" />
            View Product
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplayCard;
