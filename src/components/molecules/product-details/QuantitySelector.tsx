import { Button } from "@/components/atoms/Button";
import { setQuantity } from "@/store/slices/product-details/productQuantitySlice";
import { RootState } from "@/store/store";
import { Minus, Plus } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

interface IncrementDecrementProps {
  productInStock: number;
}

const QuantitySelector: React.FC<IncrementDecrementProps> = ({
  productInStock,
}) => {
  const dispatch = useDispatch();
  const quantity = useSelector(
    (state: RootState) => state.productQuantity.quantity
  );

  const handleIncrement = () => {
    if (quantity < productInStock) {
      dispatch(setQuantity(quantity + 1));
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      dispatch(setQuantity(quantity - 1));
    }
  };

  return (
    <div
      className="flex items-center border border-gray-400 rounded-md overflow-hidden w-28 sm:w-24 h-9"
      role="group"
      aria-label="Quantity Selector"
    >
      {/* Decrement */}
      <Button
        aria-label="Decrease quantity"
        onClick={handleDecrement}
        disabled={quantity <= 1}
        className="w-1/3 h-full flex items-center justify-center border-r border-gray-300 text-sm font-semibold transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50"
      >
        <Minus className="w-4 h-4" />
      </Button>

      {/* Quantity Display */}
      <span
        className="w-1/3 h-full flex items-center justify-center text-sm font-semibold select-none"
        aria-live="polite"
      >
        {quantity}
      </span>

      {/* Increment */}
      <Button
        aria-label="Increase quantity"
        onClick={handleIncrement}
        disabled={quantity >= 10}
        className="w-1/3 h-full flex items-center justify-center border-l border-gray-300 text-sm font-semibold transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50"
      >
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default QuantitySelector;
