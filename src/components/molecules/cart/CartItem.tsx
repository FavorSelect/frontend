import React from "react";
import Image from "next/image";
import { RemoveCart } from "./RemoveCart";
import { QuantitySelector } from "./QuantitySelector";
import { Checkbox } from "@/components/atoms/Checkbox";
import { PriceTag } from "@/components/atoms/PriceTag";

type CartItemProps = {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  isSelected: boolean;
  deliveryText: string;
  onSelect: (id: string, selected: boolean) => void;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
};

export const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  imageUrl,
  price,
  originalPrice,
  quantity,
  isSelected,
  deliveryText,
  onSelect,
  onQuantityChange,
  onRemove,
}) => {
  return (
    <div className="flex items-center gap-3 py-4 shadow-md px-3 rounded-lg">
      <Checkbox
        checked={isSelected}
        onChange={(checked: boolean) => onSelect(id, checked)}
      />

      <Image
        src={imageUrl}
        alt={name}
        className="w-auto h-auto object-cover rounded-md pr-3"
        width={70}
        height={70}
      />

      <div className="flex-1 space-y-1.5">
        <h4 className="font-semibold text-lg text-gray-800">{name}</h4>
        <p className="text-sm text-gray-500">{deliveryText}</p>
        <PriceTag price={price} originalPrice={originalPrice} />
        <QuantitySelector
          quantity={quantity}
          onChange={(newQty) => onQuantityChange(id, newQty)}
        />
      </div>

      <div>
        <RemoveCart onClick={() => onRemove(id)} />
      </div>
    </div>
  );
};
