"use client";

import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { useProductFilters } from "@/hooks/useProductFilters";
import { CATEGORIES, PRICE_RANGES } from "@/features/product/search-params";

export default function FilterSidebar() {
  const {
    filters,
    updateCategory,
    updatePriceRange,
    clearFilters,
    getActiveFilterCount,
  } = useProductFilters();

  const handleCategoryChange = (category: string) => {
    updateCategory(category);
  };

  const handlePriceRangeChange = (rangeLabel: string) => {
    const range = PRICE_RANGES.find((r) => r.label === rangeLabel);
    if (range) {
      updatePriceRange(range.min, range.max);
    }
  };

  const handlePriceSliderChange = (values: number[]) => {
    updatePriceRange(values[0], values[1]);
  };

  const handleClearFilter = (filterType: "category" | "price") => {
    if (filterType === "category") {
      updateCategory("All");
    } else if (filterType === "price") {
      updatePriceRange(0, 5000);
    }
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Filter className="h-5 w-5" />
            Filters
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFilterCount}
              </Badge>
            )}
          </CardTitle>
          {activeFilterCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="h-8 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Category Filter */}
        <Accordion
          type="single"
          collapsible
          defaultValue="category"
          className="w-full"
        >
          <AccordionItem value="category" className="border-b-0">
            <AccordionTrigger className="py-2 hover:no-underline">
              <span className="font-medium">Category</span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-2">
                {CATEGORIES.map((category) => (
                  <Button
                    key={category}
                    variant={
                      filters.category === category ? "secondary" : "ghost"
                    }
                    className={`w-full justify-start font-normal ${
                      filters.category === category ? "bg-secondary" : ""
                    }`}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category}
                    {filters.category === category && (
                      <span className="ml-auto text-primary">✓</span>
                    )}
                  </Button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Separator />

        {/* Price Range Filter */}
        <Accordion
          type="single"
          collapsible
          defaultValue="price"
          className="w-full"
        >
          <AccordionItem value="price" className="border-b-0">
            <AccordionTrigger className="py-2 hover:no-underline">
              <span className="font-medium">Price Range</span>
            </AccordionTrigger>
            <AccordionContent className="pt-2">
              <div className="space-y-4">
                {/* Price Range Buttons */}
                <div className="space-y-2">
                  {PRICE_RANGES.map((range) => {
                    const isActive =
                      filters.minPrice === range.min &&
                      filters.maxPrice === range.max;

                    return (
                      <Button
                        key={range.label}
                        variant={isActive ? "secondary" : "ghost"}
                        className={`w-full justify-start font-normal ${
                          isActive ? "bg-secondary" : ""
                        }`}
                        onClick={() => handlePriceRangeChange(range.label)}
                      >
                        {range.label}
                        {isActive && (
                          <span className="ml-auto text-primary">✓</span>
                        )}
                      </Button>
                    );
                  })}
                </div>

                {/* Custom Price Slider */}
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-medium">Custom Range</span>
                    <span className="text-sm text-muted-foreground">
                      ${filters.minPrice} - ${filters.maxPrice}
                    </span>
                  </div>
                  <Slider
                    defaultValue={[0, 5000]}
                    max={5000}
                    step={50}
                    value={[filters.minPrice, filters.maxPrice]}
                    onValueChange={handlePriceSliderChange}
                    className="my-6"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>$0</span>
                    <span>$2500</span>
                    <span>$5000+</span>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Active Filters */}
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
      </CardContent>
    </Card>
  );
}
