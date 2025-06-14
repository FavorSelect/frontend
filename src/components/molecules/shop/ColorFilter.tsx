"use client";

import React, { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { setPending } from "@/store/slices/filterUI.slice";
import { useDispatch } from "react-redux";
import { Button } from "@/components/atoms/Button";

const ColorFilter = ({
  colors,
}: {
  colors: { name: string; count: number; hex: string }[];
}) => {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  useEffect(() => {
    const raw = searchParams.get("colors");
    const values = raw ? raw.split(",") : [];
    setSelectedColors(values);
  }, [searchParams]);

  useEffect(() => {
    dispatch(setPending(isPending));
  }, [isPending, dispatch]);

  const updateURL = (updated: string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    if (updated.length > 0) {
      params.set("colors", updated.join(","));
    } else {
      params.delete("colors");
    }
    startTransition(() => router.push(`?${params.toString()}`));
  };

  const toggleColor = (name: string) => {
    const updated = selectedColors.includes(name)
      ? selectedColors.filter((c) => c !== name)
      : [...selectedColors, name];

    setSelectedColors(updated);
    updateURL(updated);
  };

  const handleResetColorFilter = () => {
    setSelectedColors([]);

    const params = new URLSearchParams(searchParams.toString());
    params.delete("colors");

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">Filter by color</h3>
        {selectedColors.length > 0 && !isPending && (
          <Button onClick={handleResetColorFilter} variant="resetBtn">
            Reset
          </Button>
        )}
      </div>
      <ul className="space-y-3">
        {colors.map(({ name, hex, count }) => {
          const isSelected = selectedColors.includes(name);
          return (
            <li key={name}>
              <button
                type="button"
                className="w-full flex items-center justify-between gap-2"
                onClick={() => toggleColor(name)}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-5 h-5 rounded-full ${
                      isSelected ? "ring-2 ring-blue-600" : ""
                    }`}
                    style={{ backgroundColor: hex }}
                  />
                  <span className="text-sm">{name}</span>
                </div>
                <span className="text-sm text-gray-500">({count})</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ColorFilter;
