import { ParsedSearchParams } from "@/features/product/search-params";
import { getProducts } from "../queries/get-products";
import { Separator } from "@radix-ui/react-separator";
import { ProductsWithMetadata } from "../types";
import { ProductsPagination } from "./ui/ProductsPagination";

type ProductsPaginationProps = {
  searchParams: ParsedSearchParams;
};

export default async function ProductsPaginationServer({
  searchParams,
}: ProductsPaginationProps) {
  const products = await getProducts(searchParams);

  const count = products.length;
  const skip = searchParams.size * searchParams.page;
  const take = Math.min(searchParams.size, 100);
  const hasNextPage = count > skip + take;
  const currentPage = searchParams.page;

  const ProductsMetadata: ProductsWithMetadata["metadata"] = {
    count,
    hasNextPage,
    totalPages: Math.ceil(count / searchParams.size),
    currentPage,
  };
  return <ProductsPagination paginatedProductsMetadata={ProductsMetadata} />;
}
