"use client";
import React, { FC, useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Camera, Search } from "lucide-react";
import { useDebounce } from "use-debounce";
import { useRouter, usePathname } from "next/navigation";
import { useSearchInput } from "@/hooks/useSearchInput";
import { cn } from "@/utils/cn";
import { useAppDispatch } from "@/store/hook";
import {
  useImageSearchMutation,
  useGetSearchSuggestionsQuery,
  useSearchProductsByQueryMutation,
} from "@/store/api/searchApi";
import { handleImageUpload, handleTextSearch } from "@/handlers/searchHandlers";
import Spinner from "../global/Spinner";
import Span from "@/components/atoms/Span";
import SuggestionsDropdown from "./SuggestionsDropdown";

interface MainHeaderSearchBarProps {
  className?: string;
  style?: React.CSSProperties;
  mode?: string;
}

const MainHeaderSearchBar: FC<MainHeaderSearchBarProps> = ({
  className,
  style,
  mode = "desktop",
}) => {
  // Routing
  const router = useRouter();
  const pathname = usePathname();

  // Input Logic
  const {
    searchTerm,
    setSearchTerm,
    showSuggestions,
    setShowSuggestions,
    handleChange,
    handleFocus,
    handleBlur,
  } = useSearchInput();
  const [searching, setSearching] = useState(false);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  // Redux Logic
  const dispatch = useAppDispatch();
  const [imageSearch, { isLoading }] = useImageSearchMutation();
  const [searchProductsByQuery] = useSearchProductsByQueryMutation();

  // Suggestions API
  const {
    data: suggestions,
    isLoading: suggestionsLoading,
    isError,
  } = useGetSearchSuggestionsQuery(debouncedSearchTerm, {
    skip: debouncedSearchTerm.length < 2,
  });

  const handleManualSearch = async () => {
    if (!searchTerm.trim() || searching) return;
    setSearching(true);
    try {
      await handleTextSearch(
        searchTerm,
        router,
        pathname,
        searchProductsByQuery,
        dispatch,
        setSearchTerm,
        setShowSuggestions
      );
    } finally {
      setSearching(false);
    }
  };

  return (
    <div
      className={cn(
        "flex items-center bg-[#fff1f1] font-roboto rounded-xl border border-[#F5282814] relative",
        className
      )}
      style={style}
    >
      {/* Mobile Icon */}
      {mode === "mobile" && (
        <Button className="pl-3">
          <Search className="w-5 h-5 text-scarlet-red" />
        </Button>
      )}

      {/* Search Input */}
      <div className={cn("relative w-full", searchTerm && "typing-disabled")}>
        <Input
          value={searchTerm}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          className="relative z-10 bg-transparent text-scarlet-red placeholder-transparent text-sm flex-1 outline-none border-none h-12 font-normal placeholder:[letter-spacing:0.05em] transition-all duration-500 w-full"
          placeholder=" "
          onKeyDown={(e) => {
            if (e.key === "Enter") handleManualSearch();
          }}
        />
        {searchTerm.length === 0 && (
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-sm text-scarlet-red pointer-events-none animated-placeholder flex items-center" />
        )}
      </div>

      {/* Suggestions Dropdown */}
      <SuggestionsDropdown
        show={showSuggestions}
        loading={suggestionsLoading}
        error={isError}
        suggestions={suggestions?.suggestions}
        onSelect={(suggestion) =>
          handleTextSearch(
            suggestion,
            router,
            pathname,
            searchProductsByQuery,
            dispatch,
            setSearchTerm,
            setShowSuggestions
          )
        }
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
          <Spinner
            className={cn(
              "mr-0",
              mode !== "desktop" ? "text-scarlet-red" : "text-white"
            )}
          />
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
          onChange={(e) =>
            handleImageUpload(e, router, pathname, imageSearch, dispatch)
          }
          disabled={isLoading}
        />
      </label>

      {/* Search Button (Desktop) */}
      {mode === "desktop" && (
        <Button
          onClick={handleManualSearch}
          disabled={searching}
          className="bg-scarlet-red text-white text-sm font-semibold w-16 xl:w-24 rounded-l-none rounded-r-xl cursor-pointer h-12 hover:bg-red-700 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {searching ? (
            <Spinner className="w-4 h-4 text-white" />
          ) : (
            <>
              <Span className="hidden xl:block">Search</Span>
              <Search className="w-5 h-5 block xl:hidden" />
            </>
          )}
        </Button>
      )}
    </div>
  );
};

export default MainHeaderSearchBar;
