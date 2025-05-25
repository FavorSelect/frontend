"use client";
import Section from "@/components/atoms/Section";
import ContainerBox from "@/components/layout/ContainerBox";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import AddressForm from "@/components/molecules/checkout/CheckoutAddressForm";
import CardDetailsForm from "@/components/molecules/checkout/CardDetailsForm";
import CheckoutOrderSummary from "@/components/molecules/checkout/CheckoutOrderSummary";
import CoinbaseDetails from "@/components/molecules/checkout/CoinbaseDetails";
import PaymentTabs from "@/components/molecules/checkout/PaymentTabs";
import PayoneerDetails from "@/components/molecules/checkout/PayoneerDetails";
import { RootState } from "@/store/store";
import React from "react";
import { useSelector } from "react-redux";

const CheckoutForm = () => {
  const paymentMethod = useSelector(
    (state: RootState) => state.checkout.paymentMethod
  );
  return (
    <Section className="py-6">
      <MaxWidthWrapper>
        <ContainerBox>
          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex-1 space-y-5">
              {/* Shipping Address Form */}
              <div className="space-y-4 py-8 px-5 bg-white shadow-sm rounded-md">
                <h2 className="text-lg font-semibold">Shipping Address</h2>
                <AddressForm />
              </div>
              {/* Payment Method */}
              <div className="space-y-3 py-8 px-5 bg-white shadow-sm rounded-md">
                <h2 className="text-lg font-semibold">Payment Method</h2>
                <PaymentTabs />
                {/* Conditional Rendering for Payment Forms */}
                {paymentMethod === "Credit/Debit Card" ? (
                  <CardDetailsForm />
                ) : paymentMethod === "Payoneer" ? (
                  <PayoneerDetails />
                ) : paymentMethod === "Coinbase" ? (
                  <CoinbaseDetails />
                ) : (
                  <div className="p-4 bg-gray-100 rounded-md">
                    <p className="text-sm text-gray-700">
                      Please select a payment method.
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full md:w-96">
              <CheckoutOrderSummary />
            </div>
          </div>
        </ContainerBox>
      </MaxWidthWrapper>
    </Section>
  );
};

export default CheckoutForm;
