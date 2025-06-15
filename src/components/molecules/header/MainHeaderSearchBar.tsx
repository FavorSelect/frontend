"use client";
import React, { FC, useEffect, useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { cn } from "@/utils/cn";
import { Camera, Search } from "lucide-react";
import Span from "@/components/atoms/Span";
import { useImageSearchMutation } from "@/store/api/searchApi";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  setError,
  setLoading,
  setResults,
} from "@/store/slices/search-results/imageSearch.slice";
import Spinner from "../global/Spinner";
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
  const router = useRouter();
  const pathname = usePathname();
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

  const dispatch = useDispatch();
  const [imageSearch, { isLoading }] = useImageSearchMutation();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    dispatch(setLoading(true));
    dispatch(setError(false));

    if (pathname !== "/search-results") {
      router.push("/search-results");
    }

    try {
      const response = await imageSearch(formData).unwrap();
      dispatch(
        setResults({
          products: response.products,
          labels: response.matchedLabels,
        })
      );
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError(true));
      dispatch(setLoading(false));
      console.error("RTK image search error", error);
    }
  };
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
            ? isLoading
              ? "bg-scarlet-red/80"
              : "bg-[#ffe5e5] hover:bg-[#ffcccc]"
            : "bg-transparent"
        )}
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <Camera
            size={20}
            className="transition-transform duration-200 hover:scale-110"
          />
        )}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
          disabled={isLoading}
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
