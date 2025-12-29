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
