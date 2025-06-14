"use client";

import React, { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/atoms/Checkbox";
import { useDispatch } from "react-redux";
import { setPending } from "@/store/slices/filterUI.slice";
import { Button } from "@/components/atoms/Button";

type Brand = {
  name: string;
  count: number;
};

const BrandFilter = ({ brands }: { brands: Brand[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPending(isPending));
  }, [isPending, dispatch]);

  useEffect(() => {
    const raw = searchParams.get("brands");
    const values = raw ? raw.split(",") : [];
    setSelectedBrands(values);
  }, [searchParams]);

  const updateURL = (updated: string[]) => {
    const params = new URLSearchParams(searchParams.toString());

    if (updated.length > 0) {
      params.set("brands", updated.join(","));
    } else {
      params.delete("brands");
    }

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  const handleToggle = (brand: string, checked: boolean) => {
    const updated = checked
      ? [...selectedBrands, brand]
      : selectedBrands.filter((b) => b !== brand);

    setSelectedBrands(updated);
    updateURL(updated);
  };

  const handleResetBrandFilter = () => {
    setSelectedBrands([]);

    const params = new URLSearchParams(searchParams.toString());
    params.delete("brands");

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-base">Filter by brands</h3>
        {selectedBrands.length > 0 && !isPending && (
          <Button onClick={handleResetBrandFilter} variant="resetBtn">
            Reset Brand Filter
          </Button>
        )}
      </div>
      <ul className="space-y-3">
        {brands.map(({ name, count }) => {
          const isChecked = selectedBrands.includes(name);
          return (
            <li key={name}>
              <label
                className="flex items-center justify-between gap-2 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  handleToggle(name, !isChecked);
                }}
              >
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={isChecked}
                    onChange={(checked) => handleToggle(name, checked)}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {name}
                  </span>
                </div>
                <span className="text-sm text-gray-500">({count})</span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BrandFilter;
