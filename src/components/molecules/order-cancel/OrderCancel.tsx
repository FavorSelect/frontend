import { Button } from "@/components/atoms/Button";
import Link from "next/link";
import React from "react";

const OrderCancel: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        <h1 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">
          Payment Unsuccessful
        </h1>
        <p className="text-gray-600 mb-6">
          Unfortunately, your payment could not be processed.
        </p>

        <div className="flex flex-col gap-3 mb-6">
          <Button variant="authBtn" className="whitespace-nowrap px-6 py-2">
            Try Again
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
            Go to Shopping
          </Link>
        </div>

        <p className="text-sm text-center text-gray-500">
          For assistance, contact us at{" "}
          <a href="mailto:support@favorselect.com" className="underline">
            support@favorselect.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default OrderCancel;
