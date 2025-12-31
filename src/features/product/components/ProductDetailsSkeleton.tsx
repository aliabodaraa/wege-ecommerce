export default function ProductDetailsSkeleton() {
  return (
    <div className="w-full mx-auto animate-pulse">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <div className="aspect-square rounded-2xl bg-muted mb-4"></div>
          <div className="grid grid-cols-4 gap-2"></div>
        </div>

        <div>
          <div className="mb-4">
            <div className="h-6 bg-muted rounded w-1/4 mb-2"></div>
            <div className="h-8 bg-muted rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </div>

          <div className="mb-6">
            <div className="h-10 bg-muted rounded w-1/3 mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
              <div className="h-4 bg-muted rounded w-4/6"></div>
            </div>
          </div>

          <div className="h-px bg-muted my-6"></div>

          <div className="mb-8">
            <div className="h-6 bg-muted rounded w-1/4 mb-4"></div>
            <div className="flex gap-4 mb-6">
              <div className="h-10 bg-muted rounded w-32"></div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="h-12 bg-muted rounded flex-1"></div>
              <div className="h-12 bg-muted rounded flex-1"></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            {[1, 2].map((num) => (
              <div key={num} className="h-16 bg-muted rounded-lg"></div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="h-10 bg-muted rounded-lg w-full"></div>
            <div className="h-32 bg-muted rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
