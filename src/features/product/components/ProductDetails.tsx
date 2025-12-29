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
      {/* Breadcrumb */}
      <div className="mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>
        <nav className="text-sm text-muted-foreground">
          <span>Home</span>
          <span className="mx-2">/</span>
          <span>Products</span>
          <span className="mx-2">/</span>
          <span>{product.category}</span>
          <span className="mx-2">/</span>
          <span className="text-foreground font-medium">{product.title}</span>
        </nav>
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

          {/* Quantity & Actions */}
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

          {/* Features */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="p-2 bg-background rounded">
                <Truck className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">Free Shipping</p>
                <p className="text-sm text-muted-foreground">
                  On orders over $50
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="p-2 bg-background rounded">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">30-Day Returns</p>
                <p className="text-sm text-muted-foreground">
                  Easy return policy
                </p>
              </div>
            </div>
          </div>

          {/* Specifications */}
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specs">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="p-4">
              <p>{product.description}</p>
              <p className="mt-4">
                This product is carefully crafted with premium materials to
                ensure longevity and customer satisfaction. Each item undergoes
                quality checks before shipping.
              </p>
            </TabsContent>
            <TabsContent value="specs" className="p-4">
              <div className="space-y-2">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Category</span>
                  <span className="font-medium">{product.category}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Rating</span>
                  <span className="font-medium">{product.rating.rate}/5</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Reviews</span>
                  <span className="font-medium">{product.rating.count}</span>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="p-4">
              <div className="space-y-4">
                {[1, 2, 3].map((review) => (
                  <div key={review} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-muted mr-3"></div>
                        <div>
                          <p className="font-medium">Customer {review}</p>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < 4
                                    ? "text-yellow-500 fill-current"
                                    : "text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        2 days ago
                      </span>
                    </div>
                    <p>
                      Great product! Exactly as described. Would recommend to
                      others.
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
