/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  useDeleteShippingAddressMutation,
  useGetShippingAddressMutation,
} from "@/store/api/userDashboardApi";
import React, { useEffect } from "react";
import { Button } from "@/components/atoms/Button";
import { AddressFormValues } from "./ShippingAddressForm";
import toast from "react-hot-toast";
import Spinner from "../global/Spinner";

type ShippingAddressListProps = {
  token: string;
  onEdit: (address: AddressFormValues) => void;
  onDataLoad: (addresses: AddressFormValues[]) => void;
};

const ShippingAddressList = ({
  token,
  onEdit,
  onDataLoad,
}: ShippingAddressListProps) => {
  const [getShippingAddress, { data }] = useGetShippingAddressMutation();
  const [deleteShippingAddress, { isLoading }] =
    useDeleteShippingAddressMutation();

  useEffect(() => {
    if (token) {
      getShippingAddress({ token });
    }
  }, [token, getShippingAddress]);

  useEffect(() => {
    if (data?.addresses) {
      onDataLoad(data.addresses);
    }
  }, [data, onDataLoad]);

  const addresses = data?.addresses || [];

  const handleDelete = async (id: number) => {
    try {
      await deleteShippingAddress({ token, id }).unwrap();
      toast.success("Address deleted successfully!");
      getShippingAddress({ token });
    } catch (err) {
      toast.error("Failed to delete address.");
    }
  };

  return (
    <>
      <div className="space-y-4">
        {addresses.length !== 0 &&
          addresses.map((address: AddressFormValues) => (
            <div
              key={address.id}
              className="border rounded-md p-4 shadow-sm space-y-1 relative"
            >
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold">{address.recipientName}</p>
                  <p className="text-sm text-gray-600">{address.phoneNumber}</p>
                  <p className="text-sm text-gray-600">
                    {address.street}, {address.city}, {address.state} -{" "}
                    {address.postalCode}, {address.country.toUpperCase()}
                  </p>
                </div>

                {address.isDefault && (
                  <div>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      Default
                    </span>
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  onClick={() => onEdit(address)}
                  className="text-sm border border-gray-300 hover:bg-gray-100 px-2 py-1.5"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(address.id)}
                  className="text-sm border border-gray-300 text-white px-2 py-1.5 bg-scarlet-red"
                >
                  {isLoading && <Spinner />}
                  Delete
                </Button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default ShippingAddressList;
