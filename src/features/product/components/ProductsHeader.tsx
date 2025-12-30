import { ParsedSearchParams } from "../search-params";
import { getProducts } from "../queries/get-products";
import Search from "./Search";

type ProductsHeaderProps = {
  searchParams: ParsedSearchParams;
};

export default async function ProductsHeader({
  searchParams,
}: ProductsHeaderProps) {
  const products = await getProducts(searchParams);
  return (
    <div className="mb-4 flex justify-between w-full items-center">
      <p className="text-sm text-muted-foreground">
        Showing {products.length} product{products.length !== 1 ? "s" : ""}
      </p>
      <Search />
    </div>
  );
}
