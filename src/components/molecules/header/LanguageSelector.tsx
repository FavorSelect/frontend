"use client";
import React, { useCallback, useRef, useState, useEffect } from "react";
import Span from "@/components/atoms/Span";
import { ChevronDown, Globe } from "lucide-react";
import useClickOutside from "@/hooks/useClickOutside";
import { cn } from "@/utils/cn";
import { Button } from "@/components/atoms/Button";

const languages = [
  { code: "en", label: "English" },
  { code: "es", label: "Spanish" },
  { code: "fr", label: "French" },
  { code: "de", label: "German" },
];

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("en");
  const [focusedIndex, setFocusedIndex] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const optionsRef = useRef<Array<HTMLButtonElement | null>>([]);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  const selectedLabel =
    languages.find((lang) => lang.code === selectedLang)?.label || "Select";

  const toggleDropdown = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleSelectLanguage = (code: string) => {
    setSelectedLang(code);
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setIsOpen(true);
        setFocusedIndex(0);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setFocusedIndex((prev) => (prev + 1) % languages.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setFocusedIndex(
          (prev) => (prev - 1 + languages.length) % languages.length
        );
        break;
      case "Escape":
        setIsOpen(false);
        buttonRef.current?.focus();
        break;
      case "Enter":
        e.preventDefault();
        handleSelectLanguage(languages[focusedIndex].code);
        break;
    }
  };

  useEffect(() => {
    if (isOpen && optionsRef.current[focusedIndex]) {
      optionsRef.current[focusedIndex]?.focus();
    }
  }, [focusedIndex, isOpen]);

  return (
    <div
      className="relative inline-flex items-center gap-x-0.5"
      ref={dropdownRef}
    >
      <Globe className="w-3.5 h-3.5 md:w-4 xl:h-4 text-gray-700" />
      <Button
        ref={buttonRef}
        id="language-selector-button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        className="flex items-center gap-1 bg-white w-14 py-1 cursor-pointer rounded text-sm font-medium text-gray-700"
      >
        <Span>{selectedLabel.slice(0, 3)}</Span>
        <ChevronDown
          className={`w-4 h-4 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </Button>

      <ul
        role="listbox"
        aria-labelledby="language-selector-button"
        className={cn(
          "absolute z-10 top-full -left-11 xl:left-0 bg-white shadow-sm  w-32 xl:w-36 transition-all duration-300 transform ring-offset",
          isOpen
            ? "opacity-100 translate-y-3"
            : "opacity-0 translate-y-0 pointer-events-none"
        )}
      >
        {languages.map((lang, index) => (
          <li key={lang.code}>
            <Button
              ref={(el) => {
                optionsRef.current[index] = el;
              }}
              role="option"
              aria-selected={selectedLang === lang.code}
              onClick={() => handleSelectLanguage(lang.code)}
              onKeyDown={handleKeyDown}
              className={cn(
                "block w-full text-left px-4 py-2 text-sm cursor-pointer relative z-10 focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:ring-offset-1",
                selectedLang === lang.code && " font-semibold"
              )}
            >
              {lang.label}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LanguageSelector;
