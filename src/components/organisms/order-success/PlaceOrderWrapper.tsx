"use client";

import React from "react";
import { useFinalizeStripeOrderQuery } from "@/store/api/checkoutApi";
import { OrderSuccessResponse } from "@/types/orderSuccess";
import SkeletonOrderPlaced from "@/components/molecules/order-success/SkeletonOrderPlaced";
import Section from "@/components/atoms/Section";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import ContainerBox from "@/components/layout/ContainerBox";
import PlaceOrder from "@/components/molecules/order-success/PlaceOrder";

interface Props {
  sessionId?: string;
}

const PlaceOrderWrapper: React.FC<Props> = ({ sessionId }) => {
  const { data, isLoading, isError, isSuccess } = useFinalizeStripeOrderQuery({
    session_id: sessionId!,
  });

  // Handle loading state
  if (isLoading) {
    return <SkeletonOrderPlaced />;
  }

  // Handle error or invalid data state
  if (isError || !data || !data.order || !data.orderItem) {
    return (
      <div className="text-red-600 text-sm font-medium text-center mt-6">
        Something went wrong while finalizing your order.
      </div>
    );
  }

  // Handle successful response
  if (isSuccess) {
    const { message, order, orderItem }: OrderSuccessResponse = data;

    return (
      <Section>
        <MaxWidthWrapper>
          <ContainerBox
            hasBackground={true}
            className="flex flex-col items-center justify-center"
          >
            <PlaceOrder
              message={message}
              order={order}
              orderItem={Array.isArray(orderItem) ? orderItem : [orderItem]}
            />
          </ContainerBox>
        </MaxWidthWrapper>
      </Section>
    );
  }

  // Fallback (should not happen)
  return null;
};

export default PlaceOrderWrapper;
