import { ParsedSearchParams } from "@/features/product/search-params";
import ProductCard from "./ProductCard";
import { getProducts } from "@/features/product/queries/get-products";
import NoProductFound from "@/features/product/components/NoProductFound";

interface ProductGridProps {
  searchParams: ParsedSearchParams;
}

export default async function ProductGrid({ searchParams }: ProductGridProps) {
  const products = await getProducts(searchParams);
  if (products.length === 0) {
    return <NoProductFound />;
  }

  return (
    <>
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">
          Showing {products.length} product{products.length !== 1 ? "s" : ""}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      Pagination
    </>
  );
}
