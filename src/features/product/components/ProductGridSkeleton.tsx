const ProductGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="bg-card border rounded-lg overflow-hidden animate-pulse"
        >
          <div className="aspect-square bg-muted" />
          <div className="p-4 space-y-3">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-3 bg-muted rounded w-1/2"></div>
            <div className="h-4 bg-muted rounded w-1/4"></div>
            <div className="flex justify-between items-center pt-2">
              <div className="h-6 bg-muted rounded w-1/3"></div>
              <div className="h-4 bg-muted rounded w-1/4"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
const ProductHeaaderSkeleton = ({
  rightWidth = 20,
  leftWidth = 20,
}: {
  rightWidth?: number;
  leftWidth?: number;
}) => {
  return (
    <div className="flex justify-between mb-4">
      <div
        className="h-8 bg-muted rounded"
        style={{ width: `${leftWidth}%` }}
      ></div>
      <div
        className="h-8 bg-muted rounded"
        style={{ width: `${rightWidth}%` }}
      ></div>
    </div>
  );
};
export { ProductGridSkeleton, ProductHeaaderSkeleton };
