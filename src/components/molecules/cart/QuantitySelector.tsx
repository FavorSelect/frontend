import { Button } from "@/components/atoms/Button";
import Span from "@/components/atoms/Span";
import { Minus, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import Spinner from "../global/Spinner";

type QuantitySelectorProps = {
  quantity: number;
  onChange: (quantity: number) => void;
  loading: boolean;
  avaiableStockQuantity: number;
};

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onChange,
  loading,
  avaiableStockQuantity,
}) => {
  const [activeButton, setActiveButton] = useState<"inc" | "dec" | null>(null);

  const handleClick = (direction: "inc" | "dec") => {
    setActiveButton(direction);
    const newQty =
      direction === "inc" ? quantity + 1 : Math.max(1, quantity - 1);
    onChange(newQty);
  };

  useEffect(() => {
    if (!loading && activeButton !== null) {
      setActiveButton(null);
    }
  }, [loading, activeButton]);

  return (
    <div className="flex items-center border border-gray-200 rounded-sm overflow-hidden w-27">
      <Button
        onClick={() => handleClick("dec")}
        disabled={quantity <= 1 || (loading && activeButton === "dec")}
        className="w-1/3 h-7 flex items-center justify-center text-sm font-semibold border-r border-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading && activeButton === "dec" ? (
          <Spinner className="text-scarlet-red/100 mr-0" />
        ) : (
          <Minus className="w-4 h-4" />
        )}
      </Button>

      <Span className="w-1/3 h-7 flex items-center justify-center text-sm font-semibold border-x border-gray-300 select-none">
        {quantity}
      </Span>

      <Button
        onClick={() => handleClick("inc")}
        disabled={
          quantity >= avaiableStockQuantity ||
          (loading && activeButton === "inc")
        }
        className="w-1/3 h-7 flex items-center justify-center text-sm font-semibold text-black transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading && activeButton === "inc" ? (
          <Spinner className="text-scarlet-red/100 mr-0" />
        ) : (
          <Plus className="w-4 h-4" />
        )}
      </Button>
    </div>
  );
};
