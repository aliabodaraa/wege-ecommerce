export type ProductsWithMetadata = {
  metadata: {
    count: number;
    hasNextPage: boolean;
    totalPages: number;
    currentPage: number;
  };
};
