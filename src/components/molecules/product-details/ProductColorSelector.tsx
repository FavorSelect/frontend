import React from "react";
import { Button } from "@/components/atoms/Button";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedColor } from "@/store/slices/product-details/productColorSelectorSlice";
import { RootState } from "@/store/store";
import Span from "@/components/atoms/Span";

interface Props {
  colors: string[];
}

const ProductColorSelector = ({ colors }: Props) => {
  const dispatch = useDispatch();
  const selectedColor = useSelector(
    (state: RootState) => state.productColorSelector.selectedColor
  );

  const handleSelectColor = (color: string) => {
    dispatch(setSelectedColor(color));
  };

  return (
    <div className="flex flex-col gap-3">
      <Span className="font-medium text-sm">Color: {selectedColor}</Span>

      <div className="flex flex-row space-x-2">
        {colors.map((color, index) => {
          const isSelected = selectedColor === color;
          return (
            <div
              key={index}
              className={`border w-8 h-8 flex items-center justify-center rounded-full ${
                isSelected ? "border-[#1540ad]" : "border-gray-300"
              }`}
            >
              <Button
                className="w-6 h-6 rounded-full"
                onClick={() => handleSelectColor(color)}
                style={{ backgroundColor: color }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductColorSelector;
