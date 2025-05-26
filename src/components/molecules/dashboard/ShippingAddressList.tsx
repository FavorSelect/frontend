/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  useDeleteShippingAddressMutation,
  useGetShippingAddressQuery,
} from "@/store/api/userDashboardApi";
import React, { useEffect } from "react";
import { Button } from "@/components/atoms/Button";
import { AddressFormValues } from "./ShippingAddressForm";
import toast from "react-hot-toast";

import {
  clearShippingAddresses,
  setShippingAddresses,
} from "@/store/slices/dashboard/getShippingAddressSlice";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../global/Spinner";
import { Edit, Trash } from "lucide-react";

type ShippingAddressListProps = {
  token: string;
  onEdit: (address: AddressFormValues) => void;
};

const ShippingAddressList = ({ token, onEdit }: ShippingAddressListProps) => {
  const [deletingId, setDeletingId] = React.useState<number | null>(null);
  const [deleteShippingAddress] = useDeleteShippingAddressMutation();
  const dispatch = useDispatch();
  const { data, error, isLoading, refetch } = useGetShippingAddressQuery({
    token,
  });

  const addresses = useSelector(
    (state: RootState) => state.getShippingAddress.addresses
  );

  useEffect(() => {
    if (data?.addresses) {
      dispatch(setShippingAddresses(data.addresses));
    } else if (error) {
      dispatch(clearShippingAddresses());
    }
  }, [data, error, dispatch]);

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this address?"
    );
    if (!confirmed) return;

    setDeletingId(id);

    try {
      await deleteShippingAddress({ token, id }).unwrap();
      toast.success("Address deleted successfully!");

      const result = await refetch();
      if (result.data?.addresses) {
        dispatch(setShippingAddresses(result.data.addresses));
      }
    } catch (err) {
      toast.error("Failed to delete address.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-4">
      {addresses.length !== 0 &&
        addresses.map((address: AddressFormValues) => (
          <div
            key={address.id}
            className="border border-gray-200 rounded-lg p-5 bg-white"
          >
            <div className="flex justify-between items-start gap-4">
              <div className="space-y-2 text-sm text-gray-700">
                <div>
                  <p className="font-semibold text-gray-800">
                    {address.recipientName}
                  </p>
                </div>

                <div>
                  <span className="font-medium text-gray-600">Phone:</span>{" "}
                  <span>{address.phoneNumber}</span>
                </div>

                <div>
                  <span className="font-medium text-gray-600">City:</span>{" "}
                  <span>{address.city}</span>
                </div>

                <div>
                  <span className="font-medium text-gray-600">State:</span>{" "}
                  <span>{address.state}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Country:</span>{" "}
                  <span>{address.country.toUpperCase()}</span>
                </div>
              </div>

              {/* Default Badge */}
              {address.isDefault && (
                <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-1 rounded">
                  Default
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-4 ">
              <Button
                onClick={() => onEdit(address)}
                className="text-sm border border-gray-300 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50 transition"
              >
                <Edit className="w-4 h-4" />
                Edit
              </Button>
              <Button
                onClick={() => handleDelete(address.id)}
                className="text-sm border border-transparent px-4 py-2 rounded-md text-white bg-scarlet-red hover:bg-red-600 transition"
              >
                {deletingId === address.id ? (
                  <>
                    <Spinner />
                    <span className="ml-1">Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash className="w-4 h-4" /> <span>Delete</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ShippingAddressList;
