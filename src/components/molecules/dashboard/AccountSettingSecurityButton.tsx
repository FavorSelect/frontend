import React from "react";

type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
};

const AccountSettingSecurityButton: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  description,
}) => {
  return (
    <label className="flex items-start cursor-pointer gap-2 mb-4">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="hidden"
      />
      <span
        className={`w-4 h-4 flex items-center justify-center border rounded 
          ${checked ? "bg-scarlet-red border-scarlet-red" : "border-gray-400"}
          transition-all duration-200`}
      >
        {checked && (
          <svg
            className="w-3 h-3 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            viewBox="0 0 24 24"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        )}
      </span>

      {/* Label and Description */}
      <div>
        {label && <span className="font-semibold text-gray-800">{label}</span>}
        {description && <p className="text-gray-500 text-sm">{description}</p>}
      </div>
    </label>
  );
};

export default AccountSettingSecurityButton;
