const NoProductFound = () => (
  <div className="text-center py-12">
    <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
      <span className="text-4xl">😕</span>
    </div>
    <h3 className="text-xl font-semibold mb-2">No products found</h3>
    <p className="text-muted-foreground mb-6">
      Try adjusting your filters to find what you're looking for
    </p>
    <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
      Clear Filters
    </button>
  </div>
);

export default NoProductFound;
