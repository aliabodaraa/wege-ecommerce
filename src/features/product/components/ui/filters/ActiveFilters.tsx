"use client";
import { useProductFilters } from "@/hooks/useProductFilters";
import { Separator } from "@radix-ui/react-separator";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

export default function ActiveFilters() {
  const { filters, updateCategory, updatePriceRange } = useProductFilters();

  const handleClearFilter = (filterType: "category" | "price") => {
    if (filterType === "category") {
      updateCategory("All");
    } else if (filterType === "price") {
      updatePriceRange(0, 5000);
    }
  };
  return (
    <>
      {(filters.category !== "All" ||
        filters.minPrice > 0 ||
        filters.maxPrice < 5000) && (
        <>
          <Separator />
          <div>
            <h4 className="font-medium mb-3">Active Filters</h4>
            <div className="flex flex-wrap gap-2">
              {filters.category !== "All" && (
                <Badge variant="outline" className="gap-1">
                  Category: {filters.category}
                  <button
                    onClick={() => handleClearFilter("category")}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {(filters.minPrice > 0 || filters.maxPrice < 5000) && (
                <Badge variant="outline" className="gap-1">
                  Price: ${filters.minPrice} - ${filters.maxPrice}
                  <button
                    onClick={() => handleClearFilter("price")}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
