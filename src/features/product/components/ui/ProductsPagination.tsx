"use client";

import { useQueryStates } from "nuqs";
import { useEffect, useRef } from "react";
import { Pagination } from "@/components/pagination";
import { PaginatedData } from "@/types/pagination";

import {
  paginationOptions,
  paginationParser,
} from "@/features/product/search-params";
import { ProductsWithMetadata } from "../../types";
import { useProductFilters } from "@/hooks/useProductFilters";

type ProductsPaginationProps = {
  paginatedProductsMetadata: PaginatedData<ProductsWithMetadata>["metadata"];
};

const ProductsPagination = ({
  paginatedProductsMetadata,
}: ProductsPaginationProps) => {
  const [pagination, setPagination] = useQueryStates(
    paginationParser,
    paginationOptions
  );
  const { filters } = useProductFilters();

  const prevFilters = useRef(filters);

  useEffect(() => {
    const hasFilterChanged =
      prevFilters.current.category !== filters.category ||
      prevFilters.current.minPrice !== filters.minPrice ||
      prevFilters.current.maxPrice !== filters.maxPrice;

    if (hasFilterChanged) {
      setPagination({ ...pagination, page: 0 });
    }

    prevFilters.current = filters;
  }, [filters, setPagination]);

  return (
    <Pagination
      pagination={pagination}
      onPagination={setPagination}
      paginatedMetadata={paginatedProductsMetadata}
    />
  );
};

export { ProductsPagination };
