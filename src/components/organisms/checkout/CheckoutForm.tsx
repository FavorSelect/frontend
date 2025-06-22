"use client";

import { Button } from "@/components/atoms/Button";
import { Checkbox } from "@/components/atoms/Checkbox";
import Section from "@/components/atoms/Section";
import ContainerBox from "@/components/layout/ContainerBox";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import AddressForm from "@/components/molecules/checkout/CheckoutAddressForm";
import CheckoutAddressSkeleton from "@/components/molecules/checkout/CheckoutAddressSkeleton";
import DrawerContainer from "@/components/molecules/global/Drawer";
import { useGetShippingAddressQuery } from "@/store/api/userDashboardApi";
import { RootState } from "@/store/store";
import { Lock, Plus } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useCreateStripeCheckoutMutation } from "@/store/api/checkoutApi";
import Spinner from "@/components/molecules/global/Spinner";
import { handleApiError } from "@/utils/handleApiError";

const CheckoutForm = () => {
  const quantity = useSelector(
    (state: RootState) => state.productQuantity.quantity
  );
  const productId = useSelector((state: RootState) => state.productId.id);
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, isError } = useGetShippingAddressQuery();
  const addresses = useMemo(() => data?.addresses || [], [data]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null
  );
  const [createCheckout, { isLoading: isCheckoutLoading }] =
    useCreateStripeCheckoutMutation();

  useEffect(() => {
    if (!addresses || addresses.length === 0) return;

    const defaultAddress = addresses.find((addr) => addr.isDefault);
    if (defaultAddress) {
      setSelectedAddressId(defaultAddress.id);
    } else if (addresses.length === 1) {
      setSelectedAddressId(addresses[0].id);
    }
  }, [addresses]);

  const handleCheckout = async () => {
    try {
      const response = await createCheckout({
        productId: productId,
        quantity: quantity,
        addressId: selectedAddressId!,
      }).unwrap();
      window.location.href = response.url;
    } catch (err) {
      handleApiError(err, "Failed to create checkout session");
    }
  };

  return (
    <Section>
      <MaxWidthWrapper>
        <ContainerBox hasBackground={true}>
          <div className="space-y-5">
            <div className="space-y-4">
              {isLoading && (
                <>
                  {[...Array(3)].map((_, idx) => (
                    <CheckoutAddressSkeleton key={idx} />
                  ))}
                </>
              )}

              {isError && (
                <div className="text-red-600 text-sm font-medium">
                  Failed to load shipping addresses. Please try again later.
                </div>
              )}

              {!isLoading &&
                !isError &&
                addresses.length !== 0 &&
                addresses.map((address) => {
                  const isSelected = selectedAddressId === address.id;

                  return (
                    <div
                      key={address.id}
                      onClick={() => setSelectedAddressId(address.id)}
                      className={`cursor-pointer border rounded-lg p-5 bg-white transition-colors duration-200 ${
                        isSelected
                          ? "border-scarlet-red ring-2 ring-scarlet-red"
                          : "border-gray-200"
                      }`}
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div className="space-y-2 text-sm text-gray-700">
                          <div className="flex items-center gap-2">
                            <Checkbox
                              checked={isSelected}
                              onChange={() => setSelectedAddressId(address.id)}
                              id={`address-${address.id}`}
                            />
                            <p className="font-semibold text-gray-800">
                              {address.recipientName}
                            </p>
                          </div>

                          <div>
                            <span className="font-medium text-gray-600">
                              Phone:
                            </span>{" "}
                            <span>{address.phoneNumber}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-600">
                              City:
                            </span>{" "}
                            <span>{address.city}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-600">
                              State:
                            </span>{" "}
                            <span>{address.state}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-600">
                              Country:
                            </span>{" "}
                            <span>{address.country.toUpperCase()}</span>
                          </div>
                        </div>

                        <div className="flex flex-col gap-1 items-end">
                          {address.isDefault && (
                            <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-1 rounded">
                              Default
                            </span>
                          )}

                          {isSelected && (
                            <span className="text-xs font-medium bg-red-100 text-red-600 px-2 py-1 rounded">
                              Selected
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
              <Button
                onClick={() => setIsOpen(true)}
                variant="authBtn"
                className="w-full max-w-54"
              >
                <Plus size={19} /> Add New Address
              </Button>

              {selectedAddressId && (
                <Button
                  disabled={isCheckoutLoading}
                  variant="authBtn"
                  className={`w-full max-w-54 flex items-center justify-center gap-2 ${
                    isCheckoutLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={handleCheckout}
                >
                  {isCheckoutLoading ? (
                    <>
                      <Spinner />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      Secure Checkout
                    </>
                  )}
                </Button>
              )}
            </div>

            <DrawerContainer
              dismissible={false}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            >
              <AddressForm setIsOpen={setIsOpen} />
            </DrawerContainer>
          </div>
        </ContainerBox>
      </MaxWidthWrapper>
    </Section>
  );
};

export default CheckoutForm;
