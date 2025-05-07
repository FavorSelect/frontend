import React, { useState } from "react";
import { Checkbox } from "@/components/atoms/Checkbox";

type Brand = {
  name: string;
  count: number;
};

const brands: Brand[] = [
  { name: "Always", count: 1 },
  { name: "Boncare", count: 1 },
  { name: "Equate", count: 5 },
  { name: "HALYARD", count: 3 },
  { name: "LPOW", count: 3 },
  { name: "Medline", count: 3 },
];

const BrandFilter = () => {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const handleToggle = (brand: string, checked: boolean) => {
    setSelectedBrands((prev) =>
      checked ? [...prev, brand] : prev.filter((item) => item !== brand)
    );
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-base">Filter by brands</h3>
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
