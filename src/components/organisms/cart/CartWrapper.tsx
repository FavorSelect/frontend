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
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { handleApiError } from "@/utils/handleApiError";
import { ShoppingCart, Trash } from "lucide-react";
import Spinner from "@/components/molecules/global/Spinner";

const CartWrapper: React.FC = () => {
  const { data, isLoading, isError } = useGetCartSummaryQuery();

  const cart = data?.cart?.CartItems ?? [];
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [loadingIds, setLoadingIds] = useState<number[]>([]);
  const [removeLoadingIds, setRemoveLoadingIds] = useState<number[]>([]);
  const [updateCartItem] = useUpdateCartItemMutation();
  const [deleteSelectedCartItems, { isLoading: isBulkDeleting }] =
    useDeleteSelectedCartItemsMutation();
  const [deleteSingleItem] = useDeleteSelectedCartItemsMutation();

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

  const subtotal = data?.summary.totalPrice ?? 0;
  const itemCount = data?.summary.totalItems ?? 0;

  const shippingTotal = 0;
  const taxTotal = 0;
  const grandTotal = subtotal + shippingTotal + taxTotal;

  return (
    <Section className="py-8">
      <MaxWidthWrapper>
        <ContainerBox className="py-8 px-5 bg-white shadow-sm rounded-md">
          <div className="border-b border-b-gray-200 mb-4 pb-2 flex gap-x-2 items-center">
            <h2 className="text-lg font-semibold">Your Cart</h2>{" "}
            <ShoppingCart size={20} />
          </div>
          {isLoading ? (
            <p className="text-center text-gray-500">Loading cart...</p>
          ) : isError ? (
            <p className="text-center text-red-500">Failed to load cart.</p>
          ) : cart.length === 0 ? (
            <p className="text-center text-gray-600">Your cart is empty.</p>
          ) : (
            <>
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

                <div className="basis-2/5">
                  <OrderSummary
                    itemCount={itemCount}
                    subtotal={subtotal}
                    shippingTotal={shippingTotal}
                    taxTotal={taxTotal}
                    total={grandTotal}
                    onApplyPromo={handleApplyPromo}
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
