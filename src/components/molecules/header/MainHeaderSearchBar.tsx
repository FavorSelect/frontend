"use client";
import React, { FC, useEffect, useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { cn } from "@/utils/cn";
import { Camera, Search } from "lucide-react";
import Span from "@/components/atoms/Span";

interface MainHeaderSearchBarProps {
  className?: string;
  style?: React.CSSProperties;
  mode?: string;
}

const placeholderTexts = [
  "What are you looking for?",
  "Find the best deals...",
  "Search by product name or image...",
  "Looking for something specific?",
  "Start typing or upload an image...",
];

const MainHeaderSearchBar: FC<MainHeaderSearchBarProps> = ({
  className,
  style,
  mode = "desktop",
}) => {
  const [placeholder, setPlaceholder] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = placeholderTexts[textIndex];

    if (isDeleting) {
      if (charIndex > 0) {
        setTimeout(() => setCharIndex(charIndex - 1), 50);
      } else {
        setIsDeleting(false);
        setTextIndex((textIndex + 1) % placeholderTexts.length);
      }
    } else {
      if (charIndex < currentText.length) {
        setTimeout(() => setCharIndex(charIndex + 1), 100);
      } else {
        setTimeout(() => setIsDeleting(true), 2000);
      }
    }

    setPlaceholder(currentText.substring(0, charIndex));
  }, [charIndex, isDeleting, textIndex]);

  return (
    <div
      className={cn(
        "flex items-center bg-[#fff1f1] font-roboto rounded-xl border border-[#F5282814] overflow-hidden",
        className
      )}
      style={style}
    >
      {mode === "mobile" && (
        <Button className="pl-3">
          <Search className="w-5 h-5 text-scarlet-red" />
        </Button>
      )}
      {/* Typing Effect Input */}
      <Input
        placeholder={`${placeholder} |`}
        className="relative z-10 bg-transparent text-scarlet-red placeholder:text-scarlet-red text-sm flex-1 outline-none border-none h-12 font-normal placeholder:[letter-spacing:0.05em] transition-all duration-500"
      />

      {/* Image Upload Button */}
      <label
        className={cn(
          "cursor-pointer flex items-center justify-center w-12 h-12 text-scarlet-red transition-all duration-200",
          mode === "desktop"
            ? "bg-[#ffe5e5] hover:bg-[#ffcccc]"
            : "bg-transparent"
        )}
      >
        <Camera
          size={20}
          className="transition-transform duration-200 hover:scale-110"
        />
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => console.log(e.target.files)}
        />
      </label>

      {mode === "desktop" && (
        <Button className="bg-scarlet-red text-white text-sm font-semibold w-16 xl:w-24 rounded-l-none rounded-r-xl cursor-pointer h-12 hover:bg-red-700 transition-all duration-200">
          <Span className="hidden xl:block">Search</Span>
          <Search className="w-5 h-5 block xl:hidden" />
        </Button>
      )}
    </div>
  );
};

export default MainHeaderSearchBar;
