import FilterSidebar from "@/features/product/components/FilterSidebar";
import { Suspense } from "react";
import ProductGrid from "@/features/product/components/ProductGrid";
import {
  ProductGridSkeleton,
  ProductHeaaderSkeleton,
} from "@/features/product/components/ProductGridSkeleton";
import { searchParamsCache } from "@/features/product/search-params";
import { SearchParams } from "nuqs/server";
import ProductsHeader from "@/features/product/components/ProductsHeader";
import ProductsPaginationServer from "@/features/product/components/ProductsPagination";
import { Separator } from "@radix-ui/react-separator";
import FilterSkeleton from "@/features/product/components/ui/filters/FilterSkeleton";
export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const parsedSearchParamsCache = searchParamsCache.parse(await searchParams);
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="lg:w-1/4">
        <div className="sticky top-0 w-full">
          <Suspense fallback={<FilterSkeleton />}>
            <FilterSidebar />
          </Suspense>
        </div>
      </div>
      <div className="lg:w-3/4 h-full">
        <Suspense fallback={<ProductHeaaderSkeleton />}>
          <ProductsHeader searchParams={parsedSearchParamsCache} />
        </Suspense>
        <Suspense fallback={<ProductHeaaderSkeleton leftWidth={5} />}>
          <ProductsPaginationServer searchParams={parsedSearchParamsCache} />
        </Suspense>
        <Separator className="py-3" />
        <Suspense fallback={<ProductGridSkeleton />}>
          <ProductGrid searchParams={parsedSearchParamsCache} />
        </Suspense>
      </div>
    </div>
  );
}
