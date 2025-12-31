"use client";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CATEGORIES } from "@/features/product/search-params";
import { useProductFilters } from "@/hooks/useProductFilters";

export default function CategoryFilter() {
  const { filters, updateCategory } = useProductFilters();
  const handleCategoryChange = (category: string) => {
    updateCategory(category);
  };
  return (
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
        <AccordionContent className="pb-1">
          <div className="space-y-2 pt-2">
            {CATEGORIES.map((category) => (
              <Button
                key={category}
                variant={filters.category === category ? "secondary" : "ghost"}
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
  );
}
