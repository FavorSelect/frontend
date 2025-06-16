import React from "react";
import Spinner from "../global/Spinner";

interface SuggestionsDropdownProps {
  show: boolean;
  loading: boolean;
  error: boolean;
  suggestions: string[] | undefined;
  onSelect: (suggestion: string) => void;
}

const SuggestionsDropdown: React.FC<SuggestionsDropdownProps> = ({
  show,
  loading,
  error,
  suggestions,
  onSelect,
}) => {
  if (!show) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 shadow-md rounded-md z-50 max-w-full max-h-60 overflow-y-auto no-scrollbar">
      {loading && !error ? (
        <div className="flex items-center justify-center py-4">
          <Spinner className="text-scarlet-red" />
        </div>
      ) : (suggestions?.length ?? 0) > 0 ? (
        suggestions!.map((suggestion, idx) => (
          <div
            key={idx}
            onMouseDown={() => onSelect(suggestion)}
            className="px-4 py-2 hover:bg-scarlet-red hover:text-white cursor-pointer text-sm text-gray-800"
          >
            {suggestion}
          </div>
        ))
      ) : (
        <div className="px-4 py-2 text-sm text-gray-500">
          No suggestions found.
        </div>
      )}
    </div>
  );
};

export default SuggestionsDropdown;
