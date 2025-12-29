"use client";

import { Search as SearchIcon, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { useDebounce } from "@/hooks/useDebounce";

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const debouncedSearch = useDebounce(searchTerm, 500);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    if (debouncedSearch !== undefined) {
      router.push(`/?${createQueryString("search", debouncedSearch)}`);
    }
  }, [debouncedSearch, createQueryString, router]);

  const clearSearch = () => {
    setSearchTerm("");
    router.push("/");
  };

  return (
    <div className="relative w-full max-w-md">
      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search products..."
        className="pl-10 pr-10"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="Search products"
      />
      {searchTerm && (
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
