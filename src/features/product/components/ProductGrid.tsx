import { ParsedSearchParams } from "@/features/product/search-params";
import { getProducts } from "@/features/product/queries/get-products";
import NoProductFound from "@/features/product/components/NoProductFound";
import { ProductsWithMetadata } from "../types";
import { ProductsPagination } from "./ProductsPagination";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  searchParams: ParsedSearchParams;
}

export default async function ProductGrid({ searchParams }: ProductGridProps) {
  const products = await getProducts(searchParams);
  if (products.length === 0) {
    return <NoProductFound />;
  }
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
  const paginatedProducts = products.slice(skip, skip + take);
  return (
    <>
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">
          Showing {products.length} product{products.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <ProductsPagination paginatedProductsMetadata={ProductsMetadata} />
    </>
  );
}
