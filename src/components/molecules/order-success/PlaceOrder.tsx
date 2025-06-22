import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Order, OrderItem } from "@/types/orderSuccess";
import { CreditCard, Package } from "lucide-react";
import { Button } from "@/components/atoms/Button";

interface Props {
  message: string;
  order: Order;
  orderItem: OrderItem[];
}

const PlaceOrder: React.FC<Props> = ({ message, order, orderItem }) => {
  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">
          Order Confirmed!
        </h1>
        <p className="text-gray-600 mb-6">{message}</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8 space-y-4">
        <div className="flex items-start gap-4">
          <div className="text-gray-500">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">
              Estimated Delivery Date:{" "}
              <span className="text-gray-900">
                {new Date(order.createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </p>
            <p className="text-xs text-gray-500">
              Order ID: {order.uniqueOrderId}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="text-gray-500">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">
              Order Total:{" "}
              <span className="text-gray-900">
                ${order.totalAmount.toFixed(2)}
              </span>
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Items</h2>
      <div className="grid sm:grid-cols-3 gap-6 mb-8">
        {orderItem.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-lg p-3 text-center"
          >
            <Image
              src={item.productImageUrl}
              alt={item.productName}
              width={200}
              height={200}
              className="rounded-lg object-cover mx-auto"
            />
            <h3 className="mt-3 font-medium text-gray-800 text-sm">
              {item.productName}
            </h3>
            <p className="text-sm text-gray-600">
              Quantity: {item.quantity}, Price: ${item.price.toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 mb-6">
        <Button variant="authBtn" className="whitespace-nowrap px-6 py-2">
          Track Order
        </Button>

        <Link
          href="/"
          className="bg-gray-100 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-200 transition whitespace-nowrap flex items-center justify-center"
        >
          Return to Home
        </Link>

        <Link
          href="/shop/all"
          className="text-red-600 px-6 py-2 rounded-md hover:underline transition whitespace-nowrap flex items-center justify-center"
        >
          Continue Shopping
        </Link>
      </div>

      <p className="text-sm text-center text-gray-500">
        Need help? Contact us at{" "}
        <a href="mailto:support@favorselect.com" className="underline">
          support@favorselect.com
        </a>
      </p>
    </div>
  );
};

export default PlaceOrder;
