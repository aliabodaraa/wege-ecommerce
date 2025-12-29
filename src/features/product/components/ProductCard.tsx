"use client";
import Link from "next/link";
import Image from "next/image";
import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/lib/store/cartStore";
import { Product } from "@/lib/types/product";
import { useState } from "react";
import { customLoader } from "@/lib/image-loader";
import ProductImageFallback from "./ui/product-image-fallback";
import { ProductImage } from "./ui/ProductImage";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Don't navigate to product page
    e.stopPropagation();
    addItem(product);
  };
  return (
    <Link href={`/product/${product.id}`}>
      <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
        <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-muted to-muted/50">
          <ProductImage src={product.image} alt={product.title} />
          <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
          <Badge className="absolute top-3 left-3 z-10">
            {product.category}
          </Badge>
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <Button
              size="sm"
              variant="secondary"
              className="shadow-md bg-background/90 backdrop-blur-sm"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              Add to Cart
            </Button>
          </div>
        </div>

        <CardContent className="p-4 flex-1">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="text-sm ml-1">
                {product.rating.rate}
                <span className="text-muted-foreground text-xs ml-1">
                  ({product.rating.count})
                </span>
              </span>
            </div>
          </div>

          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {product.title}
          </h3>

          <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
            {product.description}
          </p>
        </CardContent>

        <CardFooter className="p-4 pt-0 mt-auto">
          <div className="flex items-center justify-between w-full">
            <span className="text-2xl font-bold">
              ${product.price.toFixed(2)}
            </span>
            <Button
              size="sm"
              variant="outline"
              className="hidden sm:inline-flex"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
