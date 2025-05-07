// src/organisms/checkout/OrderSummary.tsx

"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Span from "@/components/atoms/Span";

export default function CheckoutOrderSummary() {
  const orderSummary = useSelector(
    (state: RootState) => state.checkout.orderSummary
  );

  return (
    <div className="bg-white shadow-sm rounded-md p-6">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
      <ul className="space-y-2">
        <li className="flex justify-between">
          <Span>Item Total:</Span>
          <Span>${orderSummary.itemTotal.toFixed(2)}</Span>
        </li>
        <li className="flex justify-between">
          <Span>Sub Total:</Span>
          <Span>${orderSummary.subTotal.toFixed(2)}</Span>
        </li>
        <li className="flex justify-between">
          <Span>Tax:</Span>
          <Span>${orderSummary.tax.toFixed(2)}</Span>
        </li>
        <li className="flex justify-between font-semibold">
          <Span>Total:</Span>
          <Span>${orderSummary.total.toFixed(2)}</Span>
        </li>
      </ul>
    </div>
  );
}
