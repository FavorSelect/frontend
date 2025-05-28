import React from "react";
import { PromoCodeInput } from "./PromoCodeInput";
import Span from "@/components/atoms/Span";
import Image from "next/image";
import { Lock } from "lucide-react";
import Link from "next/link";

const paymentIconFilenames = [
  "visa",
  "mastercard",
  "paypal",
  "unionpay",
  "stripe",
  "google-pay",
  "elo",
  "troy",
  "zapper",
  "bitpay",
];

type OrderSummaryProps = {
  itemCount: number;
  subtotal: number;
  shippingTotal: number;
  taxTotal: number;
  total: number;
  onApplyPromo: (code: string) => void;
};

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  itemCount,
  subtotal,
  shippingTotal,
  taxTotal,
  total,
  onApplyPromo,
}) => {
  return (
    <div className="shadow-md py-3 px-4 rounded-md bg-white w-full">
      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

      <div className="flex justify-between mb-2">
        <Span className="text-gray-600">Items:</Span>
        <Span>{itemCount.toString().padStart(2, "0")}</Span>
      </div>

      <div className="flex justify-between mb-2">
        <Span className="text-gray-600">Sub Total:</Span>
        <Span>${subtotal}</Span>
      </div>

      <div className="flex justify-between mb-2">
        <Span className="text-gray-600">Shipping:</Span>
        <Span>{shippingTotal === 0 ? "Free" : `$${shippingTotal}`}</Span>
      </div>

      <div className="flex justify-between mb-4">
        <Span className="text-gray-600">Tax:</Span>
        <Span>${taxTotal}</Span>
      </div>

      <div className="flex justify-between font-semibold text-lg mb-4 border-t border-gray-200 pt-3">
        <Span>Total:</Span>
        <Span>${total}</Span>
      </div>

      <PromoCodeInput onApply={onApplyPromo} />

      <Link
        href="/checkout"
        className="mt-6 w-full flex gap-x-2 justify-center items-center bg-scarlet-red text-white py-3 rounded-lg font-semibold"
      >
        <Lock className="w-5 h-5" /> Secure Checkout
      </Link>

      <div className="mt-5">
        <h4 className="mb-2 font-semibold text-lg">We Accept</h4>
        <div className="flex flex-wrap gap-4">
          {paymentIconFilenames.map((file) => (
            <Image
              key={file}
              src={`/${file}.svg`}
              alt={file}
              width={36}
              height={24}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
