"use client";

export default function ProductImageFallback() {
  return (
    <div className="aspect-square rounded-2xl bg-gradient-to-br from-muted to-muted/50 overflow-hidden mb-4">
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <span className="text-2xl mb-2 block">📷</span>
          <span className="text-muted-foreground">Product Image</span>
        </div>
      </div>
    </div>
  );
}
