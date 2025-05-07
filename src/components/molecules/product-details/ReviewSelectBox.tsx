import { Button } from "@/components/atoms/Button";
import { cn } from "@/utils/cn";
import { ChevronDown } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

type Option = {
  label: string;
  value: string;
};

type SelectBoxProps = {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
};

const ReviewSelectBox: React.FC<SelectBoxProps> = ({
  value,
  onChange,
  options,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
        setHighlightedIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev === null || prev === options.length - 1 ? 0 : prev + 1
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev === null || prev === 0 ? options.length - 1 : prev - 1
      );
    } else if (e.key === "Enter" && highlightedIndex !== null) {
      e.preventDefault();
      const selected = options[highlightedIndex];
      onChange(selected.value);
      setIsOpen(false);
      setHighlightedIndex(null);
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setHighlightedIndex(null);
    }
  };

  return (
    <div className="relative w-56 text-sm" ref={ref}>
      <Button
        type="button"
        onClick={() => {
          setIsOpen((prev) => !prev);
          setHighlightedIndex(null);
        }}
        onKeyDown={handleKeyDown}
        className="w-full border border-gray-300 rounded-md px-3 py-1.5 bg-white text-left flex justify-between items-center hover:border-gray-400 focus:outline-none"
      >
        <span>{selectedOption?.label || "Select"}</span>
        <ChevronDown
          className={`w-4 h-4 transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </Button>

      <ul
        role="listbox"
        aria-labelledby="review sort selector"
        className={cn(
          "absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto transition-all duration-300 transform",
          isOpen
            ? "opacity-100 translate-y-3 pointer-events-auto"
            : "opacity-0 translate-y-0 pointer-events-none"
        )}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {options.map((opt, index) => (
          <li
            key={opt.value}
            onClick={() => {
              onChange(opt.value);
              setIsOpen(false);
              setHighlightedIndex(null);
            }}
            className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${
              value === opt.value ? "bg-gray-100 font-medium" : ""
            } ${highlightedIndex === index ? "bg-gray-200" : ""}`}
          >
            {opt.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewSelectBox;
