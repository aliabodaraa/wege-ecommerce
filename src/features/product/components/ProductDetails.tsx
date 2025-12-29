"use client";

import { Star, Truck, Shield, ArrowLeft, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCartStore } from "@/lib/store/cartStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Product } from "@/lib/types/product";
import { ProductImage } from "./ui/ProductImage";
import { categoryPath, homePath } from "@/paths";
import { Breadcrumbs } from "@/components/breadcrumbs";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/cart");
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <Breadcrumbs
          breadcrumbs={[
            { title: "products", href: homePath() },
            { title: product.category, href: categoryPath(product.category) },
            { title: product.title },
          ]}
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <ProductImage
            src={product.image}
            alt={product.title}
            className={`object-cover group-hover:scale-105 transition-transform duration-300`}
          />
        </div>

        <div>
          <div className="flex items-start justify-between mb-4">
            <div>
              <Badge variant="secondary" className="mb-2">
                {product.category}
              </Badge>
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">
                {product.title}
              </h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <span className="ml-1 font-medium">
                    {product.rating.rate}
                  </span>
                </div>
                <span className="text-muted-foreground">
                  ({product.rating.count} reviews)
                </span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart
                className={`h-6 w-6 ${
                  isFavorite ? "fill-red-500 text-red-500" : ""
                }`}
              />
            </Button>
          </div>

          <div className="mb-6">
            <div className="text-4xl font-bold text-primary mb-4">
              ${product.price.toFixed(2)}
            </div>
            <p className="text-lg text-muted-foreground">
              {product.description}
            </p>
          </div>

          <Separator className="my-6" />

          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center font-medium">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="flex-1"
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
