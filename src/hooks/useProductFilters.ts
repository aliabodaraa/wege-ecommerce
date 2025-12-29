import {
  categoryParser,
  minPriceParser,
  maxPriceParser,
  searchParser,
  sortParser,
  sortOptions,
} from "@/features/product/search-params";
import { useQueryStates } from "nuqs";

export function useProductFilters() {
  const [filters, setFilters] = useQueryStates({
    category: categoryParser,
    minPrice: minPriceParser,
    maxPrice: maxPriceParser,
    search: searchParser,
  });
  const [_, setSort] = useQueryStates(sortParser, sortOptions);

  const updateCategory = (category: string) => {
    setFilters({
      category: category === "All" ? null : category,
    });
  };

  const updatePriceRange = (min: number, max: number) => {
    setFilters({
      minPrice: min,
      maxPrice: max,
    });
  };

  const updateSearch = (search: string) => {
    setFilters({
      search: search || null,
    });
  };

  const updateSort = (sortKey: string, sortValue: "asc" | "desc") => {
    setSort({
      sortKey: sortKey === "createdAt" ? null : sortKey,
      sortValue: sortValue === "desc" ? null : sortValue,
    });
  };

  const clearFilters = () => {
    setFilters({
      category: null,
      minPrice: null,
      maxPrice: null,
      search: null,
    });
  };

  const getActiveFilterCount = () => {
    return [
      filters.category !== "All",
      filters.minPrice > 0,
      filters.maxPrice < 5000,
      !!filters.search,
    ].filter(Boolean).length;
  };

  return {
    filters,
    updateCategory,
    updatePriceRange,
    updateSearch,
    updateSort,
    clearFilters,
    getActiveFilterCount,
  };
}
