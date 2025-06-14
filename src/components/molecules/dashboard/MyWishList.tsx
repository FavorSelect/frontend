import { Button } from "@/components/atoms/Button";
import Image from "next/image";
import React, { useState } from "react";
import { UserCardSkeleton as WishListCardSkeleton } from "@/components/molecules/dashboard/UserCardSkeleton";
import {
  useGetWishListQuery,
  useRemoveFromWishlistMutation,
} from "@/store/api/userDashboardApi";
import toast from "react-hot-toast";

const MyWishList = ({ token }: { token: string }) => {
  const { data, isLoading, isFetching, refetch } = useGetWishListQuery(token);
  const [removeFromWishlist, { isLoading: isRemoving }] =
    useRemoveFromWishlistMutation();
  const [removingId, setRemovingId] = useState<number | null>(null);

  if (isLoading || isFetching) {
    return <WishListCardSkeleton />;
  }

  if (!data || !data.wishlist || data.wishlist.length === 0) {
    return <p>No items in your wishlist.</p>;
  }

  const { wishlistCount, wishlist } = data;

  const handleRemove = async (wishlistItemId: number) => {
    setRemovingId(wishlistItemId);
    try {
      const response = await removeFromWishlist({
        token,
        wishlistItemId,
      }).unwrap();
      toast.success(response?.message || "Removed from wishlist");
      refetch();
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message || "Failed to delete wishlist");
        console.error("Failed to remove from wishlist:", err);
      }
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <div className="relative h-full">
      <h2 className="text-xl font-bold text-scarlet-red mb-6">
        Wishlist ({wishlistCount})
      </h2>

      <div className="space-y-2">
        {wishlist.map((item) => {
          const product = item.Product;
          const rating = Math.floor(product.averageCustomerRating || 0);

          return (
            <div
              key={item.id}
              className="border border-[#eeeeee] pb-2 rounded-lg"
            >
              <div className="mb-4 bg-[#f5f5f5] px-3 py-3.5 flex justify-between items-center">
                <span className="font-semibold">My Wishlist</span>
                <Button
                  onClick={() => handleRemove(item.id)}
                  disabled={isRemoving && removingId === item.id}
                  className="text-sm text-red-500 hover:underline disabled:opacity-50"
                >
                  {isRemoving && removingId === item.id
                    ? "Removing..."
                    : "Remove"}
                </Button>
              </div>

              <div className="flex justify-between">
                <div className="flex gap-4 items-center p-3">
                  <Image
                    src={product.coverImageUrl}
                    alt={product.productName}
                    className="w-20 h-20 bg-gray-200 rounded-lg object-cover"
                    width={80}
                    height={80}
                  />
                  <div>
                    <h3 className="font-semibold text-lg">
                      {product.productName}
                    </h3>
                    <div className="flex items-center text-yellow-500 my-2">
                      {"★".repeat(rating)}
                      {"☆".repeat(5 - rating)}
                      <span className="ml-2 text-scarlet-red">
                        ({product.totalCustomerReviews})
                      </span>
                    </div>
                    <p className="text-lg font-semibold">
                      TRY {product.productPrice}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col space-y-3.5 p-3">
                  <Button className="bg-scarlet-red text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 transition text-sm flex items-center">
                    Add to Cart
                  </Button>
                  <Button className="bg-scarlet-red text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 transition text-sm flex items-center">
                    Buy Now
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyWishList;
