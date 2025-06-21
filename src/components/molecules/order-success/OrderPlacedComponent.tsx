import { Order, OrderItem } from "@/types/orderSuccess";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  order: Order;
  orderItem: OrderItem;
  message: string;
}

const OrderPlacedComponent: React.FC<Props> = ({
  order,
  orderItem,
  message,
}) => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg space-y-6">
      <h2 className="text-2xl font-bold text-green-600 text-center">
        {message}
      </h2>

      <div className="space-y-2 text-sm md:text-base text-gray-700">
        <p>
          <strong>Order ID:</strong> #{order?.uniqueOrderId}
        </p>
        <p>
          <strong>Status:</strong> {order?.orderStatus}
        </p>
        <p>
          <strong>Total Amount:</strong> ₹{order?.totalAmount}
        </p>
        <p>
          <strong>Payment Method:</strong> {order?.paymentMethod}
        </p>
        <p>
          <strong>Payment Status:</strong> {order?.paymentStatus}
        </p>
        <p>
          <strong>Order Date:</strong>{" "}
          {new Date(order?.orderDate).toLocaleString()}
        </p>
      </div>

      <hr className="my-4 h-0.5 border-0 bg-gray-200" />

      <div className="flex gap-4 items-center">
        <div className="w-20 h-20 relative">
          <Image
            src={orderItem.productImageUrl}
            alt={orderItem.productName}
            fill
            className="rounded object-cover"
          />
        </div>
        <div className="text-sm text-gray-800">
          <p className="font-semibold">{orderItem.productName}</p>
          <p>Qty: {orderItem.quantity}</p>
          <p>
            Price: ₹{orderItem.price} x {orderItem.quantity} = ₹
            {orderItem.totalPrice}
          </p>
        </div>
      </div>
      <div className="pt-4 text-center">
        <Link
          href="/shop/all"
          className="inline-block px-4 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700 transition"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderPlacedComponent;
