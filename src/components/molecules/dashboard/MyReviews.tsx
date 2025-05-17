import { Button } from "@/components/atoms/Button";
import { useAppDispatch } from "@/store/hook";
import {
  ReviewFilter,
  setReviewFilter,
} from "@/store/slices/dashboard/reviewFilterSlice";
import { RootState } from "@/store/store";
import Image from "next/image";
import React, { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import Pagination from "../global/Pagination";
import { UserCardSkeleton as MyReviewCardSkeleton } from "@/components/molecules/dashboard/UserCardSkeleton";
import { cn } from "@/utils/cn";

interface Review {
  id: string;
  title: string;
  price: number;
  rating: number;
  reviews: number;
  status: string;
  imageUrl: string;
}

const reviews: Review[] = [
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
    id: "567891234123",
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
  {
    id: "567891234",
    title: "Bluetooth Speaker",
    price: 799,
    rating: 4.2,
    reviews: 90,
    status: "Canceled",
    imageUrl: "/bag-1.jpg",
  },
];

const tabs: { label: string; value: ReviewFilter }[] = [
  { label: "All", value: "all" },
  { label: "Delivered", value: "delivered" },
  { label: "Canceled", value: "canceled" },
];

const ITEMS_PER_PAGE = 2;

const MyReviews: React.FC = () => {
  const dispatch = useAppDispatch();
  const activeFilter = useSelector(
    (state: RootState) => state.reviewFilter.filter
  );

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Filtered Orders (Memoized to prevent infinite loop)
  const filteredReviews = useMemo(() => {
    setIsLoading(true); // Simulate loading
    const result = reviews.filter((review) => {
      if (activeFilter === "all") return true;
      if (activeFilter === "delivered") return review.status === "Delivered";
      if (activeFilter === "canceled") return review.status === "Canceled";
      return false;
    });

    setTimeout(() => setIsLoading(false), 500);
    return result;
  }, [activeFilter]);

  // Calculate total pages
  const totalPages = Math.max(
    Math.ceil(filteredReviews.length / ITEMS_PER_PAGE),
    1
  );

  // Get current page orders
  const paginatedReviews = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredReviews.slice(start, end);
  }, [filteredReviews, currentPage]);

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);

  const handlePageChange = (page: number) => {
    // Prevent out of bound pages
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="relative h-full">
      <h2 className="text-xl font-bold text-scarlet-red mb-6">My Reviews</h2>

      {/* Tabs */}
      <div className="flex space-x-3.5 mb-8">
        {tabs.map((tab) => (
          <Button
            key={tab.value}
            className={`py-2 px-6 rounded-lg font-semibold transition text-sm ${
              activeFilter === tab.value
                ? "bg-scarlet-red text-white"
                : "bg-[#eee] text-gray-700"
            }`}
            onClick={() => dispatch(setReviewFilter(tab.value))}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* No Orders Found */}
      {isLoading && (
        <div className="space-y-4">
          {[...Array(ITEMS_PER_PAGE)].map((_, index) => (
            <MyReviewCardSkeleton key={index} reviewCard={true} />
          ))}
        </div>
      )}

      {/* Order List */}
      {!isLoading && paginatedReviews.length > 0 && (
        <div className="space-y-2">
          {paginatedReviews.map((order) => (
            <div
              key={order.id}
              className="border border-[#eeeeee] pb-2 rounded-lg"
            >
              <div className="flex justify-between mb-4 bg-[#f5f5f5] px-3 py-3.5">
                <span className="font-semibold">Order #{order.id}</span>
                <span
                  className={cn(
                    "py-1 px-2.5 rounded-full text-sm font-medium",
                    order.status === "Awaiting Payment"
                      ? "bg-yellow-100"
                      : "bg-green-100 text-green-700"
                  )}
                >
                  {order.status}
                </span>
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
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {filteredReviews.length > 0 && (
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

export default MyReviews;
