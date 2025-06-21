import { Button } from "@/components/atoms/Button";
import { setSelectedSize } from "@/store/slices/product-details/productSizeSelectorSlice";
import { RootState } from "@/store/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  sizes: string[];
}

const ProductSizeSelector = ({ sizes }: Props) => {
  const dispatch = useDispatch();
  const selectedSize = useSelector(
    (state: RootState) => state.productSizeSelector.selectedSize
  );

  const handleSizeClick = (size: string) => {
    dispatch(setSelectedSize(size));
  };

  return (
    <div className="w-full md:max-w-md mx-auto px-0 sm:px-0">
      <label className="font-medium text-sm block mb-2" htmlFor="product-size">
        Size:{" "}
        <span className="font-semibold">{selectedSize || "Not selected"}</span>
      </label>

      <div
        id="product-size"
        role="radiogroup"
        className="grid grid-cols-3 sm:flex sm:flex-wrap gap-2"
      >
        {sizes.map((size) => (
          <Button
            key={size}
            role="radio"
            aria-checked={selectedSize === size}
            onClick={() => handleSizeClick(size)}
            className={`w-full sm:w-auto text-center px-2 py-1 sm:px-4 sm:py-2 rounded border text-sm transition-all duration-150 ease-in-out focus:outline-none ${
              selectedSize === size
                ? "border-scarlet-red font-semibold ring-1 ring-scarlet-red"
                : "border-gray-300 hover:border-gray-500"
            }`}
          >
            {size}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ProductSizeSelector;
