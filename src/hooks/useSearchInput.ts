import { useState, useCallback } from "react";

export const useSearchInput = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length >= 2) setShowSuggestions(true);
  }, []);

  const handleFocus = useCallback(() => {
    if (searchTerm.length >= 2) {
      setShowSuggestions(true);
    }
  }, [searchTerm]);

  const handleBlur = useCallback(() => {
    setTimeout(() => setShowSuggestions(false), 150);
  }, []);

  return {
    searchTerm,
    setSearchTerm,
    showSuggestions,
    setShowSuggestions,
    handleChange,
    handleFocus,
    handleBlur,
  };
};
