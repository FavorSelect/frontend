"use client";
import React from "react";
import { useFinalizeCartStripeOrderQuery } from "@/store/api/checkoutApi";
import SkeletonOrderPlaced from "@/components/molecules/order-success/SkeletonOrderPlaced";
import Section from "@/components/atoms/Section";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import ContainerBox from "@/components/layout/ContainerBox";
import { CartOrderSuccessResponse } from "@/types/cartOrderSuccess";

interface Props {
  sessionId: string;
}

const CartOrderSuccessWrappeer: React.FC<Props> = ({ sessionId }) => {
  const { data, isLoading, isError, isSuccess } =
    useFinalizeCartStripeOrderQuery({
      session_id: sessionId!,
    });

  if (isLoading) {
    return <SkeletonOrderPlaced />;
  }

  if (isError || !data || !data.order) {
    return (
      <div className="text-red-600 text-sm font-medium text-center mt-6">
        Something went wrong while finalizing your order.
      </div>
    );
  }

  if (isSuccess) {
    const { message, order }: CartOrderSuccessResponse = data;

    return (
      <Section className="py-10">
        <MaxWidthWrapper>
          <ContainerBox
            hasBackground={true}
            className="flex flex-col items-center justify-center gap-6 p-8"
          >
            <h2 className="text-2xl font-semibold text-green-700">{message}</h2>

            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-sm text-gray-600">Order ID</p>
                <p className="font-medium text-gray-900">
                  #{order.uniqueOrderId}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-gray-600">Payment Status</p>
                <p className="font-medium text-gray-900">
                  {order.paymentStatus}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-gray-600">Order Status</p>
                <p className="font-medium text-gray-900">{order.orderStatus}</p>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-gray-600">Payment Method</p>
                <p className="font-medium text-gray-900">
                  {order.paymentMethod}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="font-medium text-gray-900">
                  ${order.totalAmount}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-gray-600">Order Date</p>
                <p className="font-medium text-gray-900">
                  {new Date(order.orderDate).toLocaleString()}
                </p>
              </div>
            </div>
          </ContainerBox>
        </MaxWidthWrapper>
      </Section>
    );
  }

  return null;
};

export default CartOrderSuccessWrappeer;
