"use client";
import React, { FC, useEffect, useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { cn } from "@/utils/cn";
import { Camera } from "lucide-react";

interface MainHeaderSearchBarProps {
  className?: string;
  style?: React.CSSProperties;
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
        "flex items-center w-full max-w-lg bg-[#fff1f1] font-roboto rounded-xl border border-[#F5282814] overflow-hidden",
        className
      )}
      style={style}
    >
      {/* Typing Effect Input */}
      <Input
        placeholder={`${placeholder} |`}
        className="relative z-10 bg-transparent text-scarlet-red placeholder:text-red-300 text-sm flex-1 outline-none border-none h-12 font-normal placeholder:[letter-spacing:0.05em] px-4 transition-all duration-500"
      />

      {/* Image Upload Button */}
      <label className="cursor-pointer flex items-center justify-center bg-[#ffe5e5] text-[#F52828] w-12 h-12 hover:bg-[#ffcccc] transition-all duration-200">
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

      {/* Search Button */}
      <Button className="bg-scarlet-red text-white text-sm font-semibold w-24 rounded-l-none rounded-r-xl cursor-pointer h-12 hover:bg-red-700 transition-all duration-200">
        Search
      </Button>
    </div>
  );
};

export default MainHeaderSearchBar;
