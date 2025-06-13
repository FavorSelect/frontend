"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetOrdersByIdQuery } from "@/store/api/userDashboardApi";
import { RootState } from "@/store/store";
import { setOrderDetails } from "@/store/slices/dashboard/orderDetailsSlice";
import Image from "next/image";

const OrderDetails = ({ id, token }: { id: string; token: string }) => {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetOrdersByIdQuery({ id, token });
  const order = useSelector((state: RootState) => state.orderDetails.order);

  useEffect(() => {
    if (data) {
      console.log(data.order);
      dispatch(setOrderDetails(data.order));
    }
  }, [data, dispatch]);

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
  if (!order)
    return <p className="text-center text-red-500">Order not found.</p>;

  return (
    <div className="space-y-6">
      {/* Order Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Order #{order.uniqueOrderId.replace(/-/g, "")}
        </h2>
        <p className="text-sm text-gray-600">
          Order Date: {new Date(order.orderDate).toLocaleString()}
        </p>
        <p className="text-sm text-gray-600">
          Delivery Date:{" "}
          {order.deliveryDate
            ? new Date(order.deliveryDate).toLocaleString()
            : "Not yet delivered"}
        </p>
      </div>

      {/* Order Info */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <p className="font-medium text-gray-700">Status</p>
          <p>{order.orderStatus}</p>
        </div>
        <div>
          <p className="font-medium text-gray-700">Payment</p>
          <p>
            {order.paymentMethod} - {order.paymentStatus}
          </p>
        </div>
        <div>
          <p className="font-medium text-gray-700">Total Amount</p>
          <p>₹{order.totalAmount}</p>
        </div>
      </div>
      {/* Shipping Address */}
      <div>
        <p className="font-medium text-gray-700">Shipping Address</p>
        <div className="bg-gray-50 p-4 rounded-md mt-2 shadow-sm">
          <p className="text-gray-900 font-semibold">
            {order.shippingAddress?.recipientName}
          </p>
          <p>{order.shippingAddress?.street}</p>
          <p>
            {order.shippingAddress?.city}, {order.shippingAddress?.state} -{" "}
            {order.shippingAddress?.postalCode}
          </p>
          <p>{order.shippingAddress?.country}</p>
          <p>Phone: {order.shippingAddress?.phoneNumber}</p>
          <p className="text-sm text-gray-500">
            {order.shippingAddress?.type} address{" "}
            {order.shippingAddress?.isDefault && "(Default)"}
          </p>
        </div>
      </div>
      {/* Order Items */}
      <div>
        <p className="font-medium text-gray-700 mb-2">Items</p>
        <ul className="divide-y divide-gray-200">
          {order.orderItems.map((item, index) => (
            <li key={index} className="py-4 flex gap-4">
              <Image
                src={item.productImageUrl}
                alt={item.productName}
                className="w-16 h-16 object-cover rounded"
                width={70}
                height={70}
              />
              <div className="flex-1">
                <p className="font-medium text-gray-900">{item.productName}</p>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {item.product.productDescription}
                </p>
                <p className="text-sm text-gray-700">
                  Quantity: {item.quantity} × ₹{item.price}
                </p>
                <p className="text-sm font-semibold text-gray-800 mt-1">
                  Total: ₹{item.totalPrice}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderDetails;
