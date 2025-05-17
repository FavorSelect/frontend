import { Button } from "@/components/atoms/Button";
import Span from "@/components/atoms/Span";
import { MapPin } from "lucide-react";
import React from "react";

const EmptyAddressList = () => {
  return (
    <div className="relative h-full flex flex-col">
      {/* Header Section */}
      <div className="w-full flex justify-between items-center p-4">
        <h2 className="text-xl font-bold text-scarlet-red">Saved Address</h2>
        <Span className="text-sm text-gray-500 hover:text-gray-700">
          Manage your shipping and billing addresses
        </Span>
      </div>

      {/* Content Section */}
      <div className="flex-grow flex items-center justify-center">
        <div className="flex flex-col items-center">
          <MapPin className="text-gray-300 w-12 h-12 mb-4" />
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            No addresses saved
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Add an address for faster checkout
          </p>
          <Button className="px-6 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition">
            Add Address
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmptyAddressList;
