"use client";

import { Button } from "@/components/atoms/Button";
import { Checkbox } from "@/components/atoms/Checkbox";
import Section from "@/components/atoms/Section";
import ContainerBox from "@/components/layout/ContainerBox";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import { CartItem } from "@/components/molecules/cart/CartItem";
import { OrderSummary } from "@/components/molecules/cart/OrderSummary";
import React, { useState } from "react";

type CartProduct = {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  deliveryText: string;
  shipping: number | "Free";
  tax: number;
};

const dummyProducts: CartProduct[] = [
  {
    id: "1",
    name: "Cosmetic",
    imageUrl: "/bag-4.jpg",
    price: 599,
    originalPrice: 599,
    quantity: 3,
    deliveryText: "Estimated between 4 Aug to 7 Aug",
    shipping: "Free",
    tax: 50,
  },
  {
    id: "2",
    name: "Spice Item",
    imageUrl: "/bag-4.jpg",
    price: 599,
    originalPrice: 599,
    quantity: 3,
    deliveryText: "Estimated between 4 Aug to 7 Aug",
    shipping: 25,
    tax: 45,
  },
  {
    id: "3",
    name: "Leather Slipper",
    imageUrl: "/bag-4.jpg",
    price: 599,
    originalPrice: 599,
    quantity: 3,
    deliveryText: "Estimated between 4 Aug to 7 Aug",
    shipping: 0,
    tax: 55,
  },
  {
    id: "4",
    name: "Premium T-shirt",
    imageUrl: "/bag-4.jpg",
    price: 599,
    originalPrice: 599,
    quantity: 3,
    deliveryText: "Estimated between 4 Aug to 7 Aug",
    shipping: "Free",
    tax: 30,
  },
];

const CartLayout: React.FC = () => {
  const [cart, setCart] = useState<CartProduct[]>(dummyProducts);
  const [selectedIds, setSelectedIds] = useState<string[]>(
    cart.map((p) => p.id)
  );

  const handleSelect = (id: string, selected: boolean) => {
    setSelectedIds((prev) =>
      selected ? [...prev, id] : prev.filter((itemId) => itemId !== id)
    );
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemove = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    setSelectedIds((prev) => prev.filter((itemId) => itemId !== id));
  };

  const handleApplyPromo = (code: string) => {
    console.log("Applying promo code:", code);
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? cart.map((item) => item.id) : []);
  };

  const handleDeleteAll = () => {
    setCart((prev) => prev.filter((item) => !selectedIds.includes(item.id)));
    setSelectedIds([]);
  };

  const selectedItems = cart.filter((item) => selectedIds.includes(item.id));
  const subtotal = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const itemCount = selectedItems.reduce(
    (count, item) => count + item.quantity,
    0
  );

  const shippingTotal = selectedItems.reduce((sum, item) => {
    if (item.shipping === "Free" || item.shipping === 0) return sum;
    return sum + item.shipping;
  }, 0);

  const taxTotal = selectedItems.reduce((sum, item) => sum + item.tax, 0);

  const grandTotal = subtotal + shippingTotal + taxTotal;

  return (
    <Section className="py-8">
      <MaxWidthWrapper>
        <ContainerBox className="py-8 px-5 bg-white shadow-sm rounded-md">
          <div className="flex items-center justify-between mb-4">
            {cart.length !== 0 && (
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={selectedIds.length === cart.length}
                  onChange={handleSelectAll}
                />
                <span className="text-sm text-gray-600">Select all</span>
              </div>
            )}
            <Button
              onClick={handleDeleteAll}
              className="bg-scarlet-red text-white px-2 py-1 rounded-lg font-semibold"
            >
              Delete all
            </Button>
          </div>
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Cart List Section */}
            <div className="basis-3/5">
              <div className="space-y-6">
                {cart.map((product) => (
                  <CartItem
                    key={product.id}
                    {...product}
                    isSelected={selectedIds.includes(product.id)}
                    onSelect={handleSelect}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemove}
                  />
                ))}
              </div>
            </div>

            {/* Order Summary Section */}
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
        </ContainerBox>
      </MaxWidthWrapper>
    </Section>
  );
};

export default CartLayout;
