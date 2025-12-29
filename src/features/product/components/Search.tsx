"use client";

import { Search as SearchIcon, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useProductFilters } from "@/hooks/useProductFilters";
import { useEffect, useState, useCallback } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function Search() {
  const { filters, updateSearch } = useProductFilters();
  const [inputValue, setInputValue] = useState(filters.search || "");
  const [isComposing, setIsComposing] = useState(false);

  const debouncedUpdateSearch = useDebouncedCallback((value: string) => {
    updateSearch(value);
  }, 400);

  const handleInputChange = useCallback(
    (value: string) => {
      setInputValue(value);
      if (!isComposing) {
        debouncedUpdateSearch(value);
      }
    },
    [debouncedUpdateSearch, isComposing]
  );

  useEffect(() => {
    setInputValue(filters.search || "");
  }, [filters.search]);

  const clearSearch = () => {
    setInputValue("");
    updateSearch("");
    debouncedUpdateSearch.flush();
  };

  return (
    <div className="relative w-full max-w-md">
      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search products..."
        className="pl-10 pr-10"
        value={inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
        aria-label="Search products"
      />
      {inputValue && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7"
          onClick={clearSearch}
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
