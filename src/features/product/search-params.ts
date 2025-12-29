import {
  createSearchParamsCache,
  parseAsString,
  parseAsInteger,
} from "nuqs/server";

export const categoryParser = parseAsString.withDefault("All").withOptions({
  shallow: false,
  clearOnDefault: true,
});

export const minPriceParser = parseAsInteger.withDefault(0).withOptions({
  shallow: false,
  clearOnDefault: true,
});

export const maxPriceParser = parseAsInteger.withDefault(5000).withOptions({
  shallow: false,
  clearOnDefault: true,
});

export const searchParser = parseAsString.withDefault("").withOptions({
  shallow: false,
  clearOnDefault: true,
});

export const sortParser = {
  sortKey: parseAsString.withDefault("createdAt"),
  sortValue: parseAsString.withDefault("desc"),
};

export const sortOptions = {
  shallow: false,
  clearOnDefault: true,
};

export const paginationParser = {
  page: parseAsInteger.withDefault(0),
  size: parseAsInteger.withDefault(5),
};

export const paginationOptions = {
  shallow: false,
  clearOnDefault: true,
};

export const searchParamsCache = createSearchParamsCache({
  search: searchParser,
  category: categoryParser,
  minPrice: minPriceParser,
  maxPrice: maxPriceParser,
  ...sortParser,
  ...paginationParser,
});

export type ParsedSearchParams = Awaited<
  ReturnType<typeof searchParamsCache.parse>
>;

export const buildProductQuery = (params: ParsedSearchParams) => {
  const queryParams = new URLSearchParams();

  if (params.search) {
    queryParams.append("search", params.search);
  }

  if (params.category && params.category !== "All") {
    queryParams.append("category", params.category);
  }

  if (params.minPrice && params.minPrice > 0) {
    queryParams.append("minPrice", params.minPrice.toString());
  }

  if (params.maxPrice && params.maxPrice < 5000) {
    queryParams.append("maxPrice", params.maxPrice.toString());
  }

  if (params.page && params.page > 0) {
    queryParams.append("page", (params.page + 1).toString());
  }

  if (params.size && params.size !== 12) {
    queryParams.append("limit", params.size.toString());
  }

  if (params.sortKey && params.sortKey !== "createdAt") {
    queryParams.append("sortBy", params.sortKey);
  }

  if (params.sortValue && params.sortValue !== "desc") {
    queryParams.append("sortOrder", params.sortValue);
  }

  return queryParams;
};

export const CATEGORIES = [
  "All",
  "Electronics",
  "Clothing",
  "Home",
  "Books",
  "Bags",
  "Shoes",
  "Fitness",
] as const;

export const PRICE_RANGES = [
  { label: "All Prices", min: 0, max: 5000 },
  { label: "Under $50", min: 0, max: 50 },
  { label: "$50 - $100", min: 50, max: 100 },
  { label: "$100 - $200", min: 100, max: 200 },
  { label: "Over $200", min: 200, max: 5000 },
] as const;

export const SORT_OPTIONS = [
  {
    value: "createdAt:desc",
    label: "Newest",
    sortKey: "createdAt",
    sortValue: "desc",
  },
  {
    value: "price:asc",
    label: "Price: Low to High",
    sortKey: "price",
    sortValue: "asc",
  },
  {
    value: "price:desc",
    label: "Price: High to Low",
    sortKey: "price",
    sortValue: "desc",
  },
  {
    value: "rating:desc",
    label: "Highest Rated",
    sortKey: "rating",
    sortValue: "desc",
  },
  { value: "name:asc", label: "Name A-Z", sortKey: "name", sortValue: "asc" },
] as const;

export const getPriceRangeLabel = (min: number, max: number) => {
  const range = PRICE_RANGES.find((r) => r.min === min && r.max === max);
  return range ? range.label : `$${min} - $${max}`;
};
