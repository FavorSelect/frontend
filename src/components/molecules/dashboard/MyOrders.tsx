import { Button } from "@/components/atoms/Button";
import { useAppDispatch } from "@/store/hook";
import {
  OrderFilter,
  setOrderFilter,
} from "@/store/slices/dashboard/orderFilterSlice";
import { RootState } from "@/store/store";
import { Star, Truck } from "lucide-react";
import Image from "next/image";
import React, { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import Pagination from "../global/Pagination";
import { UserCardSkeleton as MyOrderCardSkeleton } from "@/components/molecules/dashboard/UserCardSkeleton";
import { cn } from "@/utils/cn";

interface Order {
  id: string;
  title: string;
  price: number;
  rating: number;
  reviews: number;
  status: string;
  imageUrl: string;
}

const orders: Order[] = [
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

const tabs: { label: string; value: OrderFilter }[] = [
  { label: "All", value: "all" },
  { label: "Delivered", value: "delivered" },
  { label: "Awaiting Payment", value: "awaiting" },
];

const ITEMS_PER_PAGE = 2;

const MyOrders: React.FC = () => {
  const dispatch = useAppDispatch();
  const activeFilter = useSelector(
    (state: RootState) => state.orderFilter.filter
  );

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Filtered Orders (Memoized to prevent infinite loop)
  const filteredOrders = useMemo(() => {
    setIsLoading(true); // Simulate loading
    const result = orders.filter((order) => {
      if (activeFilter === "all") return true;
      if (activeFilter === "delivered") return order.status === "Delivered";
      if (activeFilter === "awaiting")
        return order.status === "Awaiting Payment";
      return false;
    });

    setTimeout(() => setIsLoading(false), 500);
    return result;
  }, [activeFilter]);

  // Calculate total pages
  const totalPages = Math.max(
    Math.ceil(filteredOrders.length / ITEMS_PER_PAGE),
    1
  );

  // Get current page orders
  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredOrders.slice(start, end);
  }, [filteredOrders, currentPage]);

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
      <h2 className="text-xl font-bold text-scarlet-red mb-6">My Orders</h2>

      {/* Tabs */}
      <div className="flex space-x-3.5 mb-8">
        {tabs.map((tab) => (
          <Button
            key={tab.value}
            className={`py-2 px-6 rounded-lg font-semibold text-sm transition-colors duration-150 ease-in ${
              activeFilter === tab.value
                ? "bg-scarlet-red text-white"
                : "bg-[#eee] hover:bg-scarlet-red hover:text-white text-gray-700"
            }`}
            onClick={() => dispatch(setOrderFilter(tab.value))}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* No Orders Found */}
      {isLoading && (
        <div className="space-y-4">
          {[...Array(ITEMS_PER_PAGE)].map((_, index) => (
            <MyOrderCardSkeleton key={index} />
          ))}
        </div>
      )}

      {/* Order List */}
      {!isLoading && paginatedOrders.length > 0 && (
        <div className="space-y-2">
          {paginatedOrders.map((order) => (
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
                <div className="flex flex-col space-y-3.5 p-3">
                  <Button className="bg-scarlet-red text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 transition text-sm flex items-center">
                    <Truck className="w-5 h-5 mr-2" /> Track
                  </Button>
                  <Button className="bg-scarlet-red text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 transition text-sm flex items-center">
                    <Star className="w-5 h-5 mr-2" /> Review
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {filteredOrders.length > 0 && (
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

export default MyOrders;
