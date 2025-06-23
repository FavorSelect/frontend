/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/atoms/Button";
import Span from "@/components/atoms/Span";
import { Flame, Heart, ShoppingCart, Star, View } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { ProductT } from "@/types/real.product";
import { useAddToCartMutation } from "@/store/api/cartApi";
import { toast } from "react-hot-toast";
import { handleApiError } from "@/utils/handleApiError";
import Spinner from "../global/Spinner";
import {
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
  useGetWishlistQuery,
} from "@/store/api/wishApi";
import { WishlistItem } from "@/types/wishlist";

interface ServerProductCardProps {
  product: ProductT | any;
  viewMode?: "grid" | "list";
}

const PopularProductCard: FC<ServerProductCardProps> = ({
  product,
  viewMode = "grid",
}) => {
  const { data: wishlistData } = useGetWishlistQuery();

  const [addToWishlist, { isLoading: isWishing }] = useAddToWishlistMutation();
  const [removeFromWishlist, { isLoading: isUnwishing }] =
    useRemoveFromWishlistMutation();

  const [addToCart, { isLoading: isAdding }] = useAddToCartMutation();

  const {
    id,
    productName,
    productPrice,
    productDiscountPercentage = 0,
    averageCustomerRating = 0,
    coverImageUrl,
    rekognitionLabels = [],
  } = product;

  const isInWishlist = wishlistData?.wishlist.some(
    (item: WishlistItem) => item.productId === id
  );

  const hasDiscount =
    productDiscountPercentage !== null && productDiscountPercentage > 0;

  const originalPrice = hasDiscount
    ? productPrice / (1 - productDiscountPercentage / 100)
    : undefined;

  const discount = hasDiscount ? `-${productDiscountPercentage}%` : undefined;

  const isListView = viewMode === "list";

  const handleToggleWishlist = async () => {
    try {
      const matchedItem = wishlistData?.wishlist.find(
        (item: WishlistItem) => item.productId === id
      );
      if (matchedItem) {
        console.log(matchedItem.id);
        const res = await removeFromWishlist({
          wishlistIds: [matchedItem.id],
        }).unwrap();
        toast.success(res?.message || "Removed from wishlist");
      } else {
        const res = await addToWishlist({ productId: id }).unwrap();
        toast.success(res?.message || "Added to wishlist");
      }
    } catch (err) {
      handleApiError(err, "Wishlist action failed");
    }
  };

  const handleAddToCart = async () => {
    try {
      const res = await addToCart({ productId: id, quantity: 1 }).unwrap();
      toast.success(res?.message || "Item added to cart");
    } catch (err) {
      handleApiError(err, "Failed to add to cart");
    }
  };

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
        <Button
          onClick={handleToggleWishlist}
          disabled={isWishing || isUnwishing}
          className="absolute h-8 w-8 p-1 rounded-full top-2.5 right-2 bg-white shadow disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isWishing || isUnwishing ? (
            <Spinner className="mr-0 text-scarlet-red" />
          ) : isInWishlist ? (
            <Heart className="w-4 h-4 fill-scarlet-red text-scarlet-red" />
          ) : (
            <Heart className="w-4 h-4 text-scarlet-red" />
          )}
        </Button>
        <Image
          src={coverImageUrl}
          alt={productName}
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
          {productName.slice(0, 18)}
        </h3>

        {/* Price + Rating */}
        <div className="flex items-center justify-between mb-2">
          <div className="space-x-1">
            <Span className="text-scarlet-red font-semibold text-base">
              ${productPrice.toFixed(2)}
            </Span>
            {originalPrice && (
              <Span className="line-through text-gray-400 text-xs font-medium">
                ${originalPrice.toFixed(2)}
              </Span>
            )}
          </div>
          <div className="flex items-center gap-x-1 text-gray-700 text-sm">
            <Star className="w-4 h-4 text-scarlet-red" />
            <Span>{averageCustomerRating.toFixed(1)}</Span>
            <Span className="text-xs text-gray-400">/ 100</Span>
          </div>
        </div>

        {/* Tags/Labels */}
        <div className="flex flex-wrap gap-1.5 mb-2">
          {rekognitionLabels.map((label: any, idx: any) => (
            <div
              key={idx}
              className="flex gap-x-1 items-center bg-[#FF7D7D36] rounded-full px-2 py-0.5"
            >
              {label.toLowerCase().includes("best") && (
                <Flame className="text-[#FE8800] w-3.5 h-3.5" />
              )}
              <Span className="text-xs text-gray-700">{label}</Span>
            </div>
          ))}
        </div>

        <div className="space-y-2.5">
          <Button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="w-full py-1.5 flex justify-center items-center gap-x-2 transition-colors bg-scarlet-red hover:bg-red-600 text-white text-sm font-medium rounded disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isAdding ? (
              <>
                <Spinner className="w-4 h-4 text-white" />
                Adding...
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </>
            )}
          </Button>
          <Link
            href={`/shop/all/${id}`}
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

export default PopularProductCard;
