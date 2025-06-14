"use client";
import React, { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/atoms/Checkbox";
import { setPending } from "@/store/slices/filterUI.slice";
import { useDispatch } from "react-redux";
import { Button } from "@/components/atoms/Button";

type Props = {
  categories: string[];
};

const ProductCategoryFilter = ({ categories }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const [isPending, startTransition] = useTransition();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    dispatch(setPending(isPending));
  }, [isPending, dispatch]);

  useEffect(() => {
    const raw = searchParams.get("categories");
    const values = raw ? raw.split(",") : [];
    setSelectedCategories(values);
  }, [searchParams]);

  const updateURL = (updated: string[]) => {
    const params = new URLSearchParams(searchParams.toString());

    if (updated.length > 0) {
      params.set("categories", updated.join(","));
    } else {
      params.delete("categories");
    }

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  const handleCheckboxChange = (category: string, checked: boolean) => {
    const updated = checked
      ? [...selectedCategories, category]
      : selectedCategories.filter((c) => c !== category);

    setSelectedCategories(updated);
    updateURL(updated);
  };

  const handleResetCategoryFilter = () => {
    setSelectedCategories([]);

    const params = new URLSearchParams(searchParams.toString());
    params.delete("categories");

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between item-center">
        <h3 className="font-semibold text-base">Product Categories</h3>
        {selectedCategories.length > 0 && !isPending && (
          <Button onClick={handleResetCategoryFilter} variant="resetBtn">
            Reset
          </Button>
        )}
      </div>
      <ul className="space-y-3">
        {categories.map((category) => {
          const isChecked = selectedCategories.includes(category);
          return (
            <li key={category}>
              <label
                className="flex items-center gap-2 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  handleCheckboxChange(category, !isChecked);
                }}
              >
                <Checkbox
                  checked={isChecked}
                  onChange={(checked) =>
                    handleCheckboxChange(category, checked)
                  }
                />
                <span className="text-sm font-medium text-gray-700 select-none">
                  {category}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProductCategoryFilter;
