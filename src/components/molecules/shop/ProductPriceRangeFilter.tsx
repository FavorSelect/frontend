"use client";

import React, { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { setPending } from "@/store/slices/filterUI.slice";
import { DualRangeSlider } from "../slider/DualRangeSlider";
import { Button } from "@/components/atoms/Button";

type Props = {
  min: number;
  max: number;
  valueType?: string;
};

const ProductPriceRangeFilter = ({ min, max, valueType = "$" }: Props) => {
  const [localRange, setLocalRange] = useState<[number, number]>([min, max]);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  useEffect(() => {
    dispatch(setPending(isPending));
  }, [isPending, dispatch]);

  useEffect(() => {
    const maxFromUrl = searchParams.get("maxPrice");

    if (maxFromUrl) {
      const parsed = parseFloat(maxFromUrl);
      if (!isNaN(parsed)) {
        setLocalRange(([minVal]) => [minVal, parsed]);
      }
    } else {
      setLocalRange([min, max]);
    }
  }, [searchParams, min, max]);

  const handleRangeChange = (updated: [number, number]) => {
    setLocalRange(updated);

    const params = new URLSearchParams(searchParams.toString());
    params.set("maxPrice", String(updated[1]));

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  const handleResetPriceFilter = () => {
    setLocalRange([min, max]);

    const params = new URLSearchParams(searchParams.toString());
    params.delete("maxPrice");

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-base">Filter by Price</h3>
        {localRange[1] < max && !isPending && (
          <Button onClick={handleResetPriceFilter} variant="resetBtn">
            Reset
          </Button>
        )}
      </div>
      <div className="transform translate-y-3">
        <DualRangeSlider
          label={(value) => (
            <span className="relative px-2 py-1 rounded-md bg-white shadow-md inline-block after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-t-[6px] after:border-t-white after:border-l-[6px] after:border-l-transparent after:border-r-[6px] after:border-r-transparent">
              {value}
              {valueType}
            </span>
          )}
          value={localRange}
          onValueChange={handleRangeChange}
          min={min}
          max={max}
          step={1}
        />
      </div>
    </div>
  );
};

export default ProductPriceRangeFilter;
