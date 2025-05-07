import { Button } from "@/components/atoms/Button";
import Span from "@/components/atoms/Span";
import { setQuantity } from "@/store/slices/product-details/productQuantitySlice";
import { RootState } from "@/store/store";
import { Minus, Plus } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

interface IncrementDecrementProps {
  maximumRoomLength?: number;
}

const QuantitySelector: React.FC<IncrementDecrementProps> = ({
  maximumRoomLength = 10,
}) => {
  const dispatch = useDispatch();
  const quantity = useSelector(
    (state: RootState) => state.productQuantity.quantity
  );

  const handleIncrement = () => {
    if (quantity < maximumRoomLength) {
      dispatch(setQuantity(quantity + 1));
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      dispatch(setQuantity(quantity - 1));
    }
  };

  return (
    <div className="flex items-center border border-black rounded-sm overflow-hidden w-24">
      {/* Decrement Button */}
      <Button
        className="w-1/3 h-7 flex items-center justify-center text-sm font-semibold border-r border-gray-300 transition disabled:opacity-50"
        aria-label="Decrement"
        onClick={handleDecrement}
        disabled={quantity <= 1}
      >
        <Minus className="w-4 h-4" />
      </Button>

      {/* Value */}
      <Span className="w-1/3 h-7 flex items-center justify-center text-sm font-semibold border-x border-gray-300 select-none">
        {quantity}
      </Span>

      {/* Increment Button */}
      <Button
        className="w-1/3 h-7 flex items-center justify-center text-sm font-semibold text-black transition disabled:opacity-50"
        aria-label="Increment"
        onClick={handleIncrement}
        disabled={quantity >= 10}
      >
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default QuantitySelector;
