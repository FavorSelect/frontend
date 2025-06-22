"use client";
import { Button } from "@/components/atoms/Button";
import { Checkbox } from "@/components/atoms/Checkbox";
import Section from "@/components/atoms/Section";
import ContainerBox from "@/components/layout/ContainerBox";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import { CartItem } from "@/components/molecules/cart/CartItem";
import { OrderSummary } from "@/components/molecules/cart/OrderCartSummary";
import {
  useDeleteSelectedCartItemsMutation,
  useGetCartSummaryQuery,
  useUpdateCartItemMutation,
} from "@/store/api/cartApi";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { handleApiError } from "@/utils/handleApiError";
import { Plus, ShoppingCart, Trash } from "lucide-react";
import Spinner from "@/components/molecules/global/Spinner";
import SkeletonCartItem from "@/components/molecules/cart/SkeletonCartItem";
import SkeletonOrderSummary from "@/components/molecules/cart/SkeletonOrderSummary";
import SkeletonCartHeader from "@/components/molecules/cart/SkeletonCartHeader";
import SkeletonCartTitle from "@/components/molecules/cart/SkeletonCartTitle";
import { useGetShippingAddressQuery } from "@/store/api/userDashboardApi";
import DrawerContainer from "@/components/molecules/global/Drawer";
import CheckoutAddressForm from "@/components/molecules/checkout/CheckoutAddressForm";
import CheckoutAddressSkeleton from "@/components/molecules/checkout/CheckoutAddressSkeleton";
import { useCreateCartStripeCheckoutMutation } from "@/store/api/checkoutApi";

const CartWrapper: React.FC = () => {
  const {
    data: cartData,
    isLoading: isCartLoading,
    isError: isCartError,
  } = useGetCartSummaryQuery();

  const cart = cartData?.cart?.CartItems ?? [];
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [loadingIds, setLoadingIds] = useState<number[]>([]);
  const [removeLoadingIds, setRemoveLoadingIds] = useState<number[]>([]);
  const [updateCartItem] = useUpdateCartItemMutation();
  const [deleteSelectedCartItems, { isLoading: isBulkDeleting }] =
    useDeleteSelectedCartItemsMutation();
  const [deleteSingleItem] = useDeleteSelectedCartItemsMutation();
  const [isOpen, setIsOpen] = useState(false);
  const {
    data: addressData,
    isLoading: isAddressLoading,
    isError: isAddressError,
  } = useGetShippingAddressQuery();

  const addresses = useMemo(() => addressData?.addresses || [], [addressData]);

  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null
  );

  const [createCartStripeCheckout, { isLoading: isCartCheckoutLoading }] =
    useCreateCartStripeCheckoutMutation();

  useEffect(() => {
    if (!addresses || addresses.length === 0) return;

    const defaultAddress = addresses.find((addr) => addr.isDefault);
    if (defaultAddress) {
      setSelectedAddressId(defaultAddress.id);
    } else if (addresses.length === 1) {
      setSelectedAddressId(addresses[0].id);
    }
  }, [addresses]);

  const handleSelect = (id: number, selected: boolean) => {
    setSelectedIds((prev) =>
      selected ? [...prev, id] : prev.filter((itemId) => itemId !== id)
    );
  };

  const handleQuantityChange = async (id: number, quantity: number) => {
    const item = cart.find((c) => c.id === id);
    if (!item || item.quantity === quantity) return;

    setLoadingIds((prev) => [...prev, id]);

    try {
      const response = await updateCartItem({
        cartItemId: id,
        quantity,
      }).unwrap();
      toast.success(response?.message || "Cart updated");
    } catch (err) {
      handleApiError(err, "Failed to update cart item");
    } finally {
      setLoadingIds((prev) => prev.filter((itemId) => itemId !== id));
    }
  };

  const handleRemove = async (id: number) => {
    setRemoveLoadingIds((prev) => [...prev, id]);
    try {
      const response = await deleteSingleItem({
        itemIds: [id],
      }).unwrap();
      toast.success(response?.message || "Item removed from cart");
    } catch (err) {
      handleApiError(err, "Failed to remove item");
    }
  };

  const handleApplyPromo = (code: string) => {
    console.log("Applying promo code:", code);
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? cart.map((item) => item.id) : []);
  };

  const handleDeleteAll = async () => {
    if (selectedIds.length === 0) {
      alert("select all to delete");
      return;
    }
    try {
      const response = await deleteSelectedCartItems({
        itemIds: selectedIds,
      }).unwrap();
      toast.success(response?.message || "Selected items removed from cart");
    } catch (err) {
      handleApiError(err, "Failed to remove selected items");
    }
  };

  const subtotal = cartData?.summary.totalPrice ?? 0;
  const itemCount = cartData?.summary.totalItems ?? 0;

  const shippingTotal = 0;
  const taxTotal = 0;
  const grandTotal = subtotal + shippingTotal + taxTotal;

  const handleCheckout = async () => {
    try {
      const response = await createCartStripeCheckout({
        addressId: selectedAddressId!,
      }).unwrap();
      window.location.href = response.url;
    } catch (err) {
      handleApiError(err, "Failed to create cart checkout session");
    }
  };

  return (
    <Section className="py-8">
      <MaxWidthWrapper>
        <ContainerBox className="py-8 px-5 bg-white shadow-sm rounded-md">
          {cart.length > 0 && (
            <div className="space-y-5">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Shipping Address</h2>
                {isAddressLoading && (
                  <>
                    {[...Array(3)].map((_, idx) => (
                      <CheckoutAddressSkeleton key={idx} />
                    ))}
                  </>
                )}

                {isAddressError && (
                  <div className="text-red-600 text-sm font-medium">
                    Failed to load shipping addresses. Please try again later.
                  </div>
                )}

                {!isAddressLoading &&
                  !isAddressError &&
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
                                onChange={() =>
                                  setSelectedAddressId(address.id)
                                }
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
              {!isAddressLoading && (
                <div className="flex justify-end gap-3 sm:gap-4">
                  <Button
                    onClick={() => setIsOpen(true)}
                    variant="authBtn"
                    className="w-full max-w-54"
                  >
                    <Plus size={19} /> Add New Address
                  </Button>
                </div>
              )}

              <DrawerContainer
                dismissible={false}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
              >
                <CheckoutAddressForm setIsOpen={setIsOpen} />
              </DrawerContainer>
            </div>
          )}
          {isCartLoading ? (
            <>
              <SkeletonCartTitle />
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="basis-3/5">
                  <SkeletonCartHeader />
                  <div className="space-y-6">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <SkeletonCartItem key={index} />
                    ))}
                  </div>
                </div>
                <div className="basis-2/5">
                  <SkeletonOrderSummary />
                </div>
              </div>
            </>
          ) : isCartError ? (
            <p className="text-center text-red-500">Failed to load cart.</p>
          ) : cart.length === 0 ? (
            <p className="text-center text-gray-600">Your cart is empty.</p>
          ) : (
            <>
              <div className="border-b border-b-gray-200 mb-4 pb-2 flex gap-x-2 items-center">
                <h2 className="text-lg font-semibold">Your Cart</h2>{" "}
                <ShoppingCart size={20} />
              </div>
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="basis-3/5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={selectedIds.length === cart.length}
                        onChange={handleSelectAll}
                        id="allSelect"
                      />
                      <label
                        htmlFor="allSelect"
                        className="text-sm text-gray-600 select-none cursor-pointer"
                      >
                        Select all
                      </label>
                    </div>
                    <Button
                      onClick={handleDeleteAll}
                      className="bg-scarlet-red flex items-center justify-center gap-2 text-white px-3 py-2 rounded-md font-semibold transition disabled:opacity-70 disabled:cursor-not-allowed"
                      disabled={isBulkDeleting}
                    >
                      {isBulkDeleting ? (
                        <>
                          <Spinner className="text-white w-4 h-4" />
                          Deleting...
                        </>
                      ) : (
                        <>
                          <Trash size={18} />
                          Delete all
                        </>
                      )}
                    </Button>
                  </div>
                  <div>
                    <div className="space-y-6">
                      {cart.map((item) => (
                        <CartItem
                          key={item.id}
                          id={item.id.toString()}
                          name={item.Product.productName}
                          imageUrl={item.Product.coverImageUrl}
                          price={item.price}
                          originalPrice={
                            item.Product.productDiscountPrice ?? undefined
                          }
                          quantity={item.quantity}
                          deliveryText="Estimated between 4 Aug to 7 Aug"
                          loading={loadingIds.includes(item.id)}
                          removeLoading={removeLoadingIds.includes(item.id)}
                          avaiableStockQuantity={
                            item.Product.availableStockQuantity
                          }
                          isSelected={selectedIds.includes(item.id)}
                          onSelect={(id, checked) =>
                            handleSelect(parseInt(id), checked)
                          }
                          onQuantityChange={(id, qty) =>
                            handleQuantityChange(parseInt(id), qty)
                          }
                          onRemove={(id) => handleRemove(parseInt(id))}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="basis-2/5">
                  <OrderSummary
                    itemCount={itemCount}
                    subtotal={subtotal}
                    shippingTotal={shippingTotal}
                    taxTotal={taxTotal}
                    total={grandTotal}
                    onApplyPromo={handleApplyPromo}
                    onCheckout={handleCheckout}
                    isCheckoutLoading={isCartCheckoutLoading}
                    selectedAddressId={selectedAddressId}
                  />
                </div>
              </div>
            </>
          )}
        </ContainerBox>
      </MaxWidthWrapper>
    </Section>
  );
};

export default CartWrapper;
