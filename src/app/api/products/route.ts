import { NextResponse } from "next/server";
import products from "@/lib/data/products.json";
import { searchParamsCache } from "@/features/product/search-params";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const untypedSearchParams = Object.fromEntries(searchParams);
  const typedSearchParams = searchParamsCache.parse(untypedSearchParams);

  const category = typedSearchParams.category;
  const minPrice = typedSearchParams.minPrice;
  const maxPrice = typedSearchParams.maxPrice;
  const search = typedSearchParams.search;

  let filteredProducts = [...products];

  if (category && category !== "All") {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === category
    );
  }

  if (minPrice) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= Number(minPrice)
    );
  }

  if (maxPrice) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price <= Number(maxPrice)
    );
  }

  if (search) {
    const searchLower = search.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.title.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower)
    );
  }

  return NextResponse.json(filteredProducts);
}
