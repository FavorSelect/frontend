"use client";

import React, { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/atoms/Checkbox";
import { useDispatch } from "react-redux";
import { setPending } from "@/store/slices/filterUI.slice";
import { Button } from "@/components/atoms/Button";

const ProductStatusFilter = ({
  statuses,
}: {
  statuses: { name: string; count: number }[];
}) => {
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const raw = searchParams.get("inventoryStatus");
    const values = raw ? raw.split(",") : [];
    setSelectedStatuses(values);
  }, [searchParams]);

  useEffect(() => {
    dispatch(setPending(isPending));
  }, [isPending, dispatch]);

  const updateURL = (updated: string[]) => {
    const params = new URLSearchParams(searchParams.toString());

    if (updated.length > 0) {
      params.set("inventoryStatus", updated.join(","));
    } else {
      params.delete("inventoryStatus");
    }

    startTransition(() => router.push(`?${params.toString()}`));
  };

  const toggleStatus = (status: string, checked: boolean) => {
    const updated = checked
      ? [...selectedStatuses, status]
      : selectedStatuses.filter((s) => s !== status);

    setSelectedStatuses(updated);
    updateURL(updated);
  };

  const handleResetStatusFilter = () => {
    setSelectedStatuses([]);

    const params = new URLSearchParams(searchParams.toString());
    params.delete("inventoryStatus");

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">Product Status</h3>
        {selectedStatuses.length > 0 && !isPending && (
          <Button onClick={handleResetStatusFilter} variant="resetBtn">
            Reset Status Filter
          </Button>
        )}
      </div>
      <ul className="space-y-3">
        {statuses.map(({ name, count }) => {
          const isChecked = selectedStatuses.includes(name);
          return (
            <li key={name}>
              <label
                className="flex items-start justify-between gap-2 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  toggleStatus(name, !isChecked);
                }}
              >
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={isChecked}
                    onChange={(checked) => toggleStatus(name, checked)}
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

export default ProductStatusFilter;
