import React from "react";

type PriceTagProps = {
  price: number;
  originalPrice?: number;
};

export const PriceTag: React.FC<PriceTagProps> = ({ price, originalPrice }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-lg font-semibold text-gray-900">${price}</span>
      {originalPrice && (
        <span className="text-sm line-through text-gray-400">
          ${originalPrice}
        </span>
      )}
    </div>
  );
};
