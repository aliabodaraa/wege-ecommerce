"use client";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { PRICE_RANGES } from "@/features/product/search-params";
import { useProductFilters } from "@/hooks/useProductFilters";

export default function PriceRangeFilter() {
  const { filters, updatePriceRange } = useProductFilters();

  const handlePriceRangeChange = (rangeLabel: string) => {
    const range = PRICE_RANGES.find((r) => r.label === rangeLabel);
    if (range) {
      updatePriceRange(range.min, range.max);
    }
  };
  const handlePriceSliderChange = (values: number[]) => {
    updatePriceRange(values[0], values[1]);
  };
  return (
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
  );
}
