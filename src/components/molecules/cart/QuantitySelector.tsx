import { Button } from "@/components/atoms/Button";
import Span from "@/components/atoms/Span";
import { Minus } from "lucide-react";
import React from "react";

type QuantitySelectorProps = {
  quantity: number;
  onChange: (quantity: number) => void;
};

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onChange,
}) => {
  return (
    <div className="flex items-center border border-gray-200 rounded-sm overflow-hidden w-24">
      <Button
        onClick={() => onChange(Math.max(1, quantity - 1))}
        className="w-1/3 h-7 flex items-center justify-center text-sm font-semibold border-r border-gray-300 transition disabled:opacity-50"
        aria-label="Decrement"
        disabled={quantity <= 1}
      >
        <Minus className="w-4 h-4" />
      </Button>
      <Span className="w-1/3 h-7 flex items-center justify-center text-sm font-semibold border-x border-gray-300 select-none">
        {quantity}
      </Span>
      <Button
        className="w-1/3 h-7 flex items-center justify-center text-sm font-semibold text-black transition disabled:opacity-50"
        aria-label="Increment"
        onClick={() => onChange(quantity + 1)}
        disabled={quantity >= 8}
      >
        +
      </Button>
    </div>
  );
};
