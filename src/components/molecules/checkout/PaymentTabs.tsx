"use client";
import { useDispatch, useSelector } from "react-redux";
import { setPaymentMethod } from "@/store/slices/checkout/checkoutSlice";
import { RootState } from "@/store/store";
import { useState } from "react";

const PAYMENT_METHODS = ["Credit/Debit Card", "Payoneer", "Coinbase"];

export default function PaymentTabs() {
  const dispatch = useDispatch();
  const currentMethod = useSelector(
    (state: RootState) => state.checkout.paymentMethod
  );
  const [selectedMethod, setSelectedMethod] = useState(currentMethod);

  const handleTabClick = (method: string) => {
    setSelectedMethod(method);
    dispatch(setPaymentMethod(method));
  };

  return (
    <div className="flex gap-4 mb-6">
      {PAYMENT_METHODS.map((method) => (
        <div
          key={method}
          onClick={() => handleTabClick(method)}
          className={`px-4 py-2 rounded-lg cursor-pointer font-semibold 
            ${
              selectedMethod === method
                ? "bg-red-500 text-white"
                : "bg-gray-200 text-gray-700"
            } 
            transition-all duration-200`}
        >
          {method}
        </div>
      ))}
    </div>
  );
}
