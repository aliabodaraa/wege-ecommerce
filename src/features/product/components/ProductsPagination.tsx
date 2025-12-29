"use client";

import { useQueryState, useQueryStates } from "nuqs";
import { useEffect, useRef } from "react";
import { Pagination } from "@/components/pagination";
import { PaginatedData } from "@/types/pagination";

import {
  paginationOptions,
  paginationParser,
  searchParser,
} from "@/features/product/search-params";
import { ProductsWithMetadata } from "../types";

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

  const [search] = useQueryState("search", searchParser);
  const prevSearch = useRef(search);

  useEffect(() => {
    if (search === prevSearch.current) return;
    prevSearch.current = search;

    setPagination({ ...pagination, page: 0 });
  }, [search, pagination, setPagination]);

  return (
    <Pagination
      pagination={pagination}
      onPagination={setPagination}
      paginatedMetadata={paginatedProductsMetadata}
    />
  );
};

export { ProductsPagination };
