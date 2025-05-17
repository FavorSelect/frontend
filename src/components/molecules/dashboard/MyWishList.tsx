import { Button } from "@/components/atoms/Button";
import Image from "next/image";
import React, { useState, useEffect, useMemo } from "react";
import Pagination from "../global/Pagination";
import { UserCardSkeleton as WishListCardSkeleton } from "@/components/molecules/dashboard/UserCardSkeleton";

interface WishList {
  id: string;
  title: string;
  price: number;
  rating: number;
  reviews: number;
  status: string;
  imageUrl: string;
}

const orders: WishList[] = [
  {
    id: "123456789",
    title: "Handcrafted Leather Backpack",
    price: 899,
    rating: 4.5,
    reviews: 79,
    status: "Delivered",
    imageUrl: "/bag-2.jpg",
  },
  {
    id: "12367456789",
    title: "Elegant Watch",
    price: 499,
    rating: 5,
    reviews: 54,
    status: "Awaiting Payment",
    imageUrl: "/bag-1.jpg",
  },
  {
    id: "987654321",
    title: "Wireless Headphones",
    price: 1299,
    rating: 4.8,
    reviews: 150,
    status: "Delivered",
    imageUrl: "/bag-1.jpg",
  },
  {
    id: "456789123",
    title: "Smartphone Case",
    price: 199,
    rating: 3.5,
    reviews: 45,
    status: "Awaiting Payment",
    imageUrl: "/bag-1.jpg",
  },
  {
    id: "567891231114",
    title: "Bluetooth Speaker",
    price: 799,
    rating: 4.2,
    reviews: 90,
    status: "Delivered",
    imageUrl: "/bag-1.jpg",
  },
  {
    id: "567891234",
    title: "Bluetooth Speaker",
    price: 799,
    rating: 4.2,
    reviews: 90,
    status: "Delivered",
    imageUrl: "/bag-1.jpg",
  },
];

const ITEMS_PER_PAGE = 2;

const MyWishList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Pagination Logic
  const totalPages = Math.max(Math.ceil(orders.length / ITEMS_PER_PAGE), 1);
  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return orders.slice(start, end);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="relative h-full">
      <h2 className="text-xl font-bold text-scarlet-red mb-6">Wishlist</h2>

      {/* Initial Loading Skeleton */}
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(ITEMS_PER_PAGE)].map((_, index) => (
            <WishListCardSkeleton key={index} />
          ))}
        </div>
      ) : // Order List
      paginatedOrders.length > 0 ? (
        <div className="space-y-2">
          {paginatedOrders.map((order) => (
            <div
              key={order.id}
              className="border border-[#eeeeee] pb-2 rounded-lg"
            >
              <div className="mb-4 bg-[#f5f5f5] px-3 py-3.5">
                <span className="font-semibold">My wishlist</span>
              </div>
              <div className="flex justify-between">
                <div className="flex gap-4 items-center p-3">
                  <Image
                    src={order.imageUrl}
                    alt={order.title}
                    className="w-20 h-20 bg-gray-200 rounded-lg"
                    width={80}
                    height={80}
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{order.title}</h3>
                    <div className="flex items-center text-yellow-500 my-2">
                      {"★".repeat(Math.floor(order.rating))}
                      {"☆".repeat(5 - Math.floor(order.rating))}
                      <span className="ml-2 text-scarlet-red">
                        ({order.reviews})
                      </span>
                    </div>
                    <p className="text-lg font-semibold">TRY {order.price}</p>
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
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No items in your wishlist.</p>
      )}

      {/* Pagination */}
      {orders.length > 0 && (
        <Pagination
          className="absolute bottom-0 right-0"
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          disbaled={isLoading}
        />
      )}
    </div>
  );
};

export default MyWishList;
