import { Button } from "@/components/atoms/Button";
import { setSelectedSize } from "@/store/slices/product-details/productSizeSelectorSlice";
import { RootState } from "@/store/store";
import Link from "next/link";
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
    <div>
      <label className="font-medium text-sm block mb-1">
        Size: {selectedSize}
      </label>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <Button
            key={size}
            onClick={() => handleSizeClick(size)}
            className={`px-4 py-1.5 rounded border text-sm ${
              selectedSize === size
                ? "border-[#1540ad] font-semibold"
                : "border-gray-300"
            }`}
          >
            {size}
          </Button>
        ))}
      </div>
      <Link href="#" className="text-blue-600 text-xs mt-1 inline-block">
        Find Your Size
      </Link>
    </div>
  );
};

export default ProductSizeSelector;
