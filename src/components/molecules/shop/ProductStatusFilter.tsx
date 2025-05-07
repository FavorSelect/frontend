import React, { useState } from "react";
import { Checkbox } from "@/components/atoms/Checkbox";

const statuses = ["In Stock", "On Sale"];

const ProductStatusFilter = () => {
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  const toggleStatus = (status: string, checked: boolean) => {
    setSelectedStatuses((prev) =>
      checked ? [...prev, status] : prev.filter((s) => s !== status)
    );
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Product Status</h3>
      <ul className="space-y-3">
        {statuses.map((status) => {
          const isChecked = selectedStatuses.includes(status);
          return (
            <li key={status}>
              <label
                className="flex items-start gap-2 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  toggleStatus(status, !isChecked);
                }}
              >
                <Checkbox
                  checked={isChecked}
                  onChange={(checked) => toggleStatus(status, checked)}
                />
                <span className="text-sm font-medium text-gray-700 leading-tight">
                  {status}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProductStatusFilter;
