import React, { useState } from "react";
import { Checkbox } from "@/components/atoms/Checkbox"; // Adjust path if needed

const categories = [
  "Allergies",
  "Cosmetics",
  "Cough, Cold, Fever",
  "Dietary",
  "Health",
  "Medication",
  "Medicine",
  "Mouth & Teeth",
  "Nutrition",
  "Pollen Sneeze",
  "Protection",
];

const ProductCategoryFilter = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCheckboxChange = (category: string, checked: boolean) => {
    setSelectedCategories((prev) =>
      checked ? [...prev, category] : prev.filter((item) => item !== category)
    );
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-base">Product Categories</h3>
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
