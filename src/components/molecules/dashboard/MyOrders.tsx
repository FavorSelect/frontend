import { Button } from "@/components/atoms/Button";
import { useAppDispatch } from "@/store/hook";
import {
  OrderFilter,
  setOrderFilter,
} from "@/store/slices/dashboard/orderFilterSlice";
import { RootState } from "@/store/store";
import { Star, Truck } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import { UserCardSkeleton as MyOrderCardSkeleton } from "@/components/molecules/dashboard/UserCardSkeleton";
import { cn } from "@/utils/cn";
import { useGetFilteredOrdersQuery } from "@/store/api/userDashboardApi";
import Link from "next/link";

const tabs: { label: string; value: OrderFilter }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Processing", value: "processing" },
  { label: "Shipped", value: "shipped" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
];

const MyOrders = ({ token }: { token: string }) => {
  const dispatch = useAppDispatch();
  const activeFilter = useSelector(
    (state: RootState) => state.orderFilter.filter
  );

  const { data, isLoading, isFetching } = useGetFilteredOrdersQuery({
    token,
    status: activeFilter === "all" ? undefined : activeFilter,
  });

  const orders = data?.orders || [];

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

      {/* Loading Skeleton */}
      {isLoading || isFetching ? (
        Array.from({ length: 2 }).map((_, index) => (
          <MyOrderCardSkeleton key={index} />
        ))
      ) : (
        <div className="space-y-2">
          {orders.length === 0 ? (
            <p className="text-center text-gray-500">No orders found.</p>
          ) : (
            orders.map((order) => {
              const showReviewButton =
                activeFilter === "delivered" ||
                (activeFilter === "all" &&
                  order.orderStatus.toLowerCase() === "delivered");

              return (
                <div key={order.id}>
                  <div className="flex justify-between mb-4 bg-[#f5f5f5] px-3 py-3.5 rounded-lg">
                    <span className="font-semibold">
                      Order #{order.uniqueOrderId.replace(/-/g, "")}
                    </span>
                    <span
                      className={cn(
                        "py-1 px-2.5 rounded-full text-sm font-medium",
                        order.orderStatus === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-700"
                      )}
                    >
                      {order.orderStatus}
                    </span>
                  </div>

                  {/* Order Items */}
                  {order.orderItems.map((item) => (
                    <div
                      key={item.id}
                      className="border border-[#eeeeee] pb-2 rounded-lg mb-4"
                    >
                      <div className="flex justify-between">
                        <div className="flex gap-4 items-center p-3">
                          <Image
                            src={
                              item.productImageUrl || "/blur-placeholder.png"
                            }
                            alt={item.productName}
                            className="w-20 h-20 object-cover rounded-lg"
                            width={80}
                            height={80}
                            loading="lazy"
                          />
                          <div>
                            <h3 className="font-semibold text-lg">
                              {item.productName}
                            </h3>
                            <p className="text-base font-medium">
                              TRY {item.price}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col space-y-3.5 p-3">
                          <Link
                            href={`/dashboard/orders/${item.id}`}
                            className="bg-scarlet-red text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 transition text-sm flex items-center"
                          >
                            <Truck className="w-5 h-5 mr-2" /> Track
                          </Link>

                          {showReviewButton ? (
                            <Link
                              href={`/dashboard/orders/${item.id}/review`}
                              className="bg-scarlet-red text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 transition text-sm flex items-center"
                            >
                              <Star className="w-5 h-5 mr-2" /> Review
                            </Link>
                          ) : (
                            <span className="bg-gray-300 text-white py-2 px-4 rounded-lg font-semibold text-sm flex items-center cursor-not-allowed">
                              <Star className="w-5 h-5 mr-2" /> Review
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
