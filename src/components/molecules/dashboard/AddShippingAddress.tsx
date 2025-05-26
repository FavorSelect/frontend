"use client";
import { Button } from "@/components/atoms/Button";
import Span from "@/components/atoms/Span";
import { MapPin } from "lucide-react";
import React, { useState } from "react";
import ShippingAddressForm, { AddressFormValues } from "./ShippingAddressForm";
import ShippingAddressList from "./ShippingAddressList";
import DrawerContainer from "../global/Drawer";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const AddShippingAddress = ({ token }: { token: string }) => {
  const addresses = useSelector(
    (state: RootState) => state.getShippingAddress.addresses
  );
  const [isOpen, setIsOpen] = useState(false);
  const [editAddress, setEditAddress] = useState<AddressFormValues | null>(
    null
  );

  const openForAdd = () => {
    setEditAddress(null);
    setIsOpen(true);
  };

  const openForEdit = (address: AddressFormValues) => {
    setEditAddress(address);
    setIsOpen(true);
  };

  const hasAddresses = addresses && addresses.length > 0;

  return (
    <>
      <div className="relative h-full flex flex-col">
        {/* Header Section */}
        <div className="w-full flex justify-between items-center p-4">
          <h2 className="text-xl font-bold text-scarlet-red">Saved Address</h2>
          <Span className="text-sm text-gray-500 hover:text-gray-700">
            Manage your shipping and billing addresses
          </Span>
        </div>

        {/* Conditional rendering: Either list or empty state */}
        <div className="flex-grow px-4">
          {hasAddresses ? (
            <>
              <ShippingAddressList token={token} onEdit={openForEdit} />
              <div className="flex justify-end mt-4">
                <Button
                  onClick={openForAdd}
                  className="px-6 py-2 border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition-colors border"
                >
                  Add More
                </Button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <MapPin className="text-gray-300 w-12 h-12 mb-4" />
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                No addresses saved
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                Add an address for faster checkout
              </p>
              <Button
                onClick={openForAdd}
                className="px-6 py-2 border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition-colors border"
              >
                Add Address
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Drawer for add/edit */}
      <DrawerContainer isOpen={isOpen} setIsOpen={setIsOpen}>
        <ShippingAddressForm
          token={token}
          setIsOpen={setIsOpen}
          updateAdd={editAddress}
        />
      </DrawerContainer>
    </>
  );
};

export default AddShippingAddress;
