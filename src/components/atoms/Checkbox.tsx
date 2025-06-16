"use client";

import React from "react";

type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  id?: string;
};

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  id,
}) => {
  return (
    <label className="flex items-start cursor-pointer">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="hidden"
      />
      <span
        className={`w-4 h-4 flex items-center justify-center border rounded mr-1
          ${checked ? "bg-red-500 border-red-500" : "border-gray-400"}
          transition-all duration-200`}
      >
        {checked && (
          <svg
            className="w-3.5 h-3.5 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            viewBox="0 0 24 24"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        )}
      </span>
    </label>
  );
};
