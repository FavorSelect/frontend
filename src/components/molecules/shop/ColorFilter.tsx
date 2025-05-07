import React, { useState } from "react";

type ColorOption = {
  name: string;
  hex: string;
  count: number;
};

const colors: ColorOption[] = [
  { name: "Black", hex: "#000000", count: 1 },
  { name: "Blue", hex: "#007bff", count: 10 },
  { name: "Brown", hex: "#a52a2a", count: 5 },
  { name: "Green", hex: "#28a745", count: 4 },
  { name: "Red", hex: "#dc3545", count: 4 },
  { name: "Yellow", hex: "#ffc107", count: 5 },
];

const ColorFilter = () => {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const toggleColor = (name: string) => {
    setSelectedColors((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
    );
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Filter by color</h3>
      <ul className="space-y-3">
        {colors.map(({ name, hex, count }) => {
          const isSelected = selectedColors.includes(name);
          return (
            <li key={name}>
              <button
                type="button"
                className="w-full flex items-center justify-between gap-2 cursor-pointer"
                onClick={() => toggleColor(name)}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-150 ${
                      isSelected ? "ring-1 ring-blue-500" : ""
                    }`}
                    style={{ backgroundColor: hex }}
                  >
                    {isSelected && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={3}
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                  <span
                    className={`text-sm text-gray-800 ${
                      isSelected ? "font-semibold" : "font-normal"
                    }`}
                  >
                    {name}
                  </span>
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
