import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import CategoryFilter from "./ui/filters/CategoryFilter";
import PriceRangeFilter from "./ui/filters/PriceRangeFilter";
import ActiveFilters from "./ui/filters/ActiveFilters";
import FiltersHeader from "./ui/filters/FiltersHeader";
import { ProductHeaaderSkeleton } from "./ProductGridSkeleton";
import { Suspense } from "react";
import { makeRandomDelay } from "@/lib/api";

export default async function FilterSidebar() {
  await makeRandomDelay(1000);
  return (
    <div className="overflow-hidden rounded-lg overflow-y-auto lg:h-[calc(100vh-110px)]">
      <Card className="flex flex-col h-full">
        <div className="flex-shrink-0">
          <FiltersHeader />
        </div>
        <CardContent className="space-y-2 flex-1 overflow-y-auto p-6 pt-0">
          <Suspense fallback={<ProductHeaaderSkeleton />}>
            <CategoryFilter />
          </Suspense>
          <Separator className="m-0" />
          <Suspense fallback={<ProductHeaaderSkeleton />}>
            <PriceRangeFilter />
          </Suspense>
          <Suspense fallback={<ProductHeaaderSkeleton />}>
            <ActiveFilters />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
