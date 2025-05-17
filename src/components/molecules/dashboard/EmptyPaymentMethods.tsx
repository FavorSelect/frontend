import { Button } from "@/components/atoms/Button";
import Span from "@/components/atoms/Span";
import { CreditCard, Plus } from "lucide-react";
import React from "react";

const EmptyPaymentMethods = () => {
  return (
    <div className="relative h-full flex flex-col">
      {/* Header Section */}
      <div className="w-full flex justify-between items-center p-4">
        <h2 className="text-xl font-bold text-scarlet-red">Payment Methods</h2>
        <Span className="text-sm text-gray-500 hover:text-gray-700">
          Manage your saved payment methods
        </Span>
        <Button className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition">
          <Plus className="w-4 h-4" /> Add Card
        </Button>
      </div>

      {/* Content Section */}
      <div className="flex-grow flex items-center justify-center">
        <div className="flex flex-col items-center">
          <CreditCard className="text-gray-300 w-12 h-12 mb-4" />
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            No payment methods saved
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Add a payment method to make checkout faster
          </p>
          <Button className="px-6 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition">
            Add Payment Method
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmptyPaymentMethods;
