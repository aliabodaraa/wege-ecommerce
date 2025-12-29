import {
  buildProductQuery,
  ParsedSearchParams,
} from "@/features/product/search-params";
import { Product } from "@/lib/types/product";

export async function fetchProducts(
  searchParams: ParsedSearchParams
): Promise<Product[]> {
  const params = buildProductQuery(searchParams);
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/products${
    params.toString() ? `?${params.toString()}` : ""
  }`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    return (await response.json()) as Product[];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
