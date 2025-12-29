import FilterSidebar from "@/features/product/components/FilterSidebar";
import { Suspense } from "react";
import ProductGrid from "@/features/product/components/ProductGrid";
import ProductGridSkeleton from "@/features/product/components/ProductGridSkeleton";
import {
  ParsedSearchParams,
  searchParamsCache,
} from "@/features/product/search-params";
import { SearchParams } from "nuqs/server";
export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  return (
    <div className="min-h-screen">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/4">
          <div className="sticky">
            <FilterSidebar />
          </div>
        </div>

        <div className="lg:w-3/4">
          <Suspense fallback={<ProductGridSkeleton />}>
            <ProductGrid
              searchParams={searchParamsCache.parse(await searchParams)}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
